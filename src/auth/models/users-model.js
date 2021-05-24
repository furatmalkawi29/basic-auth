'use strict';

//setup 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const base64 = require('base-64');


// schema
const userScehma = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//method 
userScehma.pre('save',async function (next){
  console.log(this);
  const hash = await bcrypt.hash(this.password, 5);

  this.password=hash;
  next();
});


// model
const User = mongoose.model('User', userScehma);


//export model
module.exports = User;