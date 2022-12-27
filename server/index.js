const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('./models/user');

const app = express();
app.use(require('cors')());
app.use(express.json());

app.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.create({
    email,
    password,
  });
  const token = jwt.sign({ id: user._id, state: user.state }, '12345678');
  return res.send({
    message: 'SignedUp',
    token,
  });
});

app.post('/verify-token', async (req, res, next) => {
  const token = req.body.token;
  try {
    jwt.verify(token, '12345678');
    return res.json({
      message: 'Token Valid',
      valid: true,
    });
  } catch (error) {
    return res.json({
      message: 'Token InValid',
      valid: false,
    });
  }
});

app.post('/login', async (req, res, next) => {});

app.post('/verify-email', async (req, res, next) => {
  try {
    const payload = jwt.verify(req.headers['authorization'], '12345678');
    console.log(req.body);
    if (req.body.otp != '123456') {
      return res.status(400).json({
        message: 'Invalid OTP',
      });
    }
    await User.updateOne({ _id: payload.id }, { $set: { state: 1 } });
    const token = jwt.sign({ id: payload.id, state: 1 }, '12345678');
    return res.json({
      message: 'Verified',
      token,
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Token Expired',
    });
  }
});

app.post('/complete-profile', async (req, res, next) => {
  try {
    const oldToken = req.headers.authorization;
    const payload = jwt.verify(oldToken, '12345678');
    const token = jwt.sign({ id: payload.id, state: 0 }, '12345678');
    return res.json({
      message: 'Profile complete',
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error',
    });
  }
});

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    return app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
