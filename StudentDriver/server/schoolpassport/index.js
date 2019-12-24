const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const School = require('../database/models/school')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	console.log('*** serializeUser called, : ')
	console.log(user) // the whole raw user object!
	console.log('---------')
	done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	console.log('DeserializeUser called')
    console.log("Id: ", id);
    School.findOne(
		{ _id: id },
		'schoolName',
		(err, user) => {
			console.log('*** Deserialize school, school:')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport