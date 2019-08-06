const express = require('express');
const connection = require('../helpers/db.connexion');
const verifiedAuth = require('../helpers/verifyAuth');
const mysql = require('mysql');
const moment = require('moment');
// import { verifiedAuth } from '../helpers/verifyAuth'
const roomRouter = express.Router();

export default function(app, passport, io) {

  //cours classés par ordre id (ordre de création)
  roomRouter.get('/', verifiedAuth, (req, res) => {
    // console.log(req.isAuthenticated())
    connection.query('SELECT * FROM rooms ', (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          err
        })
      } else {
        console.log(results)
        res.status(200).send({status: true, results: results});
      }
    });;
  });

  // cours classés par heure de début de classe
  roomRouter.get('/startDate', verifiedAuth, (req, res) => {
    // console.log(req.isAuthenticated())
    connection.query('SELECT * FROM rooms ORDER BY `startClass` DESC', (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          err
        })
      } else {
        console.log(results)
        res.status(200).send({status: true, results: results});
      }
    });;
  });

  roomRouter.get('/classOfTheDay', verifiedAuth, (req, res) => {
    // console.log(req.isAuthenticated())
    const now = moment();
    const startOfDay = now.startOf('day').format('X');
    const endOfDay = now.endOf('day').format('X');
    console.log('start', startOfDay)
    console.log('end', endOfDay)
    // console.log('data is ', date)
    const query = `SELECT * FROM rooms WHERE startClass >= ${startOfDay} AND startClass <= ${endOfDay}`
    connection.query(query , (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          err
        })
      } else {
        console.log(results)
        res.status(200).send({status: true, results: results});
      }
    });;
  });

  roomRouter.get('/:id', verifiedAuth, (req,res) => {
    const id = req.params.id;
    let query = `SELECT rooms.roomID, rooms.authorID, rooms.authorUsername, rooms.authorFirstname, rooms.authorLastname, rooms.title, rooms.startClass, rooms.endClass
    FROM rooms
    WHERE rooms.roomID = ${id}; SELECT tags.tagID, tags.userID, tags.time, tags.color
    FROM tags
    WHERE tags.roomID = ${id}`;
    // let query = `SELECT rooms.roomID, rooms.authorID, rooms.authorUsername, rooms.authorFirstname, rooms.authorLastname, rooms.title, rooms.startClass, rooms.endClass, tags.tagID, tags.userID, tags.time, tags.color
    // FROM rooms
    // INNER JOIN tags ON rooms.roomID = tags.roomID
    // WHERE rooms.roomID = ${id}`
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          status:400,
          errors:err
        });
      }else{
        console.log(results[0]);
        console.log(results[1]);
        res.send({
          status:200,
          content1: results[0],
          content2: results[1],
        });
      };
    })
  })

  roomRouter.post('/', verifiedAuth, (req, res) => {

      req.checkBody('title', 'Title field cannot be empty.').notEmpty();

      const errors = req.validationErrors();

      if (errors) {
        console.log(`errors: ${JSON.stringify(errors)}`);
        res.send({
          status:400,
          errors: errors
        });
      } else {
        let body = req.body;
        const { title, description, authorID, authorLastname, authorFirstname, authorUsername, startClass, endClass } = body

        let query = `INSERT INTO rooms (authorID, authorLastname, authorFirstname, authorUsername, title, description, startClass, endClass) VALUES ('${authorID}', '${authorLastname}', '${authorFirstname}', '${authorUsername}', '${title}', '${description}', '${startClass}', '${endClass}')`;

        console.log(query)
        // const [errors, results] = createRoom(body)
          connection.query(query, (errors, results, fields) => {
            if (errors) {
              console.log(errors);
              res.send({
                status:400,
                errors:errors
              });
            } else{
              console.log(results);
              res.send({
                status:200,
                "success":"new class created",
                content: results
              });
            };
          });
        }
    });
  return roomRouter;
}