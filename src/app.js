const express = require('express');
const app = express();
// const { Musician } = require('../models/index');
const { db } = require('../db/connection');
const musicianRouter = require('./routes/musicians');
const bandsRouter = require('./routes/bands')

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/musicians', musicianRouter);
app.use('/bands', bandsRouter);

// 
// app.listen(port, () => {
//   db.sync();
//   console.log(`Listening at http://localhost:${port}/musicians`);
// });
module.exports = app;
