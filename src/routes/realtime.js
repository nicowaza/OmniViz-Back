import express from 'express';


export const realtimeRouter = express.Router();

realtimeRouter.post('/createCourse', (req, res) => {
  const { username, courseName, description } = req.body;


})
