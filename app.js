const cookieParser = require('cookie-parser');
const http = require('http');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/database');
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./src/utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./src/utils/users')
const app = express();
const server = http.createServer(app)
const io = socketio(server);
const bodyParser= require('body-parser')
const multer = require('multer');


app.use(bodyParser.urlencoded({extended: true}))

require('dotenv').config();


const indexRouter = require('./routes/index');
const teacherRouter = require('./routes/teacher');
const studentRouter = require('./routes/student');
// Database Connection
mongoose.connect(db.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to Database...'))
  .catch(err => console.log(err));

app.set('views', path.join(__dirname, 'views'));
// view engine setup
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/lecturer', teacherRouter);
app.use('/student', studentRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: "Mad Oh..."});
});
io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  socket.on('join', (options, callback) => {
      const { error, user } = addUser({ id: socket.id, ...options })

      if (error) {
          return callback(error)
      }

      socket.join(user.room)

      socket.emit('message', generateMessage('Admin', 'Welcome!'))
      socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
      io.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInRoom(user.room)
      })

      callback()
  })

  socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id)
      const filter = new Filter()

      if (filter.isProfane(message)) {
          return callback('Profanity is not allowed!')
      }

      io.to(user.room).emit('message', generateMessage(user.username, message))
      callback()
  })

  socket.on('sendLocation', (coords, callback) => {
      const user = getUser(socket.id)
      io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
      callback()
  })

  socket.on('disconnect', () => {
      const user = removeUser(socket.id)

      if (user) {
          io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
          io.to(user.room).emit('roomData', {
              room: user.room,
              users: getUsersInRoom(user.room)
          })
      }
  })
})

module.exports = app;
