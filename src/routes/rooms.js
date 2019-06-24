const express = require('express');
const connection = require('../helpers/db.connexion');
const verifiedAuth = require('../helpers/verifyAuth');
const mysql = require('mysql');

const roomRouter = express.Router();

export default function(app, passport, io, socket) {
  const socketUser = socket.request.user
  const username = socketUser[0].username;
  socket.on('join', (data) => {
      if (socket.request.user && socket.request.user.logged_in) {

        const socketUser = socket.request.user
        // console.log('username: ', socketUser.username);
        // console.log('room: ', data.room)
        // console.log('id: ', socket.id)
        const username = socketUser[0].username;
        const user_id = socketUser[0].userID
        const room = data.room;
        console.log('socket:', socketUser)
        console.log('socket user :', socket.request.user)
        console.log('username :', username)
        // const socketId = socket.id
        socket.emit('roomCreation', {
        username: username,
        room: room,
        });
        socket.join(room, console.log(`${username} has joined ${room}`));
        // socket.emit('joiningEvent', {
        //   message: `${username} has joined the room ${room}`
        // });

        socket.broadcast.to(room).emit('joiningEvent', ({ message: `${username} has joined the room ${room}`}));// console.log(socket.request.user);

        socket.on('tag', (data) => {
          // const datagreen = data;
          console.log(data);
          // console.log(data.timestamp)
          socket.broadcast.to(room).emit('event', {
            color: data.tag,
            username: username,
            user_id: user_id,
            room: room,
            time: data.timestamp,
            },
          );
        });


        // socket.on('leave', function () {
        //   console.log(`${username} has disconnected`)
        //       io.emit('user disconnected');
        //     });
        } else {
          //Ne marche pas...trouver la solution
          console.log('unauthorized')
      }

    });
    socket.on('leaveRoom', (data) => {
      const username = data.username
      const room = data.room
      socket.leave(room, console.log(`${username} has left ${room}`));
      socket.to(room).emit('leavingEvent',({ message: `${username} has left the room ${room}`}));
    })

    roomRouter.get('/', (req, res) => {
    connection.query('SELECT * FROM rooms ', (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          err
        })
      }else {
        console.log(results)
        // const result = JSON.stringify(results);
        // console.log(result)
        res.status(200).send({status: true, results: results});
      }
    });;
  });
  return roomRouter;
}