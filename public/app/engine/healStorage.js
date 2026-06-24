export function healStorage(){

  try {
    localStorage.setItem("__test","1");
    localStorage.removeItem("__test");
    return true;
  } catch(e){
    return false;
  }

}