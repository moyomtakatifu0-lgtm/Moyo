import { healAuth } from "./healAuth.js";
import { healProfile } from "./healProfile.js";
import { healStorage } from "./healStorage.js";
import { healTheme } from "./healTheme.js";
import { healRouter } from "./healRouter.js";
import { emitHealthEvent } from "../core/healthBus.js";

export async function runAutoHeal(){

  emitHealthEvent({ type:"start", msg:"AUTO-HEAL STARTED" });

  const user = await healAuth();

  if(user){
    await healProfile(user);
  }

  healStorage();
  healTheme();
  healRouter();

  emitHealthEvent({ type:"done", msg:"AUTO-HEAL COMPLETE" });

  return true;
}