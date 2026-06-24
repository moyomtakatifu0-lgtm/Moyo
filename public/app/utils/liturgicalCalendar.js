/* =========================================================
PROJECT : MOYO APP
MODULE  : LITURGICAL CALENDAR
NEXT LEVEL VERSION
========================================================= */

export function getLiturgicalSeason(month){

  if(month === 12 || month === 1){
    return { name: "Majilio", color: "#1565c0" };
  }

  if(month >= 2 && month <= 3){
    return { name: "Kwaresima", color: "#6a1b9a" };
  }

  if(month >= 4 && month <= 5){
    return { name: "Pasaka", color: "#f9a825" };
  }

  return { name: "Msimu wa Kawaida", color: "#2e7d32" };
}