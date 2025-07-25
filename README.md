
# Medical Consultation System

A full-stack web application that facilitates remote video consultations between patients and doctors, including authentication, medical record management, and real-time video calling.


## 🚀 Features

### 🔑 Authentication

* Google Sign-In for patients (via Firebase)
* Manual login for doctors and staff
* Role-based redirection after login

### �‍⚕️ Video Consultation

* Real-time peer-to-peer video calls using **PeerJS** and **Socket.IO**
* Responsive UI for mobile and desktop

### 📅 Medical Record Management

* Doctors can access and manage patient medical records during calls
* Patients can view their past consultations and records




## 🔗 Live URLs


- **Frontend (Vercel):** [https://medical-consulting-system.vercel.app](https://medical-consulting-system.vercel.app)
- **Backend (Render):** [https://medicalconsultingsystem.onrender.com](https://medicalconsultingsystem.onrender.com)




## 🚀 Tech Stack

### Frontend

* **React.js**
* **Tailwind CSS**
* **Ant Design** (for forms)
* **Firebase** (Google Auth)
* **Socket.IO Client**
* **PeerJS** (WebRTC abstraction)

### Backend

* **Node.js** + **Express.js**
* **MongoDB** (with Mongoose)
* **Socket.IO**



## 🚀 Installation Guide

### 1. Clone the repository

```bash
git clone https://github.com/SakethKumarTallam/MedicalConsultingSystem.git
cd MedicalConsultingSystem
```
### 2.Backend Setup 
#### Environment Variables
* Create a config.env file in the /backend directory:

```
NODE_ENV=development
PORT=5001
MONGO_URI=<your-mongo-url>
API_URL=/api/v1
secret= <Enter Anything>
BACKEND_API_URL = <localhost:port> or  <backend deployment link>
```

Install Dependencies & Start
```bash 
cd backend
npm install
npm start
```
### 3. Frontend Setup 
#### Environment Variables
- Create a .env file in the /frontend directory:

```
REACT_APP_API_URL= http://localhost:5001
REACT_APP_SOCKET_URL= http://localhost:5001

```
* For deployment, replace localhost:5001 with your Render backend URL:


#### Axios Configuration
* Make sure there's an `axios.js` in src/utils/:

#### Firebase Admin SDK
* Add your Firebase Admin credentials and configure them in `firebase.js`

#### Install Dependencies & Start
```bash 
cd backend
npm install
npm start
```



## 🔧 Key Functionalities

### Authentication Flow

* **Patient:** Google login using Firebase Auth → Redirect to `/patient/home`
* **Doctor:** Login via credentials stored in DB → Redirect to `/doctor`

### Video Call Flow

1. User navigates to call room (`/call/:id`)
2. Video streams initialized using WebRTC via PeerJS
3. Real-time signaling using Socket.IO
4. Responsive design ensures mobile support

### Medical Record Access

* Doctor sees "Medical Record" button during video call
* Opens in a new tab to manage that patient's records

---

