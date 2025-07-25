// /********************************************************************
//   doctor.js is part of controller for handleing doctor information.
//   It use for managing doctor models.
// ********************************************************************/

// const express = require('express');
// const {Doctor} = require('../models/Doctor');
// const {Specialization} = require('../models/Specialization');
// const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const APIFeatures = require('../helpers/apiFeatures');
// const AppError = require('../helpers/appErrors')


// // multer is for image upload middleware that is part of upload()
// const multer = require('multer');

// // multerStorage is part of multer configuration
// const multerStorage = multer.diskStorage({
//   destination : (req,file,cb) => {
//     cb(null,'public/img/doctor'); // store image localtion
//   },
//   // file name
//   filename : (req,file,cb) => {
//     const ext = file.mimetype.split('/')[1];
//     const filename = file.originalname.split(' ').join('-');
//     cb(null,`${filename}-${Date.now()}.${ext}`)
//   }
// });

// // multerFilter is part of multer image upload that use for filter file type
// const multerFilter = (req,file,cb) => {
//   if(file.mimetype.startsWith('image')) {
//     cb(null,true)
//   } else {
//     cb(new AppError('Please upload only images',400),false)
//   }
// }

// // upload() is the main multer middleware 
// const upload = multer({
//   storage : multerStorage,
//   fileFilter : multerFilter
// });

// // image midderware export as uploadDoctorPhoto
// exports.uploadDoctorPhoto = upload.single('photo')

// // GET Request in REST API (GET ALL)
// // getAllDoctor() is use for getting all doctor in the database
// exports.getAllDoctor = asyncHandler(async (req, res) => {
//   // Execute query : query.sort().select().skip().limit()
//   const feature = new APIFeatures(Doctor.find().populate('specialization'), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   // get information
//   const doctors = await feature.query;

//   // return HTTP response
//   res.status(200).json({
//     status: 'sucess',
//     DateTime: req.requestTime,
//     result: doctors.length,
//     data: doctors,
//   });
// });

// // GET Request in REST API (GET By ID)
// // getDoctor() is use for getting doctor by id.
// exports.getDoctor = asyncHandler(async (req, res) => {
//   let id = req.params.id;
//   let doctors = {};
//   // for multiple id suchas id=1,2,3
//   if (id.includes(',')) {
//     let array = id.split(',');
//     doctors = await Doctor.find({_id: {$in: array}}).populate('specialization');
//   } else {
//     doctors = await Doctor.findById(req.params.id).populate('specialization');
//   }
//   if (!doctors) {
//     return res.status(404).json({
//       status: 'fail',
//       message: "can't find the doctor",
//     });
//   }

//   // return HTTP response
//   res.status(200).json({
//     status: 'sucess',
//     result: doctors.length,
//     DateTime: req.requestTime,
//     data: doctors,
//   });
// });

// // POST Request in REST API
// // createDoctor() is use for creating a doctor in the database
// exports.createDoctor = asyncHandler(async (req, res) => {
//   // find specialization first
//   const specialization = await Specialization.findById(req.body.specialization);
//   if (!specialization) return res.status(400).send('Invalid specialization');

//   // get information from HTTP request
//   let doctor = new Doctor({
//     name: req.body.name,
//     email: req.body.email,
//     passwordHash: bcrypt.hashSync(req.body.password, 10),
//     phone: req.body.phone,
//     specialization: req.body.specialization,
//     specializationDetail: req.body.specializationDetail,
//     background: req.body.background,
//     hospital: req.body.hospital,
//     gender: req.body.gender
//   });

//   // check for image file
//   if (req.file) {
//     const fileName = req.file.filename;
//     const basePath = `${req.protocol}://${req.get('host')}/public/img/doctor/`;
//     doctor['photo'] = `${basePath}${fileName}`;
//   }

//   // return HTTP response
//   doctor = await doctor.save();
//   res.status(201).json({
//     status: 'sucess',
//     data: doctor,
//   });
// });

// // PUT Request in REST API
// // updateDoctor() is use for updating a doctor in the database
// exports.updateDoctor = asyncHandler(async (req, res) => {
//   // find specialization from HTTP request
//   if (req.body.specialization) {
//     const specialization = await Specialization.findById(req.body.specialization);
//     if (!specialization) return res.status(400).send('Invalid specialization');
//   }
//   // find password from HTTP request
//   if (req.body.password) {
//     req.body.passwordHash = bcrypt.hashSync(req.body.password, 10)
//   }
//   // find file from HTTP request
//   if (req.file) {
//     const fileName = req.file.filename;
//     const basePath = `${req.protocol}://${req.get('host')}/public/img/doctor/`;
//     req.body.photo = `${basePath}${fileName}`;
//   }

