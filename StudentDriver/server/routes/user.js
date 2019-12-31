const express = require('express');
const router = express.Router();
const User = require('../database/models/user');
const Car = require('../database/models/car');
const School = require('../database/models/school');
const Driver = require('../database/models/driver');
const SchoolAdmin = require('../database/models/schoolAdmin');
const Student = require('../database/models/student')
const passport = require('../passport');
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
      console.log("now adding the user...")
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
        console.log(err);
        if (err) {
          res.status(404)
          return res.json(err)
        } 
        return res.json(savedUser)
      })
    }
  })
})

router.post('/student', async (req, res) => {
  let usr_id = await new Promise((resolve, reject) => {
    User.findOne({ username: req.body.username }, (err, usr) => {
      if (!usr) {
        console.log(err)
        res.status(404)
        reject(res.json({ success: false, message: 'Student could not be found' }))
      } else {
        console.log("Success!")
        resolve(usr._id)
      }
    })
  })
  let admin_id = await new Promise((resolve, reject) => {
    User.findOne({ username: req.body.admin }, (err, usr) => {
      if (!usr) {
        console.log(err)
        res.status(404)
        reject(res.json({ success: false, message: 'Admin could not be found' }))
      } else {
        console.log("Success!")
        resolve(usr._id)
      }
    })
  })
  let school = await new Promise((resolve, reject) => {
    console.log('admin id:', admin_id)
    SchoolAdmin.findOne({ user: ObjectId(admin_id) }, (err, usr) => {
      if (!usr) {
        console.log(err)
        res.status(404)
        reject(res.json({ success: false, message: 'School admin could not be found' }))
      } else {
        School.findOne({ _id: usr.school }, (err, school) => {
          if (!school) {
            console.log(err)
            res.status(404)
            reject(res.json({ success: false, message: 'School could not be found' }))
          }
          resolve(school)
        })
      }
    })
  })
  var data = req.body;
  const student = new Student({
    user: new ObjectId(usr_id),
    address: data.address,
    city: data.city,
    state: data.state,
    zipcode: data.zipcode,
    graduation_year: data.graduation_year,
    school: new ObjectId(school._id)
  })
  student.save((err, student) => {
    if (!student) {
      console.log(err)
      res.status(404)
      return (res.json({ success: false, message: 'Student could not be saved!' }))
    } else {
      School.findOneAndUpdate(
        { _id: school._id },
        { $push: { students: new ObjectId(student._id) } },
        { new: true },
        (err, doc) => {
          console.log(doc);
          if (!doc) {
            console.log(err)
            res.status(404)
            return res.json({ success: false, message: 'School update could not be saved!' })
          }
        })
      return res.json({
        success: true, message: 'school admin successfully created'
      })
    }
  })
})

router.post('/school-admin', async (req, res) => {
  let usr_id = await new Promise(resolve => {
    User.findOne({ username: req.body.username }, (err, usr) => {
      if (err) {
        console.log(err)
        res.status(404)
        return res.json(err)
      } else {
        console.log("Success!")
        resolve(usr._id)
      }
    })
  })
  const schoolAdmin = new SchoolAdmin({
    user: new ObjectId(usr_id)
  })

  schoolAdmin.save((err, admin) => {
    if (err) {
      console.log(err)
      res.status(404)
      return res.json(err)
    } else {
      return res.json({
        success: 'school admin successfully created'
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


// router.post('/login', function (req, res, next) {
//   console.log('routes/user.js, login, req.body: ');
//   console.log(req.body)
//   passport.authenticate('local', function (err, user, info) {
//     console.log("in here!!");
//     console.log(err);
//     console.log(user);
//     console.log(info);
//     if (err) {
//       console.log(err);
//       next(err);
//     } if (!user) {
//       return res.send({success: false, message: info })
//     }
//     req.login(user, loginErr => {
//       if (loginErr) {
//         return next(loginErr);
//       }
//       return res.send({success: true, user: user});
//     })
//   })
// }, (req, res) => {
//   console.log('logged in', req.user);
//   var userInfo = req.user
//   console.log("userinfo: ", userInfo);
//   res.send(userInfo);
// })

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