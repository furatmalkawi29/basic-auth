'use strict';

const express = require('express');

// router 
const router = express.Router();

//authentication
const bcrypt = require('bcrypt');
const base64 = require('base-64');

//import
const User = require('./models/users-model.js');//model
const signin = require('./middleware/basic');//basic/signin



//signup
router.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(user);
    const record = await user.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
});




//signin
router.post('/signin', signin, async (req, res) => {
  try {
    res.json({user: req.user});
  } catch (error) { res.status(403).send('Invalid Login'); }
});



module.exports = router;