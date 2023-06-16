// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzvpGL2zzAPU0uZIVARwvc6LIw60Xt6rM",
  authDomain: "my-blog-4bcfc.firebaseapp.com",
  projectId: "my-blog-4bcfc",
  storageBucket: "my-blog-4bcfc.appspot.com",
  messagingSenderId: "691822273455",
  appId: "1:691822273455:web:433866c7f2c1b44a78455a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}

const auth = getAuth(app);
export { auth };
