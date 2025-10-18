// Configuration file for PhotoPrintX backend
require('dotenv').config({ path: __dirname + '/../.env' });

module.exports = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // MongoDB configuration
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/photoprintx',
  
  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || 'photoprintx_jwt_secret_key',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  
  // Cloudinary configuration
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || ''
  },
  
  // Razorpay configuration
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder_key',
    keySecret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret'
  },
  
  // CORS configuration
  corsOptions: {
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true
  }
};
