// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBXYNVNxRXjdsOmG4ZokRnJwXNo6osIO7k',
  authDomain: 'netflix-gpt-c3ba4.firebaseapp.com',
  projectId: 'netflix-gpt-c3ba4',
  storageBucket: 'netflix-gpt-c3ba4.firebasestorage.app',
  messagingSenderId: '356103816926',
  appId: '1:356103816926:web:049b3f5da72ec7e0d1e44f',
  measurementId: 'G-8ZHR5S1C1C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
