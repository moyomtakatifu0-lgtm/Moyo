/*
PROJECT: MoyoApp
FIREBASE v9 CLEAN CORE
*/

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import { getAuth } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { getFirestore } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import { getStorage } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxXw9qu6XSfARlC1ZlQAtT6wKsDGpPP06A",
  authDomain: "moyo-app-530ef.firebaseapp.com",
  projectId: "moyo-app-530ef",
  storageBucket: "moyo-app-530ef.appspot.com",
  messagingSenderId: "202818396077",
  appId: "1:202818396077:web:7767ef6a13cbef78c58b24"
};

/* FIXED: export app */
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log("🔥 Firebase v9 initialized OK");