import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdHbfJ97vxKiREixzLlAAcqH6ueWT8Guc",
  authDomain: "ton-mining-9bf7e.firebaseapp.com",
  projectId: "ton-mining-9bf7e",
  storageBucket: "ton-mining-9bf7e.firebasestorage.app",
  messagingSenderId: "1065281767545",
  appId: "1:1065281767545:web:8cf86da6b74b09626a6ca8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
