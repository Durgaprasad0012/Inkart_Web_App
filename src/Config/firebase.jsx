  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import { getAuth, GoogleAuthProvider } from "firebase/auth";
  import { getStorage } from "firebase/storage";

  const firebaseConfig = {
    apiKey: "AIzaSyDEhHHVAmgqNxeLziXiNzRRqNil6HVXvNQ",
    authDomain: "inkartmarket.firebaseapp.com",
    projectId: "inkartmarket",
    storageBucket: "inkartmarket.appspot.com",
    messagingSenderId: "1067214580209",
    appId: "1:1067214580209:web:6cedfe85e6fb0feaa5fc50",
    measurementId: "G-RRLQYSEFP4",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const provider = new GoogleAuthProvider();

  const db = getFirestore(app);


  export { db, auth, provider, storage };
