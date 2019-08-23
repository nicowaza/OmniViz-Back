const express = require('express');
const pool = require('../helpers/db.connexion');
const verifiedAuth = require('../helpers/verifyAuth');
const mysql = require('mysql');
const moment = require('moment');
// import { verifiedAuth } from '../helpers/verifyAuth'
const roomRouter = express.Router();

export default function(app, passport, io) {

  //cours classés par ordre id (ordre de création)
  roomRouter.get('/', verifiedAuth, (req, res) => {
    // console.log(req.isAuthenticated())
    pool.query('SELECT * FROM rooms ', (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          err
        })
      } else {
        console.log(results)
        res.status(200).send({status: true, results: results});
      }

    });
  });

  // liste des cours auquels à participé le user
  roomRouter.get('/myRooms/:id', verifiedAuth, (req, res) => {
    // récupération de l'id du user
    const id = req.params.id;
    console.log(id)

    // utilisation d'une subquery pour d'abord récupérer l'id des cours auquel le user à participé (table participants). On passe ensuite ces id à la query qui liste les cours
    const query = `SELECT * FROM rooms WHERE roomID IN (SELECT roomID FROM Participants WHERE userID = ${id})`

    pool.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          err
        })
      } else {
        console.log(results)
        res.status(200).send({status: true, results: results});
      }

    });
  });

  // cours classés par heure de début de classe
  roomRouter.get('/startDate', verifiedAuth, (req, res) => {
    pool.query('SELECT * FROM rooms ORDER BY `startClass` DESC', (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          err
        })
      } else {
        console.log(results)
        res.status(200).send({status: true, results: results});
      }

    });
  });

  // cours du jour
  roomRouter.get('/classOfTheDay', verifiedAuth, (req, res) => {
    const now = moment();
    // date de début du jour sous forme de timestamp en secondes
    const startOfDay = now.startOf('day').format('X');
    // date de fin du jour sous forme de timestamp en secondes
    const endOfDay = now.endOf('day').format('X');
    // renvoie uniquement les cours de la journée (dont la date de début est compris entre le début de la fin du jour 0h 00m 00sec et 23h 59m 59sec)
    const query = `SELECT * FROM rooms WHERE startClass >= ${startOfDay} AND startClass <= ${endOfDay}`
    pool.query(query , (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          err
        })
      } else {
        console.log(results)
        res.status(200).send({status: true, results: results});
      }

    });
  });

  // timeline séléctionné par ID
  roomRouter.get('/timeline/:id', verifiedAuth, (req,res) => {
    const id = req.params.id;
    let query = `SELECT rooms.roomID, rooms.authorID, rooms.authorUsername, rooms.authorFirstname, rooms.authorLastname, rooms.title, rooms.startClass, rooms.endClass
    FROM rooms
    WHERE rooms.roomID = ${id};

    SELECT tags.tagID, tags.userID, tags.time, tags.color, users.userID, users.username, users.firstname, users.lastname, users.email, users.avatar
    FROM tags
    INNER JOIN users
    ON tags.userID = users.userID
    WHERE tags.roomID = ${id}`;
    // let query = `SELECT rooms.roomID, rooms.authorID, rooms.authorUsername, rooms.authorFirstname, rooms.authorLastname, rooms.title, rooms.startClass, rooms.endClass, tags.tagID, tags.userID, tags.time, tags.color
    // FROM rooms
    // INNER JOIN tags ON rooms.roomID = tags.roomID
    // WHERE rooms.roomID = ${id}`
    pool.query(query, (err, results, fields) => {
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
  });

  // single cours (par id)
  roomRouter.get('/:id', verifiedAuth, (req,res) => {
    const id = req.params.id;
    let query = `SELECT rooms.roomID, rooms.authorID, rooms.authorUsername, rooms.authorFirstname, rooms.authorLastname, rooms.title, rooms.startClass, rooms.endClass
    FROM rooms
    WHERE rooms.roomID = ${id}`;
    pool.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          status:400,
          errors:err
        });
      }else{
        console.log(results);
        res.send({
          status:200,
          results,
        });
      };

    })
  });

  // séléctionne tous les participants à un cours et récupère leur datas utilisateur
  roomRouter.get('/participants/:id', verifiedAuth, (req, res) => {
    const id = req.params.id
    const query =
      `SELECT Participants.userID, users.username, users.firstname, users.lastname
      FROM Participants
      INNER JOIN users
      ON Participants.userID = users.userID
      WHERE roomID = ${id}`;
      pool.query(query, (err, results, fields) => {
        if (err) {
          console.log(err);
          res.send({
            status:400,
            errors:err
          });
        }else{
          console.log(results);
          res.send({
            status:200,
            results,
          });
        };

      });
  });

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
          pool.query(query, (errors, results, fields) => {
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

    // update de l'heure de fin de cours
    roomRouter.put('/:id', verifiedAuth, (req,res) => {
      const id = req.params.id;
      const endClass = req.body.endClass
      const query = `UPDATE rooms SET endClass = ${endClass} WHERE roomID = ${id}`
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
            success:"endClass updated",
          });
        };
      });
    });
  return roomRouter;
}