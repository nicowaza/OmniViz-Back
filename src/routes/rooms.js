const express = require('express');
const connection = require('../helpers/db.connexion');
const verifiedAuth = require('../helpers/verifyAuth');
const mysql = require('mysql');

const roomRouter = express.Router();

export default function(app, passport, io) {

  roomRouter.get('/', (req, res) => {
    // console.log(io);

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
    });
  });

  return roomRouter;
}