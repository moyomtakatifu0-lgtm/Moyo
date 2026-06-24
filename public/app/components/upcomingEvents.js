import { calendarEvents } from "../data/calendarEvents.js";

export function getUpcomingEvents(limit = 5){

  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  const sorted = calendarEvents
    .filter(e => {
      // basic future filter (same year simple model)
      return e.month > currentMonth ||
        (e.month === currentMonth && e.day >= today.getDate());
    })
    .sort((a,b)=> a.month - b.month || a.day - b.day)
    .slice(0, limit);

  return sorted;
}