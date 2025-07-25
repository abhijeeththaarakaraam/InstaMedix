// // add doctor to database
// import {useState,useEffect} from 'react';
// import {useHistory} from 'react-router-dom';
// import ConfirmIcon from '../../../img/confirm.png';
// import Axios from 'utils/axios';

// const AddDoctor = () => {
//   const history = useHistory();

//   // specialization
//   const [specialization, setSpec] = useState({
//     data: [],
//     isPending: true,
//     error: null,
//   });

//   // doctor information
//   const [name, setName] = useState();
//   const [gender, setGender] = useState();
//   const [SP, setSP] = useState();
//   const [email, setEmail] = useState();
//   const [phone, setPhone] = useState();
//   const [password, setPassword] = useState();
//   const [confirmPass, setConfirmPass] = useState();
//   const [hospital, setHospital] = useState();
//   const [background, setBackground] =useState();
//   const [SD, setSD] = useState();
//   const [photo, setPhoto] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchSpecialization(setSpec); // get specialization
//   }, [setSpec]);

//   // token
//   const config = {
//     headers: {
//       'x-acess-token': localStorage.getItem('token'),
//     },
//   };

//   // add doctor
//   const handleSubmit = async (e) => {
//     let formData = new FormData();
//     formData.append('name', name);
//     formData.append('gender', gender);
//     formData.append('specialization',SP);
//     formData.append('password',password);
//     formData.append('email', email);
//     formData.append('phone', phone);
//     formData.append('hospital', hospital);
//     formData.append('specializationDetail', SD);
//     formData.append('background', background);
//     if (photo) {
//       formData.append('photo', photo);
//     }

//     if (password !== confirmPass) {
//       setError("Password Doesn't match");
//     } else {
//     e.preventDefault();
//     Axios.post(`/api/v1/doctor/`, formData, config)
//       .then((res) => {
//         return res.data;
//       })
//       .then(() => {
//         history.goBack();
//       })
//       .catch((err) => {
//         console.log(err.response.data);
//         setError(err.response.data.message);
//       });
//     }
//   };

//   return (
//     <div className='font-fontPro'>
//       <div className='p-3'>
//         <button className='text-base text-gray-700' onClick={history.goBack}>
//           <i className='fas fa-chevron-left text-gray-700'></i>
//           <span> Back</span>
//         </button>
//       </div>
//       <div className='flex-col'>
//         <div className='text-center mb-2'>
//           <h1 className='text-2xl font-bold'>Add Doctor</h1>
//         </div>

//         <div className='flex justify-center px-20 py-2 mb-2'>
//           <div
//             className='bg-white shadow-xl w-2/3 overflow-hidden rounded-lg'
//             style={{maxWidth: 1000}}
//           >
//             <form onSubmit={handleSubmit}>
//               <div className='w-full py-10 px-5 md:px-10 bg-white'>
//                 <div className='flex -mx-3'>
//                   <div className='w-2/5 px-3 mb-2'>
//                     <label className='text-xs px-1 text-black'>Name</label>
//                     <div className='flex'>
//                       <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
//                       <input
//                         onChange={(e) => setName(e.target.value)}
//                         className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
//                       />
//                     </div>
//                   </div>
//                   <div className='w-1/5 px-3 mb-2'>
//                     <label className='text-xs px-1 text-black'>Gender</label>
//                     <div className='flex'>
//                       <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
//                       <select
//                         onChange={(e) => setGender(e.target.value)}
//                         className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
//                       >
//                         <option value="---">---</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className='w-2/5 px-3 mb-2'>
//                     <label className='text-xs px-1 text-black'>Specialization</label>
//                     <div className='flex'>
//                       <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
//                       <select
//                         onChange={(e) => setSP(e.target.value)}
//                         className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
//                       >
//                           <option value="---">---</option>
//                         {specialization.data &&
//                           specialization.data.map((item) => (
//                             <option key={item.id} value={item.id}>
//                               {item.specialization}
//                             </option>
//                           ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className='flex -mx-3'>
//                   <div className='w-1/2 px-3 mb-2'>
//                     <label className='text-xs px-1 text-black'>Email</label>
//                     <div className='flex'>
//                       <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
//                       <input
//                         onChange={(e) => setEmail(e.target.value)}
//                         className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
//                       />
//                     </div>
//                   </div>
//                   <div className='w-1/2 px-3 mb-2'>
//                     <label className='text-xs px-1 text-black'>
//                       Phone number
//                     </label>
//                     <div className='flex'>
//                       <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
//                       <input
//                         onChange={(e) => setPhone(e.target.value)}
//                         className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className='flex -mx-3'>
//                   <div className='w-1/2 px-3 mb-2'>
//                     <label className='text-xs px-1 text-black'>Password</label>
//                     <div className='flex'>
//                       <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
//                       <input
//                       type="password"
//                         onChange={(e) => setPassword(e.target.value)}
//                         className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
//                       />
//                     </div>
//                   </div>
//                   <div className='w-1/2 px-3 mb-2'>
//                     <label className='text-xs px-1 text-black'>
//                       Confirm Password
//                     </label>
//                     <div className='flex'>
//                       <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
//                       <input
//                       type="password"
//                         onChange={(e) => setConfirmPass(e.target.value)}
//                         className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className='flex -mx-3'>
//                   <div className='w-1/2 px-3 mb-2'>
//                     <label className='text-xs px-1 text-black'>Hospital</label>
//                     <div className='flex'>
//                       <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
//                       <input
//                         onChange={(e) => setHospital(e.target.value)}
//                         className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
//                       />
//                     </div>
//                   </div>
//                   <div className='w-1/2 px-3 mb-2'>
//                     <label className='text-xs px-1 text-black'>Background</label>
//                     <div className='flex'>
//                       <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
//                       <input
//                         onChange={(e) => setBackground(e.target.value)}
//                         className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
//                       />
//                     </div>
//                   </div>
                  
