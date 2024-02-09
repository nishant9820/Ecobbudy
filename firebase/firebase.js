import firebase from "firebase/compat";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAn2Bu-u4Zz0XQOE3OIO80HYBckios8HKA",
  authDomain: "ecobuddy-ae54d.firebaseapp.com",
  projectId: "ecobuddy-ae54d",
  storageBucket: "ecobuddy-ae54d.appspot.com",
  messagingSenderId: "531002249408",
  appId: "1:531002249408:web:425097fb323b9a19ba1d25",
  measurementId: "G-5CFFWM0YZ9",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
// export const auth = firebase.auth();
export const auth = getAuth(app);
export const db = getDatabase(app);
export const store = getFirestore(app);
export const storage = getStorage(app);
