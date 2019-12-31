const express = require('express');
const router = express.Router();
const User = require('../database/models/user');
const School = require('../database/models/school');
const Student = require('../database/models/student');
const Driver = require('../database/models/driver')
const SchoolAdmin = require('../database/models/schoolAdmin');
const ObjectId = require('mongodb').ObjectID;
const models = {
  Driver: Driver, SchoolAdmin: SchoolAdmin, Student: Student 
}
const getUserIds = async (userList, role, schoolID) => {
  var result = [];
  for (var i = 0; i < userList.length; i++) {
    console.log(userList[i])
    var usr = await new Promise((resolve, reject) => {
      User.findOne({ username: userList[i] }, (err, usr) => {
        if (!usr || err) {
          console.log("User not found")
          reject(new Error({ error: 'User Not Found' }))
        } else {
          // resolve(new ObjectId(usr._id));
          console.log('role ==', [role])
          models[role].findOneAndUpdate({ user: usr._id }, { $set: { school: schoolID } }, { new: true }, (err, usr) => {
            if (err) {
              console.log(err)
              reject(new Error({ error: err }))
            }
            resolve(usr);
          })
        }
      })
    })
    if (usr.error) {
      return new Promise((resolve, reject) => {
        reject(usr.error)
      })
    }
    result.push(new ObjectId(usr._id))
  }
  return new Promise(resolve => {
    resolve(result)
  })
}

router.post('/', async (req, res) => {
  console.log('school signup')
  var usr = await new Promise(resolve => {
    User.findOne({ username: req.body.username }, (err, usr) => {
      if (err) {
        console.log(err);
        resolve({
          error: err
        })
      } else {
        SchoolAdmin.findOne({ user: usr._id }, (err, usr) => {
          if (err) {
            console.log(err);
            resolve({
              error: err
            })
          } resolve(usr);
        })
      }
    })
  })

  var data = req.body
  // const { schoolName, password } = req.body
  // ADD VALIDATION
  School.findOne({ schoolName: req.body.schoolName }, (err, user) => {
    if (err) {
      console.log('School.js post error: ', err)
    } else if (user) {
      res.status(404)
      res.json({
        error: `Sorry, already a school with the school name: ${req.body.schoolName}`
      })
    } else {

      const newSchool = new School({
        schoolName: data.schoolName,
        address: data.address,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        email: data.email,
        phoneNumber: data.phoneNumber,
        schoolAdmin: [],
        students: [],
        drivers: []
      })
      newSchool.save(async (err, savedSchool) => {
        if (err) {
          console.log(err);
          res.status(404)
          return res.json(err)
        }
        var schoolId = new ObjectId(savedSchool._id)
        console.log("updating school admin!!")
        SchoolAdmin.findOneAndUpdate(
          { _id: usr._id },
          { $set: { school: schoolId } },
          { new: true },
          (err, doc) => {
            console.log("in callback!");
            console.log(err);
            console.log(doc);
            if (err) {
              console.log(err)
              res.status(404)
              return res.json(err)
            }
            return res.json('Success!!')
          })

        try {
          console.log(req.body)
          var schoolAdmin = await getUserIds(req.body.schoolAdmin, 'SchoolAdmin', schoolId)
          schoolAdmin.push(new ObjectId(usr._id))
          var students = await getUserIds(req.body.students, 'Student', schoolId)
          var drivers = await getUserIds(req.body.drivers, 'Driver', schoolId)
          School.findOneAndUpdate({ _id: schoolId }, { $set: { schoolAdmin: schoolAdmin, students: students, drivers: drivers } }, { new: true }, (err, doc) => {
            if (err) {
              console.log(err)
              res.status(404)
              return res.json({success: false, message: 'School could not be updated'})
            }
          })
        } catch (error) {
          console.log(error)
          res.status(404)
          return res.json(error)
        }
      })
    }
  })
})

router.get('/', (req, res, next) => {
  console.log('===== school!!======')
  //console.log(req);
  console.log(req.user)
  if (req.user) {
    res.json({ schooluser: req.user })
  } else {
    res.json({ schooluser: null })
  }
})

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    res.send({ msg: 'logging out' })
  } else {
    res.send({ msg: 'no user to log out' })
  }
})

router.get('/getSchool', async (req, res) => {
  console.log(req.user._id)
  const roles = { driver: Driver, student: Student, 'school-admin': SchoolAdmin }
  const role = req.user.roles
  const student = await new Promise((resolve, reject) => {
    roles[role].findOne({ user: Object(req.user._id) }, (err, doc) => {
      if (!doc) {
        console.log(err)
        res.status(404)
        reject(res.json({ success: false, message: 'Student could not be found' }))
      } else {
        resolve(doc)
      }
    })
  })
  await new Promise((resolve, reject) => {
    School.findOne({ _id: student.school }, (err, school) => {
      if (!school) {
        console.log(err)
        res.status(404)
        reject(res.json({ success: false, message: 'School could not be found' }))
      } else {
        resolve(res.json(school))
      }
    })
  })
})

module.exports = router
