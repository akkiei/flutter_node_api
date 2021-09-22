// Import the functions you need from the SDKs you need
const firebaseapp = require("firebase/app");
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgl0EGyKRxPLK7ou4FNQISN0IgnfTJMsM",
  authDomain: "aspirants-library.firebaseapp.com",
  projectId: "aspirants-library",
  storageBucket: "aspirants-library.appspot.com",
  messagingSenderId: "907995431061",
  appId: "1:907995431061:web:d04f579b72591f726edb9c",
  measurementId: "G-0TSY1JTG7H",
};

const initializeApp = firebaseapp.initializeApp
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

module.exports = app;
