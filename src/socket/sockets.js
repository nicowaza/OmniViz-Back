const { server } = require('../index.js');
const socket = ('socket.io');

module.exports.listen = function(server) {
  const io = socket.listen(server);


  io.on('connection', function(socket, message) {
    console.log('connection')
    if (socket.request.user && socket.request.user.logged_in) {
      socket.on('join', (data) => {
        const socketUser = socket.request.user
        const { username, userID: user_id } = socketUser[0];
        const room = data.room;
        console.log('room :', room)
        console.log('socket:', socketUser)
        console.log('socket user :', socket.request.user)
        console.log('username :', username);

        socket.emit('roomCreation', {
        username: username,
        room: room,
        });

        socket.join(room, console.log(`${username} has joined ${room}`));

        socket.emit('joiningEvent', {
          message: `${username} has joined the room ${room}`
        });

        socket.broadcast.to(room).emit('joiningEvent', ({ message: `${username} has joined the room ${room}`}));// console.log(socket.request.user);

        socket.on('greenPing', (data) => {
          const datagreen = data;
          console.log(datagreen);
          socket.broadcast.to(room).emit('greenTag', {
            greenTag: datagreen.tag,
            username: username,
            user_id: user_id,
            room: room,
            time: datagreen.timestamp,
            },
          )
        });

        socket.on('yellowPing', (data) => {
          const datayellow = data;
          console.log(datayellow);
          socket.broadcast.to(room).emit('yellowTag', {
            yellowTag: datayellow.tag,
            username: username,
            user_id: user_id,
            room: room,
            time: datayellow.timestamp,
            },
          )
        });

        socket.on('redPing', (data) => {
          const datared = data;
          console.log(datared);
          socket.broadcast.to(room).emit('redTag', {
            redTag: datared.tag,
            username: username,
            user_id: user_id,
            room: room,
            time: datared.timestamp,
            },
          )
        });

        socket.on('bluePing', (data) => {
          const datablue = data;
          console.log(datablue);
          socket.broadcast.to(room).emit('blueTag', {
            blueTag: datablue.tag,
            username: username,
            user_id: user_id,
            room: room,
            time: datablue.timestamp,
            },
          )
        });

        socket.on('leave', (data) => {
          const username = socketUser[0].username;
          const user_id = socketUser[0].userID
          const room = data.room;
          socket.leave(room, console.log(`${username} has left ${room}`));
          socket.to(room).emit('leavingEvent',({ message: `${username} has left the room ${room}`}));
        })
      });
      // socket.on('leave', function () {
      //   console.log(`${username} has disconnected`)
      //       io.emit('user disconnected');
            // });
      } else {
          //Ne marche pas...trouver la solution
          console.log('unauthorized')
    }
  })
  // io.on('connection', function(socket, message) {

}




