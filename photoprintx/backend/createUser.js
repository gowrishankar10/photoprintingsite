const mongoose = require('mongoose');
const User = require('./models/User');
const config = require('./config/config');

// Connect to database
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createUser = async () => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: 'user@example.com' });
    if (existingUser) {
      console.log('User already exists');
      process.exit();
    }

    // Create regular user
    const user = new User({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'user123',
      role: 'user'
    });

    await user.save();
    console.log('Regular user created successfully');
    console.log('Email: user@example.com');
    console.log('Password: user123');
    console.log('Role: user');

    process.exit();
  } catch (error) {
    console.error('Error creating user:', error);
    process.exit(1);
  }
};

createUser();
