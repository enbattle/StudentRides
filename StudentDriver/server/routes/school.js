const express = require('express');
const router = express.Router();
const School = require('../database/models/school');
const passport = require('../schoolpassport');

router.post('/', (req, res) => {
    console.log('school signup');
    
    const { schoolName, password, address, latitude, longitude, phoneNumber } = req.body
    console.log(schoolName);
    //const { schoolName, password } = req.body
    // ADD VALIDATION
    School.findOne({ schoolName: schoolName }, (err, user) => {
        if (err) {
            console.log('School.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a school with the school name: ${schoolName}`
            })
        }
        else {
            const newSchool = new School({
                schoolName: schoolName,
                password: password,
                address: address,
                latitude: latitude,
                longitude: longitude,
                phoneNumber: phoneNumber,

            })
            newSchool.save((err, savedSchool) => {
                if (err) return res.json(err)
                res.json(savedSchool)
            })
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
        //console.log('logged in', req.user);
        var userInfo = {
            username: req.user.schoolName
        };
        res.send(userInfo);
    }
)

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

module.exports = router