//   // get information and update
//   const doctors = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!doctors) {
//     return res.status(404).json({
//       status: 'fail',
//       message: "can't find the doctor",
//     });
//   }

//   // return HTTP response
//   res.status(200).json({
//     status: 'sucess',
//     data: doctors,
//   });
// });

// // DELETE Request in REST API
// // deleteDoctor() is use for deleting a doctor in the database
// exports.deleteDoctor = asyncHandler(async (req, res, next) => {
//   // find and delete
//   await Doctor.findByIdAndDelete(req.params.id);

//   // return HTTP response
//   res.status(204).json({
//     status: 'sucess',
//     data: null,
//   });
// });

// // controller for Doctor Login
// exports.doctorLogin = asyncHandler(async (req, res) => {
//   const doctor = await Doctor.findOne({email: req.body.email});
//   const secret = process.env.secret;
//   if (!doctor) {
//     return res.status(400).json({
//       status: 'fail',
//       data: null,
//       message: 'Incorrent Email or Password',
//     });
//   }
//   // decrypt password have validation.
//   if (doctor && bcrypt.compareSync(req.body.password, doctor.passwordHash)) {
//     const token = jwt.sign(
//       {
//         id: doctor.id,
//         type: 'doctor',
//       },

//       secret,
//       {expiresIn: '1d'}
//     );
//     // return Token as HTTP response
//     res.status(200).json({user: doctor.email, token: token});
//   } else {
//     return res.status(400).json({
//       status: 'fail',
//       data: null,
//       message: 'Incorrent Email or Password',
//     });
//   }
// });

// // checkDoctorLogin() use to checking doctor token information
// exports.checkDoctorLogin = asyncHandler(async (req, res) => {
//   // set local variable to be use with other middleware
//   res.send(res.locals);
// });

// // Modified doctor.js (controller)
// const express = require('express');
// const { Doctor } = require('../models/Doctor');
// const { Specialization } = require('../models/Specialization');
// const asyncHandler = require('express-async-handler');
// const jwt = require('jsonwebtoken');
// const APIFeatures = require('../helpers/apiFeatures');
// const AppError = require('../helpers/appErrors');
// const multer = require('multer');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/doctor');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     const filename = file.originalname.split(' ').join('-');
//     cb(null, `${filename}-${Date.now()}.${ext}`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Please upload only images', 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// exports.uploadDoctorPhoto = upload.single('photo');

// exports.getAllDoctor = asyncHandler(async (req, res) => {
//   const feature = new APIFeatures(Doctor.find().populate('specialization'), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   const doctors = await feature.query;

//   res.status(200).json({
//     status: 'success',
//     DateTime: req.requestTime,
//     result: doctors.length,
//     data: doctors,
//   });
// });

// exports.getDoctor = asyncHandler(async (req, res) => {
//   let id = req.params.id;
//   let doctors = {};
//   if (id.includes(',')) {
//     let array = id.split(',');
//     doctors = await Doctor.find({ _id: { $in: array } }).populate('specialization');
//   } else {
//     doctors = await Doctor.findById(req.params.id).populate('specialization');
//   }
//   if (!doctors) {
//     return res.status(404).json({ status: 'fail', message: "can't find the doctor" });
//   }
//   res.status(200).json({
//     status: 'success',
//     result: doctors.length || 1,
//     DateTime: req.requestTime,
//     data: doctors,
//   });
// });

// exports.createDoctor = asyncHandler(async (req, res) => {
//   const specialization = await Specialization.findById(req.body.specialization);
//   if (!specialization) return res.status(400).send('Invalid specialization');

//   let doctor = new Doctor({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password, // store as plain text
//     phone: req.body.phone,
//     specialization: req.body.specialization,
//     specializationDetail: req.body.specializationDetail,
//     background: req.body.background,
//     hospital: req.body.hospital,
//     gender: req.body.gender,
//   });

//   if (req.file) {
//     const fileName = req.file.filename;
//     const basePath = `${req.protocol}://${req.get('host')}/public/img/doctor/`;
//     doctor['photo'] = `${basePath}${fileName}`;
//   }

//   doctor = await doctor.save();
//   res.status(201).json({ status: 'success', data: doctor });
// });

// exports.updateDoctor = asyncHandler(async (req, res) => {
//   if (req.body.specialization) {
//     const specialization = await Specialization.findById(req.body.specialization);
//     if (!specialization) return res.status(400).send('Invalid specialization');
//   }

//   if (req.body.password) {
//     req.body.password = req.body.password; // store plain password
//   }

//   if (req.file) {
//     const fileName = req.file.filename;
//     const basePath = `${req.protocol}://${req.get('host')}/public/img/doctor/`;
//     req.body.photo = `${basePath}${fileName}`;
//   }

