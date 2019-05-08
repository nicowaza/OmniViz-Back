const express = require ('express');
const socket = require ('socket.io');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server is running on port ${port}`));

import { realtimeRouter } from './routes/index';
import { userRouter } from './routes/users';
import { loginRouter } from './routes/login';


//static files
app.use(express.static('public'));

// Socket Setup
const io = socket(server);

app.use(morgan('combined'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/realtime', realtimeRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);


io.on('connection', function(socket){
  console.log('socket connected', socket.id)
  socket.on('join', (data) => {
    console.log('username: ', data.username);
    console.log('room: ', data.room)
    console.log('id: ', socket.id)
    const user = data.username;
    const room = data.room;

    socket.join(room, console.log(`${user} has joined ${room}`));
    socket.emit('joiningEvent', `${user} has joined the room ${room}`);
    socket.broadcast.to(room).emit('joiningEvent', `${user} has joined the room ${room}`);
    })
  });
