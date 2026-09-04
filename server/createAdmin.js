const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Check if an admin already exists
        const adminExists = await User.findOne({ username: 'admin' });
        if (adminExists) {
            console.log('⚠️ Admin user already exists!');
            process.exit();
        }

        // Create admin user (Password will be hashed automatically by User.js model)
        const admin = new User({
            username: 'admin',
            password: 'Admin1234' // Change this to your desired password
        });

        await admin.save();
        console.log('✅ Admin user created successfully with hashed password!');
        process.exit();
    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
        process.exit(1);
    }
};

createAdminUser();