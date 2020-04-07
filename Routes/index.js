const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {registerValidation , loginValidation} = require('../validation');

dotenv.config();

//Registeration 
router.post('/register',async (req,res) => {

 //Check for validation before adding new user
 const { error } = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);   
  
 //Check if email already exists
 const emailExists = await User.findOne({email : req.body.email});
  if(emailExists) return res.status(400).send('Email already exists'); 

 //Hash the password
 const salt = await bcrypt.genSalt(10);
 const hashedPass = await bcrypt.hash(req.body.password,salt);

 const newUser = new User({
     name:req.body.name,
     email:req.body.email,
     password:hashedPass
 });
 try{
  const savedUser = await newUser.save();
  res.send(savedUser);
 }catch(err){
   res.status(400).send(err);
 }

});


//Login
router.post('/login', async (req,res) => {
  //Check for valid email
  const { error } = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Check for email in Db
  const user = await User.findOne({email : req.body.email});
  if(!user) return res.status(400).send('Email incorrect');

  //Check for password
  const validPass = await bcrypt.compare(req.body.password , user.password);
  if(!validPass) return res.status(400).send('Password incorrect');

  //Token
  const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
  res.header('auth-token',token).send(token);
});

module.exports = router;