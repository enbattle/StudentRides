const Driver = require('../database/models/driver');
const User = require('../database/models/user');
const Car = require('../database/models/car');

const getUser = async (username) => {
  try {
    const usr = await new Promise((resolve, reject) => {
      User.findOne({ username: username }, (err, usr) => {
        if (!usr) {
          console.log(err)
          reject('User could not be found')
        } else {
          resolve(usr)
        }
      })
    })
    return new Promise(resolve => {
      resolve(usr)
    })
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
}

const getDriver = async (username) => {
  try {
    console.log(username)
    const usrId = await new Promise((resolve, reject) => {
      User.findOne({ username: username }, (err, usr) => {
        if (!usr) {
          console.log(err)
          reject('User could not be found')
        } else {
          resolve(usr._id)
        }
      })
    })
    const driver = await new Promise((resolve, reject) => {
      Driver.findOne({ user: usrId }, (err, driver) => {
        if (!driver) {
          console.log(err)
          reject('Driver could not be found')
        } else {
          resolve(driver)
        }
      })
    })
    const car = await new Promise((resolve, reject) => {
      Car.findOne({ _id: driver.car }, (err, car) => {
        if (!driver) {
          console.log(err)
          reject('Driver could not be found')
        } else {
          resolve(car)
        }
      })
    })
    return new Promise(resolve => {
      resolve({ driver: driver, car: car })
    })
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
}

module.exports = {
  getDriver: getDriver,
  getUser: getUser
}
