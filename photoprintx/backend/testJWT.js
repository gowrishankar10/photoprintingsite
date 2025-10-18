const jwt = require('jsonwebtoken');
const config = require('./config/config');

function testJWT() {
  try {
    const token = jwt.sign({ userId: 'test123' }, config.jwtSecret, {
      expiresIn: config.jwtExpire
    });
    console.log('Token:', token);
    
    const decoded = jwt.verify(token, config.jwtSecret);
    console.log('Decoded:', decoded);
  } catch (error) {
    console.error('JWT error:', error);
  }
}

testJWT();
