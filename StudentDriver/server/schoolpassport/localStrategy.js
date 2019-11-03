const School = require('../database/models/school')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		schoolNameField: 'schoolName' // not necessary, DEFAULT
	},
	function(schoolName, password, done) {
		School.findOne({ schoolName: schoolName }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect schoolName' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	}
)

module.exports = strategy