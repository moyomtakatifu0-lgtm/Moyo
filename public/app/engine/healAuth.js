import { auth } from "../core/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

export function healAuth(){

  return new Promise((resolve)=>{

    const unsub = onAuthStateChanged(auth, (user)=>{

      unsub();

      if(user){
        resolve(user);
      } else {
        resolve(null);
      }

    });

  });

}