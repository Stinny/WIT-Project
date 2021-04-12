const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  registerValidation,
  loginValidation,
} = require('../validation/authValidation');

//route for getting user info
//needs to be protected by everyone but the req.user
router.get('/getuserinfo', async (req, res) => {
  if (!req.user) return res.json({ error: 'you need to be signed in' });

  try {
    const user = await User.findById({ _id: req.user.userId });
    res.json({
      userId: user._id,
      userName: user.userName,
      dateJoined: user.dateJoined,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//route for registering a user on our server
router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //pulls username, email, password out of request body
  const { username, email, password } = req.body;

  //check user database if username already taken
  const userNameTaken = await User.findOne({ userName: username });
  if (userNameTaken) return res.status(400).json('Username already taken');

  //check user database if email already exists
  const emailExists = await User.findOne({ email: email });
  if (emailExists) return res.status(400).json('Email already exists');

  //create hash of password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //console.log(salt);

  //creates new user from User model
  const user = new User({
    userName: username,
    email: email,
    password: hashedPassword,
  });

  //generate tokens and send them back to user if user info successfully saved in database
  const accessToken = generateAccessToken(user._id, user.userName);
  const refreshToken = generateRefreshToken(user._id, user.userName);

  try {
    const savedUser = await user.save();
    res.json({
      user: user._id,
      userName: user.userName,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//route for login (getting an access and refresh token from server)
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;

  //check if user exists
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json('Email or password incorrect');

  //check if password was entered correctly
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json('Email or password incorrect');

  const accessToken = generateAccessToken(user._id, user.userName);
  const refreshToken = generateRefreshToken(user._id, user.userName);

  //create and save refresh token
  //const token = new TokenOut({
  //  token: refreshToken,
  //});

  res.json({
    userId: user._id,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});

//functions for generating tokens
function generateAccessToken(userId, userName) {
  return jwt.sign(
    { userId: userId, userName: userName },
    process.env.ACCESS_TOKEN_SECRET
  );
}

function generateRefreshToken(userId, userName) {
  return jwt.sign(
    { userId: userId, userName: userName },
    process.env.REFRESH_TOKEN_SECRET
  );
}

module.exports = router;
