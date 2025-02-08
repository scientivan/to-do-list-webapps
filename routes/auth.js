require('dotenv').config();
const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const { body, check, validationResult } = require('express-validator');
const auth = require('../controllers/auth');
const bcrypt = require('bcrypt');
const { userModel } = require('../models/dbModel');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router();



router.get('/check-auth', (req, res) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (res.locals.isAuthenticated) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// Register user
router.post('/register', async (req, res) => {

  console.log(req.body)
  const duplicate = await userModel.findOne({ 'email': req.body.email });
  if (duplicate) {
    throw new Error('Email sudah terdaftar!');
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const hash = await bcrypt.hash(req.body.password, 13);
  req.body.password = hash;
  
  await userModel.insertMany(req.body);
  const newUser = await userModel.findOne({ email: req.body.email });
  
  // Set session ID, but for REST API, it will be handled through a token (JWT, etc.)
  res.status(201).json({
    message: 'Akun berhasil dibuat',
    user: newUser,
  });
});

// Google login strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SERVER,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true,
  },
  async function (req, accessToken, refreshToken, profile, done) {
    try {
      const user = await userModel.findOne({ 'google_id': profile.id });
      if (user) {
        return done(null, user);
      } else {

        const userData = {
          google_id: profile.id,
          nama: profile.displayName,
          email: profile.emails[0].value,
        };
        await userModel.insertMany(userData);
        return done(null, profile);
      }
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google login API endpoint
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Google callback API
router.get('/google/callback',
  passport.authenticate('google'),
  async (req, res) => {
    if (req.user.email) {
      // Use token or session management here for REST API, not redirection
      res.status(200).json({
        message: 'Berhasil masuk ke akun',
        user: req.user,
      });
    } else {
      if (req.user.emails[0].value) {
        const newUser = await userModel.findOne({ email: req.user.emails[0].value });
        if (newUser) {
          res.status(201).json({
            message: 'Berhasil membuat akun',
            user: newUser,
          });
        }
      } else {
        res.status(400).json({ message: 'Login gagal' });
      }
    }
  }
);

// Login user
router.post('/login', async (req, res) => {
  const userAccount = await userModel.findOne({ 'email': req.body.email });
  if (!userAccount) {
    return res.status(404).json({ message: 'Akun tidak ditemukan, silakan coba lagi' });
  } else {
    const isValid = await bcrypt.compare(req.body.password, userAccount.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Password salah' });
    } else {
      // Set session ID or return a token here for API

      req.session.user = { id: crypto.randomUUID(), email: req.body.email };
      res.status(200).json({
        message: 'Berhasil masuk ke akun',
        user: userAccount,
      });
    }
  }
});

// Logout user
router.post('/logout', (req, res) => {
  console.log('hai aku dipanggil')
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).json({ message: 'Logout gagal' });
      }
      res.clearCookie('connect.sid'); // Menghapus cookie session
      res.locals.isAuthenticated = undefined; // Pindahkan ke sini
      res.status(200).json({ message: 'Logout sukses' });
  });
});


module.exports = router;
