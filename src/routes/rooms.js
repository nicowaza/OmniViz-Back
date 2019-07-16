const express = require('express');
const connection = require('../helpers/db.connexion');
const verifiedAuth = require('../helpers/verifyAuth');
const mysql = require('mysql');

const roomRouter = express.Router();

export default function(app, passport, io) {

  roomRouter.get('/', (req, res) => {
    connection.query('SELECT * FROM rooms ', (err, results, fields) => {
      if (err) {
        console.log(err);
        res.send({
          err
        })
      }else {
        console.log(results)
        res.status(200).send({status: true, results: results});
      }
    });;
  });

  roomRouter.post('/', (req, res) => {

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
        const { title, description, authorID, createdat, startClass, endClass } = body

        let query = `INSERT INTO rooms (authorID, title, description, createdat, startClass, endClass) VALUES ('${authorID}', '${title}', '${description}', '${createdat}', '${startClass}', '${endClass}')`;

        console.log(query)

          connection.query(query, (errors, results, fields) => {
            if (errors) {
              console.log(errors);
              res.send({
                status:400,
                errors:errors
              });
            }else{
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
  console.log(io)
  return roomRouter;
}