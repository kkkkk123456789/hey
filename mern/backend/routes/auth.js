const express = require("express");
const router = express.Router();
const User = require("../models/User");
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const Authuser = require("../middleware/authuser");
const AES_SECRET = process.env.AES_SECRET
const JWT_SECRET = process.env.JWT_SECRET

router.post("/login", async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password, cpassword } = req.body;
      if (password === cpassword) {
        let ur = await User.findOne({ email: email });
        if (ur == null) {
          res
            .status(404)
            .json({ success: false, message: "Invalid credentials" });
        } else {
          var bytes = CryptoJS.AES.decrypt(ur.password, AES_SECRET);
          var originalText = bytes.toString(CryptoJS.enc.Utf8);
          if (password === originalText) {
            var token = jwt.sign(
              { success: true, email: ur.email, id: ur._id },
              JWT_SECRET,
              { expiresIn: "10d" }
            );
            res.status(200).json({
              success: true,
              message: "Successfully loggedin!!!!",
              token: token,
            });
          } else {
            res.status(401).json({
              success: false,
              message: "Invalid credentials",
            });
          }
        }
      } else {
        res.status(400).json({ success: false, message: "Password not match" });
      }
    } else {
      res.status(400).json({ success: false, message: "Some error acccured!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Some error acccured!" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    if (req.method === "POST") {
      const { fname, lname, phone, email, password, cpassword } = req.body;
      if (password === cpassword) {
        let ur = await User.findOne({ email: email });
        if (ur != null) {
          res
            .status(401)
            .json({ success: false, message: "User already exists" });
        } else {
          var ciphertext = CryptoJS.AES.encrypt(
            password,
            AES_SECRET
          ).toString();
          let usr = new User({
            fname: fname,
            lname: lname,
            mobileno: phone,
            email: email,
            password: ciphertext,
          });
          await usr.save();
          res.status(200).json({
            success: true,
            message: "Your Account created successfully!",
          });
        }
      } else {
        res.status(400).json({ success: false, message: "Password not match" });
      }
    } else {
      res.status(400).json({ success: false, message: "Some error acccured!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Some error acccured!" });
  }
});

router.post("/getuser", Authuser, async (req, res) => {
  res.status(200).json({ success: true, user: req.userdata });
});

router.post("/updateprofile", Authuser, async (req, res) => {
  if (req.method === "POST") {
    let email = req.userdata.email;
    const { fname, lname, address, phone, pincode } = req.body;
    await User.findOneAndUpdate(
      { email: email },
      { fname, lname, address, mobileno: phone, pincode },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Account updated successfully!" });
  } else {
    res.status(400).json({ success: false, message: "Some error acccured!" });
  }
});
router.post("/updatepass", Authuser, async (req, res) => {
  if (req.method === "POST") {
    const { email, cupassword, password, cpassword } = req.body;
    if (password === cpassword) {
      const user = await User.findOne({ email: email });
      if (user === null) {
        res
          .status(404)
          .json({ success: false, message: "Invalid credentials" });
      } else {
        var bytes = CryptoJS.AES.decrypt(user.password, AES_SECRET);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (cupassword === originalText) {
          var ciphertext = CryptoJS.AES.encrypt(
            password,
            AES_SECRET
          ).toString();
          await User.findOneAndUpdate(
            { email: email },
            { password: ciphertext },
            { new: true }
          );
          res
            .status(200)
            .json({ success: true, message: "Password updated successfully!" });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Invalid credentials" });
        }
      }
    } else {
      res
        .status(400)
        .json({
          success: false,
          message: "Password and confirm password will does not match!",
        });
    }
  } else {
    res.status(400).json({ success: false, message: "Some error acccured!" });
  }
});

module.exports = router;
