import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCz9IcAB5VcpB-ojTqYlho1jxrQpOUj190",
  authDomain: "selfie3-0-69b2b.firebaseapp.com",
  projectId: "selfie3-0-69b2b",
  storageBucket: "selfie3-0-69b2b.appspot.com",
  messagingSenderId: "588921316394",
  appId: "1:588921316394:web:66b4306b7d9dec445c8f53",
  measurementId: "G-P7L89FR9MV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
