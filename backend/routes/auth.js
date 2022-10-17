const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    const newUser = new User({
      ...req.body,
      password: hashedPassword
    });
    const user = await newUser.save();
    res.cookie("access_token", user, {
      httpOnly: true
    }).status(200).json({ user })
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});

//CHECK 
router.post("/check", async (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'edmondante456@gmail.com',
      pass: 'trhnxdpjezipsqkp'
    }
  });
  
  var mailOptions = {
    from: 'edmondante456@gmail.com',
    to: req.body.email,
    subject: 'Chat app',
    text: `${req.body.code} is your Chat verification code/`
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
        res.status(200).json(info.response)
    }
  });
})


//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // user && res.status(304).json("user not found");
    if(!user){
      res.json(false)
    }else{

      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.json("wrong password")
      
      
      res.status(200).json({ user })
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;