export function healTheme(){

  if(!document.body.getAttribute("data-theme")){
    document.body.setAttribute("data-theme","default");
  }

}