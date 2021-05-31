'use strict';

//express 
const express = require('express');
const app = express();

//morgan 
const morgan = require ('morgan');
app.use(morgan('dev')); 

//err handlers 
const handler500 = require ('./middleware/500');
const handler404 = require ('./middleware/404');




// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body


//body parser
app.get('/', (request, response)=>{
  response.send('home page');
});

//router 
const router = require('./auth/router.js'); //import
app.use(router);//use


app.use(handler500);
app.use('*', handler404);


//export
module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || 3000;
    app.listen(PORT, () => console.log(`the server is up on ${PORT}`));
  },
};