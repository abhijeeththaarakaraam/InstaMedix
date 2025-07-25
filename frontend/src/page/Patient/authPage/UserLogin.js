// // User login as patient
// import React from 'react';
// import LogoPic from '../../../img/Medical_research.svg';
// import Axios from 'utils/axios';
// import {useState} from 'react';
// import {useHistory, Link} from 'react-router-dom';
// import {useFetchUser} from '../../../context/userContext';


// const UserLogin = () => {
//   // patient's information
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [error, setError] = useState(false);
//   const history = useHistory();
//   const {refetch} = useFetchUser();

//   // API
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     axios
//       .post('/api/v1/patient/login', {
//         email: email,
//         password: password,
//       })
//       .then((res) => {
//         return res.data;
//       })
//       .then((data) => {
//         localStorage.setItem('token', data.token);
//         refetch();
//         history.push('/home');
//       })
//       .catch((err) => {
//         console.log(err.response.data);
//         setError(err.response.data);
//       });
//   };

//   return (
//     <div className='h-screen overflow-auto flex items-center justify-center font-fontPro '>
//       <div className='p-2 w-4/5'>
//         <div className='block lg:flex bg-white lg:shadow-lg rounded-lg'>
//           <div className='w-full lg:w-1/2 flex lg:border-r border-gray-200 bg-plightBlue'>
//             <div className='m-auto rounded-full'>
//               <img className='w-full lg:flex p-16' src={LogoPic} alt='logo' />
//             </div>
//           </div>
//           <div className='w-full lg:w-1/2 px-6 py-16'>
//             <div className='mb-10 font-semibold tracking-widest text-2xl text-center'>
//               LOGIN
//             </div>
//             <form onSubmit={handleSubmit}>
//               <div className='mb-4 lg:flex justify-center flex justify-items-center'>
//                 <input
//                   type='email'
//                   name='email'
//                   id='email'
//                   className='focus:border-blue-500 appearance-none  rounded-xl w-8/12 py-2 px-3 text-gray-700 
//                         leading-tight focus:outline-none border-2  border-gray-200'
//                   autoComplete='email'
//                   required
//                   placeholder='Email : example123@gmail.com'
//                   onChange={(e) => setEmail(e.target.value)}
//                 />

//                 <div v-if='feedback.email.error'>
//                   <div
//                     className='text-sm text-red-500 mt-2'
//                     v-text='feedback.email.message'
//                   ></div>
//                 </div>
//               </div>
//               <div className='mb-4 lg:flex justify-center flex justify-items-center'>
//                 <input
//                   type='password'
//                   name='password'
//                   id='password'
//                   className='focus:border-blue-500 appearance-none rounded-xl w-8/12 py-2 px-3 text-gray-700 
//                         leading-tight focus:outline-none border-2  border-gray-200'
//                   autoComplete='current-password'
//                   required
//                   placeholder='Password : xxxxxxxxx'
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               <div className='flex mt-5 md:flex items-center justify-center justify-items-center'>
//                 <button
//                   type='submit'
//                   className='align-middle bg-blue-300 hover:bg-blue-400 text-center px-4 py-2 text-white
//                         text-sm font-medium rounded-xl inline-block shadow-lg w-7/12'
//                 >
//                   LOGIN
//                 </button>
//               </div>
//               <Link
//                 className='mt-5 text-center text-gray-600 hover:text-gray-700 no-underline block'
//                 to='/register'
//               >
//                 Create Your Account ⟶
//               </Link>
//               <div className='mt-5 text-center text-red-500 text-sm no-underline block'>{error ? <div>{error.message}</div> : <div> </div>}</div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;


// User login as patient
import React, { useState } from 'react';
import LogoPic from '../../../img/Medical_research.svg';
import Axios from 'utils/axios';
import { useHistory, Link } from 'react-router-dom';
import { useFetchUser } from '../../../context/userContext';
import { auth, provider } from '../../../firebase';
import { signInWithPopup } from 'firebase/auth';

const UserLogin = () => {
  // patient’s information
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();
  const { refetch } = useFetchUser();

  // Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    Axios
      .post('/api/v1/patient/login', {
        email: email,
        password: password,
      })
      .then((res) => res.data)
      .then((data) => {
        localStorage.setItem('token', data.token);
        refetch();
        history.push('/home');
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const res = await Axios.post("/api/v1/patient/firebase-login", {
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
      uid: user.uid,
    });

    localStorage.setItem("token", res.data.token);
    refetch(); // refresh user state
    history.push("/home");
  } catch (error) {
    console.error("Google login failed", error);
    setError({ message: "Google login failed" });
  }
};

  return (
    <div className='h-screen overflow-auto flex items-center justify-center font-fontPro '>
      <div className='p-2 w-4/5'>
        <div className='block lg:flex bg-white lg:shadow-lg rounded-lg'>
          <div className='w-full lg:w-1/2 flex lg:border-r border-gray-200 bg-plightBlue'>
            <div className='m-auto rounded-full'>
              <img className='w-full lg:flex p-16' src={LogoPic} alt='logo' />
            </div>
          </div>

          <div className='w-full lg:w-1/2 px-6 py-16'>
            <div className='mb-10 font-semibold tracking-widest text-2xl text-center'>
              LOGIN
            </div>
            <form onSubmit={handleSubmit}>
              <div className='mb-4 flex justify-center'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='focus:border-blue-500 appearance-none rounded-xl w-8/12 py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none border-2 border-gray-200'
                  autoComplete='email'
                  required
                  placeholder='Email : example123@gmail.com'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='mb-4 flex justify-center'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className='focus:border-blue-500 appearance-none rounded-xl w-8/12 py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none border-2 border-gray-200'
                  autoComplete='current-password'
                  required
                  placeholder='Password : xxxxxxxxx'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className='flex mt-5 items-center justify-center'>
                <button
                  type='submit'
                  className='align-middle bg-blue-300 hover:bg-blue-400 text-center px-4 py-2 text-white
                    text-sm font-medium rounded-xl inline-block shadow-lg w-7/12'
                >
                  LOGIN
                </button>
              </div>
            </form>

            {/* Google Login Button */}
            <div className='flex mt-5 items-center justify-center'>
              <button
                type='button'
                onClick={handleGoogleLogin}
                className='align-middle bg-red-400 hover:bg-red-500 text-center px-4 py-2 text-white
                  text-sm font-medium rounded-xl inline-block shadow-lg w-7/12'
              >
                Login with Google
              </button>
            </div>

            <Link
              className='mt-5 text-center text-gray-600 hover:text-gray-700 no-underline block'
              to='/register'
            >
              Create Your Account ⟶
            </Link>

            <div className='mt-5 text-center text-red-500 text-sm no-underline block'>
              {error ? <div>{error.message}</div> : <div> </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
