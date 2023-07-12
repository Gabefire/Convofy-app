import { createContext } from "react";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyA0r-HiBkg6Z1hNQGdxD6_uRF95MItJcCI",
  authDomain: "reddit-clone-8619f.firebaseapp.com",
  projectId: "reddit-clone-8619f",
  storageBucket: "reddit-clone-8619f.appspot.com",
  messagingSenderId: "31782279198",
  appId: "1:31782279198:web:6d6ef73d587be81a2e760f",
  measurementId: "G-J7Q0VBQS4L",
};

export const FirebaseApp = createContext(initializeApp(firebaseConfig));