//                 </div>
//                 <div className='flex -mx-3'>
//                   <div className='w-1/2 px-3 mb-2'>
//                     <label className='text-xs px-1 text-black'>
//                       Specialization detail
//                     </label>
//                     <div className='flex'>
//                       <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
//                       <textarea
//                         onChange={(e) => setSD(e.target.value)}
//                         className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
//                       />
//                     </div>
//                   </div>
//                   <div className='w-1/2 px-3 mb-2'>
//                     <label className='text-xs px-1 text-black'>Picture</label>
//                     <div className='flex'>
//                       <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
//                       <input
//                         type='file'
//                         onChange={(e) => setPhoto(e.target.files[0])}
//                         className='w-full -ml-10 pl-1 pr-3 py-2 rounded-lg outline-none focus:border-indigo-500 '
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className='text-center'>
//                   {error ? (
//                     <h1 className='text-base text-red-700 font-normal'>
//                       {error}
//                     </h1>
//                   ) : (
//                     <span> </span>
//                   )}
//                 </div>
//                 <div className='flex justify-end'>
//                   <button
//                     type='submit'
//                     className='bg-green-400 hover:bg-green-500 font-bold py-2 px-4 mt-5 rounded inline-flex'
//                   >
//                     <img className='w-8 h-10 py-1 -mr-3' src={ConfirmIcon} alt=""/>
//                     <div className='flex flex-col ml-5'>
//                       <h1 className='py-2 text-xl text-white'>Confirm</h1>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const fetchSpecialization = (setSpec) => {
//   const fetchType = async () => {
//     try {
//       let res = await Axios.get(`/api/v1/specialization/`);
//       let data = res.data.data;

//       if (!Array.isArray(data)) {
//         data = [data];
//       }
//       setSpec({
//         data: data,
//         isPending: false,
//         error: null,
//       });
//     } catch (error) {
//       setSpec({
//         data: null,
//         isPending: false,
//         error: error,
//       });
//     }
//   };
//   fetchType();
// };

// export default AddDoctor;


import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ConfirmIcon from '../../../img/confirm.png';
import Axios from 'utils/axios';

