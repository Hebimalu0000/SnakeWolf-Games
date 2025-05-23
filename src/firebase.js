// src/firebase.js (または src/firebaseConfig.js)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication を使うため
import { getFirestore } from "firebase/firestore"; // Cloud Firestore を使うため（利用履歴など）
// import { getDatabase } from "firebase/database"; // Realtime Database を使う場合

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAW6DjuHnsxNGEpZZJEKfWjOZEF0G5-4M",
  authDomain: "snakewolf-games.firebaseapp.com",
  projectId: "snakewolf-games",
  storageBucket: "snakewolf-games.firebasestorage.app",
  messagingSenderId: "358677794188",
  appId: "1:358677794188:web:e8f083f0d832ef4ad35aa9",
  measurementId: "G-60NDZWSQHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 各サービスのエクスポート
export const auth = getAuth(app); // Firebase Authentication
export const db = getFirestore(app); // Cloud Firestore (利用履歴などに推奨)
// export const rtdb = getDatabase(app); // Realtime Database を使う場合

// 必要であれば、Firebaseアプリインスタンス自体もエクスポート
export default app;