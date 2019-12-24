const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const cors = require("cors")
const morgan = require('morgan')
const http = require("http")
const socketIo = require("socket.io")
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./database') 

const passport = require('./passport')
const app = express()
const PORT = 8080
// Route requires
app.use(cors())
app.options('*', cors())
const server = http.createServer(app)
const user = require('./routes/user')
const image = require('./routes/image')
const io = socketIo(server) // < Interesting!

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

app.get('/request', (req, res) => {
  console.log("req.params", req.params);
  var result = JSON.parse(req.query.result);
  console.log("req location params ==>", result.location);
  console.log("req socket params ==>", result.socketID);
  var location = result.location;
  var id = result.socketID;
  io.emit('FROM Student', location, id);
})

io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
  //like a server;
  socket.on("acceptCalls", (id, msg) => {
    console.log("driver wants to emit a message to socket", id);
    socket.broadcast.to(id).emit('ACCEPT', msg);
  });
  socket.emit("socketID", socket.id);
});

// Starting Server 
server.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
})