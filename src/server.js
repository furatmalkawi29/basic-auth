'use strict';

//express 
const express = require('express');
const app = express();

//morgan 
const morgan = require ('morgan');
app.use(morgan('dev')); 


// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));


//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//router 
const router = require('./auth/router.js'); //import
app.use('/',router);//use


//export
module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || 3000;
    app.listen(PORT, () => console.log(`the server is up on ${PORT}`));
  },
};