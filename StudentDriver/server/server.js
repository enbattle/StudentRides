const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const cors = require("cors")
const morgan = require('morgan')
const http = require("http")
const io = require("socket.io")(8000)
const User = require('./database/models/user')
const Car = require('./database/models/car')
const School = require('./database/models/school')
const Driver = require('./database/models/driver')
const Student = require('./database/models/student')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./database') 
const withAuth = require('./middleware/auth');

const passport = require('./passport')
const app = express()
const PORT = 8080
// Route requires
app.use(cors())
app.options('*', cors())
const server = http.createServer(app)
const helper = require('./routes/util')
const user = require('./routes/user')
const image = require('./routes/image')
const school = require('./routes/school')
// const io = socketIo(server) // < Interesting!

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

// Sessions
app.use(
  session({
    secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false //required
  })
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Routes
app.use('/user', user)
app.use('/image', image)
app.use('/school', school)
app.get('/checkAuth', withAuth, (req, res) => res.sendStatus(200));

function escapeRegExp (str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll (str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

const createSchoolChats = async () => {
  const cursor = await School.find().cursor()
  var groups = {}
  for (let school = await cursor.next(); school != null; school = await cursor.next()) {
    groups[school.schoolName] = io
      .of('/' + replaceAll(school.schoolName, ' ', ''))
      .on('connection', function (socket) {
        socket.on('getID', () => {
          ///TroyHighSchool#bMKHr3nDjbbx9ULyAAAH
          console.log("some dude just asked for an ID..", socket.id)
          socket.emit('socketID', socket.id)
        })
        socket.on('RIDE REQUEST', (student, location, socketID) => {
          console.log("got a ride request from this mofo")
          socket.broadcast.emit('FROM Student', student, location, socketID)
        })
        socket.on('REQUEST ACK', async (username, id, msg) => {
          console.log("driver wants to emit a message to socket", id)
          const driver = await helper.getDriver(username)
          const user = await helper.getUser(username)
          socket.broadcast.to(id).emit('ACCEPT', driver, id, msg, { firstName: user.firstName, profileImage: user.profileImage })
        })
      })
  }
  return groups
}

createSchoolChats()
// io.on('connection', function(socket) {
//     // Use socket to communicate with this particular client only, sending it it's own id
//   //like a server;
//   socket.on("acceptCalls", (id, msg) => {
//     console.log("driver wants to emit a message to socket", id);
//     socket.broadcast.to(id).emit('ACCEPT', msg);
//   });
//   socket.emit("socketID", socket.id);
// });

// Starting Server 
server.listen(PORT, () => {
  
  console.log(`App listening on PORT: ${PORT}`)
})