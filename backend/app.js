// const express = require('express');
// const app = express();
// const server = require('http').Server(app);
// const dotenv = require('dotenv');
// const morgan = require('morgan');
// dotenv.config({path: './config.env'});
// const AppError = require('./helpers/appErrors');
// const globalErrorHandler = require('./helpers/error-handler');

// // socket.io connection
// const io = require('socket.io')(server, {
//   cors: 'localhost:3000',
// });

// // cor
// const cors = require('cors');
// app.use(cors());

// // database connnection 
// const connectDB = require('./config/db');
// connectDB();

// app.use(express.json());
// app.use(morgan('tiny'));
// app.use('/public/img/doctor', express.static(__dirname + '/public/img/doctor'));


// // *** Route *** 
// const doctorRoute = require('./routes/doctorRoute');
// const specializationRoute = require('./routes/specializationRoute');
// const medicalRecordRoute = require('./routes/medicalRecordRoute');
// const patientRoute = require('./routes/patientRoute');
// const followUpRoute = require('./routes/followUpRoute');
// const staffRoute = require('./routes/staffRoute');
// const authRoute = require('./routes/authRoute');

// const api = process.env.API_URL;
// app.use(`${api}/doctor`, doctorRoute);
// app.use(`${api}/specialization`, specializationRoute);
// app.use(`${api}/medicalRecord`, medicalRecordRoute);
// app.use(`${api}/patient`, patientRoute);
// app.use(`${api}/followUp`, followUpRoute);
// app.use(`${api}/staff`,staffRoute);
// app.use(`${api}/auth`, authRoute);

// // socket middleware
// const useSocket = require('./helpers/useSocket');
// useSocket(io);

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'API is Running',
//   });
// });

// // Error Handler
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });
// app.use(globalErrorHandler);
 
// // server 
// const PORT = process.env.PORT || 5001;
// server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));

const express = require('express');
const app = express();
const server = require('http').Server(app);
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./helpers/appErrors');
const globalErrorHandler = require('./helpers/error-handler');
dotenv.config({ path: './config.env' });

const corsOptions = {
  origin: [
    'http://localhost:3000', // For local frontend development
    'https://medical-consulting-system.vercel.app' // Your actual deployed Vercel frontend (no trailing slash!)
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Socket.IO CORS config
const io = require('socket.io')(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://medical-consulting-system.vercel.app' // Must match exactly
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


// DB connection
const connectDB = require('./config/db');
connectDB();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/public/img/doctor', express.static(__dirname + '/public/img/doctor'));

// Routes
const api = process.env.API_URL;
app.use(`${api}/doctor`, require('./routes/doctorRoute'));
app.use(`${api}/specialization`, require('./routes/specializationRoute'));
app.use(`${api}/medicalRecord`, require('./routes/medicalRecordRoute'));
app.use(`${api}/patient`, require('./routes/patientRoute'));
app.use(`${api}/followUp`, require('./routes/followUpRoute'));
app.use(`${api}/staff`, require('./routes/staffRoute'));
app.use(`${api}/auth`, require('./routes/authRoute'));

// Socket setup
const useSocket = require('./helpers/useSocket');
useSocket(io);

// Base route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is Running' });
});

// Error handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

// Server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
