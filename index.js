const express = require('express');
const path = require('path');

const { PORT, MONGODB_URI } = require('./config/environments');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/', require('./routes'));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

// app.use('/feqwed', routers1);
// app.use('/ffff', routerr2);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log(`App is listening on the port:${PORT}`);
    app.listen(PORT);
    console.log('Database connected..');
  })
  .catch(err => console.log(err));
