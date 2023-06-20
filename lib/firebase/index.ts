import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
//   measurementId: process.env.measurementId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDDIgpo8IS5z-jSwtR6dgyZt0r17f_f8hI",
  authDomain: "chat-database-curriculum.firebaseapp.com",
  projectId: "chat-database-curriculum",
  storageBucket: "chat-database-curriculum.appspot.com",
  messagingSenderId: "755418524068",
  appId: "1:755418524068:web:511feedbfe7b23e936f931",
  measurementId: "G-DGN4F77SRF",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
