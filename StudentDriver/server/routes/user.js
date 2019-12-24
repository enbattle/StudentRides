const express = require('express');
const router = express.Router();
const User = require('../database/models/user');
const Car = require('../database/models/car');
const School = require('../database/models/school');
const Driver = require('../database/models/driver');
const passport = require('../passport');
const socketIo = require("socket.io")
const ObjectId = require('mongodb').ObjectID;

router.post('/', (req, res) => {
  console.log('user signup');

  const { username, password, firstName, lastName, profileImage, email, phoneNumber, roles} = req.body
  console.log(req.body);
  //const { username, password } = req.body
  // ADD VALIDATION
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log('User.js post error: ', err)
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      })
    }
    else {
      const newUser = new User({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        profileImage: profileImage,
        email: email,
        phoneNumber: phoneNumber,
        roles: roles

      })
      console.log('New User:', newUser);
      newUser.save((err, savedUser) => {
        if (err) return res.json(err)
        return res.json(savedUser)
      })
    }
  })
})

router.post('/driver', async (req, res) => {
  console.log("in driver!!", req.body)
  let usr_id = await new Promise(resolve => {
    User.findOne({ username: req.body.username }, (err, usr) => {
      if (err) {
        console.log(err)
        res.status(404)
        return res.json(err)
      } else {
        console.log("Success1")
        resolve(usr._id)
      }
    })
  })
  const driverCar = new Car({
    carName: req.body.carName,
    year: req.body.year,
    image: req.body.image
  })

  driverCar.save(function(err, car) {
    if (!err) {
      const driver = new Driver({
        user: new ObjectId(usr_id),
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        car: new ObjectId(car.id),
        plate: req.body.plate
      })
      driver.save(function(err, driver) {
        if (err) {
          res.status(404)
          return res.json(err)
        } else {
          console.log(driver)
          return res.json("Successfully added driver!")
        }
      })
    } else {
      res.status(404)
      return res.json(err)
    }
  })
})

router.post(
  '/login',
  function (req, res, next) {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log('logged in', req.user);
    var userInfo = req.user
    console.log("userinfo: ", userInfo);
    res.send(userInfo);
  }
)

router.get('/', (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user)
  if (req.user) {
    res.json({ user: req.user })
  } else {
    res.json({ user: null })
  }
})

// router.get('/request', (req, res) => {
//     io.on("connection", socket => {
//         console.log("New client connected");
//         if (interval) {
//           clearInterval(interval);
//         }
//         interval = setInterval(() => socket.emit("FROM Student", location), 10000);
//         socket.on("disconnect", () => {
//           console.log("Client disconnected");
//         });
//       });
//     var location = req.params.location;
// })

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    res.send({ msg: 'logging out' })
  } else {
    res.send({ msg: 'no user to log out' })
  }
})

module.exports = router