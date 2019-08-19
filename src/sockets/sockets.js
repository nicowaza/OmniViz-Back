const pool = require('../helpers/db.connexion');

const socket = require ('socket.io');

function connectIO(server) {

  // Socket Setup
  const io = socket(server);

    // sockets
  io.on('connection', function(socket, message) {

    //  on peut récupérer le user serialisé par passport et présent dans l'objet socket.request.session. Les infos de ce user sont disponible pour utilisation dans le reste de l'app
    console.log('A client has connected');
    // console.log('the socket session object', socket.request.session);
    // console.log('the actual serialized user from passport', socket.request.session.passport);
    // const { username } = socket.request.session.passport.user
    // console.log(`${username} has opened a socket`)

    socket.on('createRoom', (data) => {
      console.log(data);

      socket.emit('roomCreation', function(data) {
        console.log(data)
      });
    })

    socket.on('join', (data) => {
      // console.log('room data :', data)
      if ( socket.request.session.passport.user) {

        const socketUser =  socket.request.session.passport.user
        console.log('scoket user', socketUser)
        const username = socketUser.username;
        const user_id = socketUser.userID;
        const user_role = socketUser.role;
        const roomData = data;
        const roomName = data.roomName;
        const roomID = data.roomID;
        const authorLastname = data.authorLastname;
        const authorFirstname = data.authorFirstname;

        // console.log('room data', roomData)

        console.log('socket user id:', user_id)
        console.log('socket username: ', username)
        socket.join(roomID, function() {
          console.log('room data', roomData)
          console.log(`${username} has joined ${roomName}`);
          console.log('author last name', authorLastname)
          io.in(roomID).emit('joiningEvent', (
            {
            message: `${username} has joined room ${roomName}`,
            username,
            user_id,
            user_role,
            roomData
          }));

          // insert les participants au cours dans la table participants que si ils ne sont pas déjà enregistré pour ce cours
          let query = `INSERT IGNORE INTO Participants (userID, roomID) VALUES ('${user_id}', '${roomID}')`;

          connection.query(query, (err, results, fields) => {
            if (err) {
              console.log(err);
            } else {
              console.log(results);
            }
          })
        });

        socket.on('tag', (data) => {
          console.log('tag datas', data)
          const color = data.tag;
          const  time = data.timestamp;
          console.log(username)

          socket.broadcast.to(roomID).emit('event', {
            color,
            username,
            user_id,
            roomName,
            time,
          })

          let query = `INSERT INTO tags (userID, roomID, time, color) VALUES ('${user_id}', '${roomID}', '${time}', '${color}')`;

          pool.query(query, (err, results, fields) => {
            if (err) {
              console.log(err);
            } else {
              console.log(results);
            }
          })
        });

        socket.on('disconnect', (data) => {
          console.log('disconnection :', data)
          // const username = socketUser[0].username;
          // const user_id = socketUser[0].userID
          // const room = data.room;
          // console.log(room)
          // socket.leave(room, console.log(`${username} has left ${room}`));
          // socket.broadcast.to(room).emit('leavingEvent',({ message: `${username} has left the room ${room}`}));
        });

        socket.on('leave', function (data) {
          console.log(`${username} has left the ${roomName}`)
          console.log(data)

          socket.leave(roomID, function(data) {
            socket.broadcast.to(roomID).emit('leavingEvent', ({
              message: `${username} has left ${roomName}`,
              username,
              user_id,
              user_role,
            }));
          });
        });

        socket.on('closeRoom', function(data) {
          console.log('classe fermée :', data)
          socket.broadcast.to(roomID).emit('closeRoom')
        });
      } else {
        //Ne marche pas...trouver la solution
        console.log("c'est la merde")
      }
    });
  });

  return io
}

module.exports = connectIO;

