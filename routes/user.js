import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();

//registering user(creating route for signup)
router.post("/signup", async (req, res) => {
  
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      errors: [{msg: 'User already Existed'}],
    })
  }
  
  //hashing pw
  const hashpassword = await bcrypt.hash(password, 10);
 
  //creating new user
  const newUser = new User({
    name,
    email,
    password: hashpassword,
  });
  await newUser.save();
  return res.json({ status: true, message: "record registered" });
 
});

//login user(creating route for login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User is not Registered" });
  }
  //comparing  pw
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "password is incorrect" });
  }

  //generating a token if user existed

  const token = jwt.sign({ name: user.name }, process.env.KEY, {
    expiresIn: "1h",
  }); // takes 3 values 1st is payload, second is secretkey and expirytime

  
  //storing token inside user's cookie\
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 }); // age in milisec it expires  ,httponly  means cookie can only be accessed through the http not js
  return res.json({ status: true, message: "Login Sucesfully" });
});

//forgot password (creating route for forgot password)
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    }); //new token
    

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aakashrai3306@gmail.com", //your gmail
        pass: "vmzx kllq awju fbbs", //your google app pw
      },
    });
    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E"); //idk
    var mailOptions = {
      from: "aakashrai3306@gmail.com", //your email
      to: email,
      subject: "Reset Password",
      text: `http://localhost:3000/resetPassword/${encodedToken}`, //localhost frontend url
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "Error Sendind Email " }); //N
      } else {
        return res.json({ status: true, message: "Email Sent" }); //N
      }
    });
  } catch (err) {
    console.log(err);
  }
});
//for reset password(route for reset pw)
router.post("/reset-password/:token", async (req, res) => {
  // :token is written to take parameter from url
  const { token } = req.params; //taking that token
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY); //verifying the token
    const id = decoded.id; //taking id from decoded data
    const hashPassword = await bcrypt.hash(password, 10); //hashing the pw again
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword }); //updating record
    return res.json({ status: true, message: "Updated Password" });
  } catch (err) {
    return res.json("invalid token");
  }
});

//route for auth verify for dashboard
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    next()

  } catch (err) {
    return res.json({ status: false, message: "Invalid or expired token" });
  }
};


router.get("/verify", verifyUser, (req, res) => {
  return res.json({status: true, message: "authorized"})
});

//for Logout route
router.get('/logout', (req, res) =>{
  res.clearCookie('token')
  return res.json({status: true})
})

export { router as UserRouter };
