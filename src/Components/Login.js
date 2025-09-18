import React from 'react';
import { addUser } from '../utils/userSlice';
import Header from './Header';
import { useState, useRef } from 'react';
import { checkValidData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
// Add this import at the top of your file
// Adjust the path as needed
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Default_Icon } from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  // validation
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    console.log(name.current.value);
    console.log(email.current.value);
    if (message) return;

    //     user.updateProfile({
    //   highscore: score
    // }).then(() => {
    //   console.log('Update successful');
    //   user.currentUser.reload().then(() => {
    //     console.log('Profile reloaded');
    //   });
    // }).catch((error) => {
    //   console.log('Update unsuccessful' + error);
    // });

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL:
              'https://images.pexels.com/photos/5473311/pexels-photo-5473311.jpeg',
          })
            .then(() => {
              console.log('Update successful');
              user.currentUser.reload();
            })
            .then(() => {
              console.log(user);
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          console.log('after update');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    }
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute ">
        <img
          className=" size-max"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg"
          alt="logo"
        />
      </div>
      <form
        className="p-12 bg-black absolute w-[35%] my-20 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg"
        onSubmit={(e) => e.preventDefault()}>
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 "
            ref={name}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 "
          ref={email}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 "
          ref={password}
        />
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className="text-red-500">{errorMessage}</p>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? 'New to Netflix? Sign Up Now'
            : 'Already have an account? Sign In'}
        </p>
      </form>
    </div>
  );
};

export default Login;
