import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      // Generate a temporary password for Firebase
      const tempPassword = Math.random().toString(36).slice(-12);
      await createUserWithEmailAndPassword(auth, email, tempPassword)
      const user = auth.currentUser;
      await fetch('https://sportzstore.onrender.com/api/users',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body : JSON.stringify({
          uid:user.uid,
          email:user.email,
        })
      })
      alert('✅ Sign up successful! Redirecting to login...');
      navigate('/login');
    } catch(error) {
      alert('❌ Sign up failed: ' + error.message);
      console.error(error.message);
    }
  };

  // const handleGoogleSignUp = () => {
  //   signInWithPopup(auth, googleProvider)
  //     .then(result => {
  //       console.log("Google user:", result.user);
  //     })
  //     .catch(error => {
  //       console.error(error.message);
  //     });
  // };
  
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Sign Up</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleRegister} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer placeholder-transparent hover:cursor-pointer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <button type="submit" className="bg-cyan-500 text-white rounded-md px-6 py-2 hover:bg-cyan-600 transition-colors">
                    Sign Up
                  </button>
                </div>
              </form>
              <div>
                <h1>Or Go back to <Link to='/login'> <u className="hover: to-blue-300 focus:bg-amber-200">login</u></Link></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUp;
