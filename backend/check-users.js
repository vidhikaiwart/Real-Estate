require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
    
    const users = await User.find({});
    console.log(`\nFound ${users.length} users:`);
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}, Active: ${user.isActive}`);
    });
    
    if (users.length === 0) {
      console.log('\nNo users found. You need to register a user first!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkUsers();
