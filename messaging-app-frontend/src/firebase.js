import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6zly21wHjRUA1IFAe3oO6-qyQHh-oCsc",
  authDomain: "messaging-app-mern-f9270.firebaseapp.com",
  projectId: "messaging-app-mern-f9270",
  storageBucket: "messaging-app-mern-f9270.appspot.com",
  messagingSenderId: "982704557274",
  appId: "1:982704557274:web:ec68da67be077aebc769e3",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
