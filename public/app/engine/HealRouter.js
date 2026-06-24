export function healRouter(){

  const path = window.location.pathname;

  if(path.includes("//")){
    const fixed = path.replace(/\/+/g,"/");
    window.history.replaceState({}, "", fixed);
  }

}