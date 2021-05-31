'use strict';
//setup
require('dotenv').config(); 
const mongoose = require('mongoose');

//import
const server = require('./src/server.js');

//connect db
mongoose
  .connect(process.env.MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.start(process.env.PORT);
  })
  .catch((e) => console.error('CONNECTION ISSUE', e.message));