//   const doctors = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!doctors) {
//     return res.status(404).json({ status: 'fail', message: "can't find the doctor" });
//   }

//   res.status(200).json({ status: 'success', data: doctors });
// });

// exports.deleteDoctor = asyncHandler(async (req, res) => {
//   await Doctor.findByIdAndDelete(req.params.id);
//   res.status(204).json({ status: 'success', data: null });
// });

// exports.doctorLogin = asyncHandler(async (req, res) => {
//   const doctor = await Doctor.findOne({ email: req.body.email });
//   const secret = process.env.secret;

//   if (!doctor) {
//     return res.status(400).json({ status: 'fail', message: 'Incorrect Email or Password' });
//   }

//   if (doctor.password === req.body.password) {
//     const token = jwt.sign({ id: doctor.id, type: 'doctor' }, secret, { expiresIn: '1d' });
//     res.status(200).json({ user: doctor.email, token: token });
//   } else {
//     res.status(400).json({ status: 'fail', message: 'Incorrect Email or Password' });
//   }
// });

// exports.checkDoctorLogin = asyncHandler(async (req, res) => {
//   res.send(res.locals);
// });


const express = require('express');
const { Doctor } = require('../models/Doctor');
const { Specialization } = require('../models/Specialization');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const APIFeatures = require('../helpers/apiFeatures');
const AppError = require('../helpers/appErrors');
const multer = require('multer');
const mongoose = require('mongoose');

// Multer config
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/doctor');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const filename = file.originalname.split(' ').join('-');
    cb(null, `${filename}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadDoctorPhoto = upload.single('photo');

// GET all doctors
exports.getAllDoctor = asyncHandler(async (req, res) => {
  const feature = new APIFeatures(Doctor.find().populate('specialization'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doctors = await feature.query;

  res.status(200).json({
    status: 'success',
    DateTime: req.requestTime,
    result: doctors.length,
    data: doctors,
  });
});

// GET doctor by ID
exports.getDoctor = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let doctors = {};

  if (id.includes(',')) {
    let array = id.split(',');
    doctors = await Doctor.find({ _id: { $in: array } }).populate('specialization');
  } else {
    doctors = await Doctor.findById(id).populate('specialization');
  }

  if (!doctors) {
    return res.status(404).json({ status: 'fail', message: "can't find the doctor" });
  }

  res.status(200).json({
    status: 'success',
    result: Array.isArray(doctors) ? doctors.length : 1,
    DateTime: req.requestTime,
    data: doctors,
  });
});

// CREATE doctor
exports.createDoctor = asyncHandler(async (req, res) => {
  const specialization = await Specialization.findById(req.body.specialization);
  if (!specialization) return res.status(400).send('Invalid specialization');

  let doctor = new Doctor({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // stored as plain text
    phone: req.body.phone,
    specialization: specialization._id, // ✅ safe assignment
    specializationDetail: req.body.specializationDetail,
    background: req.body.background,
    hospital: req.body.hospital,
    gender: req.body.gender,
  });

  if (req.file) {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/img/doctor/`;
    doctor.photo = `${basePath}${fileName}`;
  }

  doctor = await doctor.save();
  res.status(201).json({ status: 'success', data: doctor });
});

// UPDATE doctor
exports.updateDoctor = asyncHandler(async (req, res) => {
  // Validate and reassign specialization safely
  if (req.body.specialization) {
    const specialization = await Specialization.findById(req.body.specialization);
    if (!specialization) return res.status(400).send('Invalid specialization');
    req.body.specialization = specialization._id; // ✅ prevent corruption
  }

  // Handle photo upload
  if (req.file) {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/img/doctor/`;
    req.body.photo = `${basePath}${fileName}`;
  }

  const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedDoctor) {
    return res.status(404).json({ status: 'fail', message: "can't find the doctor" });
  }

  res.status(200).json({ status: 'success', data: updatedDoctor });
});

// DELETE doctor
exports.deleteDoctor = asyncHandler(async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: 'success', data: null });
});

// DOCTOR login
exports.doctorLogin = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!doctor) {
    return res.status(400).json({ status: 'fail', message: 'Incorrect Email or Password' });
  }

  if (doctor.password === req.body.password) {
    const token = jwt.sign({ id: doctor.id, type: 'doctor' }, secret, { expiresIn: '1d' });
    res.status(200).json({ user: doctor.email, token: token });
  } else {
    res.status(400).json({ status: 'fail', message: 'Incorrect Email or Password' });
  }
});

// Token checker
exports.checkDoctorLogin = asyncHandler(async (req, res) => {
  res.send(res.locals);
});
