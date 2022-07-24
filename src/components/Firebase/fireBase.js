import { initializeApp } from "firebase/app";
import {
 GoogleAuthProvider,
 getAuth,
 signInWithPopup,
 signInWithEmailAndPassword,
 createUserWithEmailAndPassword,
 signOut,
} from "firebase/auth";
import {
 getFirestore,
 query,
 getDocs,
 collection,
 where,
 addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_hIGn-D3z217eDLlhIhJnOzwUWj5o6Lg",
    authDomain: "selfie-63ee7.firebaseapp.com",
    projectId: "selfie-63ee7",
    storageBucket: "selfie-63ee7.appspot.com",
    messagingSenderId: "1066562324655",
    appId: "1:1066562324655:web:c8f8df4cf3bb5db48aec5a",
    measurementId: "G-EFVWJ959Z2"
  };

const app =initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };
  export {
    app,
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    signInWithEmailAndPassword,
    logout
  };