const AddDoctor = () => {
  const history = useHistory();

  const [specialization, setSpec] = useState({
    data: [],
    isPending: true,
    error: null,
  });

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [SP, setSP] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [hospital, setHospital] = useState('');
  const [background, setBackground] = useState('');
  const [SD, setSD] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSpecialization(setSpec);
  }, []);

  const config = {
    headers: {
      'x-acess-token': localStorage.getItem('token'),
      'Content-Type': 'multipart/form-data',
    },
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPass) {
    setError("Passwords do not match");
    return;
  }

  // Find the selected specialization object from the list
  // const selectedSpec = specialization.data.find((spec) => spec.id === SP);
  const selectedSpec = specialization.data.find((spec) => spec._id === SP);


  // Fallback to specialization.detail if SD is empty
  const specializationDetailValue = SD?.trim() || selectedSpec?.detail || '';

  let formData = new FormData();
  formData.append('name', name);
  formData.append('gender', gender);
  // formData.append('specialization', SP);
  formData.append('specialization', String(SP));

  formData.append('password', password);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('hospital', hospital);
  formData.append('specializationDetail', specializationDetailValue);
  formData.append('background', background);
  if (photo) {
    formData.append('photo', photo);
  }

  try {
    await Axios.post(`/api/v1/doctor/`, formData, config);
    history.goBack();
  } catch (err) {
    console.error(err.response?.data || err.message);
    setError(err.response?.data?.message || 'Something went wrong');
  }
};


  return (
    <div className='font-fontPro'>
      <div className='p-3'>
        <button className='text-base text-gray-700' onClick={history.goBack}>
          <i className='fas fa-chevron-left text-gray-700'></i> <span> Back</span>
        </button>
      </div>

      <div className='text-center mb-4'>
        <h1 className='text-2xl font-bold'>Add Doctor</h1>
      </div>

      <div className='flex justify-center px-20 py-2'>
        <div className='bg-white shadow-xl w-2/3 overflow-hidden rounded-lg' style={{ maxWidth: 1000 }}>
          <form onSubmit={handleSubmit}>
            <div className='w-full py-10 px-5 md:px-10 bg-white'>
              <div className='flex -mx-3'>
                <Input label='Name' onChange={setName} />
                <Select label='Gender' onChange={setGender} options={['---', 'Male', 'Female']} />
                <Select
                  label='Specialization'
                  onChange={setSP}
                  options={specialization.data.map((item) => ({
                    label: item.specialization,
                    value: item._id,
                  }))}
                />
              </div>

              <div className='flex -mx-3'>
                <Input label='Email' onChange={setEmail} />
                <Input label='Phone number' onChange={setPhone} />
              </div>

              <div className='flex -mx-3'>
                <Input label='Password' type='password' onChange={setPassword} />
                <Input label='Confirm Password' type='password' onChange={setConfirmPass} />
              </div>

              <div className='flex -mx-3'>
                <Input label='Hospital' onChange={setHospital} />
                <Input label='Background' onChange={setBackground} />
              </div>

              <div className='flex -mx-3'>
                <TextArea label='Specialization Detail' onChange={setSD} />
                <FileInput label='Picture' onChange={setPhoto} />
              </div>

              {error && (
                <div className='text-center text-red-700 font-semibold mt-2'>{error}</div>
              )}

              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='bg-green-400 hover:bg-green-500 font-bold py-2 px-4 mt-5 rounded inline-flex'
                >
                  <img className='w-8 h-10 py-1 -mr-3' src={ConfirmIcon} alt='' />
                  <div className='flex flex-col ml-5'>
                    <h1 className='py-2 text-xl text-white'>Confirm</h1>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable input component
const Input = ({ label, onChange, type = 'text' }) => (
  <div className='w-1/2 px-3 mb-2'>
    <label className='text-xs px-1 text-black'>{label}</label>
    <input
      type={type}
      onChange={(e) => onChange(e.target.value)}
      className='w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
    />
  </div>
);

// Reusable select component
const Select = ({ label, onChange, options }) => (
  <div className='w-1/3 px-3 mb-2'>
    <label className='text-xs px-1 text-black'>{label}</label>
    <select
      onChange={(e) => onChange(e.target.value)}
      className='w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
    >
      <option value=''>---</option>
      {options.map((opt, idx) =>
        typeof opt === 'string' ? (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ) : (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )
      )}
    </select>
  </div>
);

// Text area
const TextArea = ({ label, onChange }) => (
  <div className='w-1/2 px-3 mb-2'>
    <label className='text-xs px-1 text-black'>{label}</label>
    <textarea
      onChange={(e) => onChange(e.target.value)}
      className='w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
    />
  </div>
);

// File input
const FileInput = ({ label, onChange }) => (
  <div className='w-1/2 px-3 mb-2'>
    <label className='text-xs px-1 text-black'>{label}</label>
    <input
      type='file'
      onChange={(e) => onChange(e.target.files[0])}
      className='w-full pl-1 pr-3 py-2 rounded-lg outline-none focus:border-indigo-500'
    />
  </div>
);

const fetchSpecialization = (setSpec) => {
  const fetchType = async () => {
    try {
      const res = await Axios.get(`/api/v1/specialization/`);
      const data = res.data.data;
      setSpec({ data: Array.isArray(data) ? data : [data], isPending: false, error: null });
    } catch (error) {
      setSpec({ data: [], isPending: false, error: error.message });
    }
  };
  fetchType();
};

export default AddDoctor;
