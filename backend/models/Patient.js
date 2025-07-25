// /* Doctor data model for mongodb and mongoose */

// const mongoose = require('mongoose');

// const patientSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   passwordHash: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//     enum: ['Male', 'Female'],
//   },
//   birthdate: {
//     type: Date,
//     required: true,
//   },
//   IDcard: {
//     type: Number,
//     required: true,
//   },
//   currentAddress: {
//     type: String,
//     default: null,
//   },
//   relative: {
//     name: {type: String, default: null},
//     phoneNumber: {type: String, default: null},
//     relativeType: {type: String, default: null},
//   },
//   allergy: {type: String, default: null},
//   bloodType: {
//     type: String,
//     enum: ['A', 'B', 'O', 'AB', null],
//     default: null,
//   },
// });

// patientSchema.virtual('id').get(function () {
//   return this._id.toHexString();
// });

// patientSchema.set('toJSON', {
//   virtuals: true,
// });

// exports.Patient = mongoose.model('Patient', patientSchema);
// exports.patientSchema = patientSchema;


/* Patient data model for MongoDB and Mongoose */

// const mongoose = require('mongoose');

// const patientSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   password: { // plain password
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//     enum: ['Male', 'Female'],
//   },
// });

// patientSchema.virtual('id').get(function () {
//   return this._id.toHexString();
// });

// patientSchema.set('toJSON', {
//   virtuals: true,
// });

// exports.Patient = mongoose.model('Patient', patientSchema);
// exports.patientSchema = patientSchema;

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removed unique because Google users may share names
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firebaseUid: {
    type: String,
    default: null,
  },
  photo: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Not specified'],
    default: 'Not specified',
  },
  birthdate: {
    type: Date,
  },
  IDcard: {
    type: String,
  },
  bloodType: {
    type: String,
  },
  allergy: {
    type: String,
  },
  currentAddress: {
    type: String,
  },
  relative: {
    name: String,
    phoneNumber: String,
    relativeType: String,
  },
});

patientSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

patientSchema.set('toJSON', {
  virtuals: true,
});

exports.Patient = mongoose.model('Patient', patientSchema);
exports.patientSchema = patientSchema;
