// // db.js is config file for database

// const mongoose = require('mongoose');

// //  connectDB() is use for mongodb database confic
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);

//     console.log(`MongoDB Connected : ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error ${error.message}`);
//     process.exit(1);
//   }
// };

// // Export module as connectDB
// module.exports = connectDB;
 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Specialization } = require('../models/Specialization');
const { Staff } = require('../models/Staff');

dotenv.config();

const specializations = [
  { specialization: 'Cardiology', detail: 'Heart and cardiovascular system' },
  { specialization: 'Neurology', detail: 'Nervous system and brain disorders' },
  { specialization: 'Pediatrics', detail: 'Healthcare for infants and children' },
  { specialization: 'Dermatology', detail: 'Skin, hair, and nail disorders' },
  { specialization: 'Orthopedics', detail: 'Bones, joints, and muscles' },
  { specialization: 'Ophthalmology', detail: 'Eye and vision care' },
  { specialization: 'Gynecology', detail: 'Female reproductive health' },
  { specialization: 'Oncology', detail: 'Cancer diagnosis and treatment' },
  { specialization: 'Psychiatry', detail: 'Mental health and behavioral disorders' },
  { specialization: 'General Surgery', detail: 'Common surgical procedures' },
];

const staff = {
  name: "AdminUser",
  email: "admin@hospital.com",
  password: "admin123",
  phone: "9876543210",
  gender: "Female",
  position: "Admin",
  salary: 85000
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    const specCount = await Specialization.countDocuments();
    if (specCount === 0) {
      await Specialization.insertMany(specializations);
      console.log('🌱 Specializations seeded successfully');
    } else {
      console.log(`✅ Specializations already exist (${specCount} entries). Skipping seeding.`);
    }

    const existingAdmin = await Staff.findOne({ email: staff.email });
    if (!existingAdmin) {
      await Staff.create(staff);
      console.log('✅ Admin staff created');
    } else {
      console.log('✅ Admin staff already exists. Skipping creation.');
    }

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

