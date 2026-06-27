/*
PROJECT: MoyoApp
FIREBASE v9 CLEAN CORE (STABLE)
*/

import { initializeApp }
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import { getStorage }
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

/* FIREBASE CONFIG */
const firebaseConfig = {
apiKey: "AIzaSyAxXw9qu6XSfARlC1ZlQAtT6wKsDGpPP06A",
authDomain: "moyo-app-530ef.firebaseapp.com",
projectId: "moyo-app-530ef",
storageBucket: "moyo-app-530ef.appspot.com",
messagingSenderId: "202818396077",
appId: "1:202818396077:web:7767ef6a13cbef78c58b24"
};

/* INIT APP */
const app = initializeApp(firebaseConfig);

/* SERVICES */
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* EXPORTS */
export { app, auth, db, storage };

console.log("🔥 Firebase v9 initialized OK");