import { db } from "../core/firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function healProfile(user){

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if(!snap.exists()){

    await setDoc(ref, {
      uid:user.uid,
      role:"user",
      createdAt:Date.now(),
      profileCompleted:false
    });

    return { healed:true, msg:"Profile created" };
  }

  return { healed:false, msg:"Profile OK" };
}