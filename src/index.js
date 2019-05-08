const express = require ('express');
const socket = require ('socket.io');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server is running on port ${port}`));

//static files
app.use(express.static('public'));

// Socket Setup
const io = socket(server);

app.use(morgan('combined'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/realtime', realtimeUser);

io.on('connection', function(socket){
  console.log('socket connected', socket.id)
  socket.on('join', (data, callback) => {
    console.log('username: ', data.username);
    console.log('room: ', data.courseName)
    console.log('id: ', socket.id)

    socket.join(data.room);
    socket.broadcast.to(data.room).emit('newMessage', )
  })
})