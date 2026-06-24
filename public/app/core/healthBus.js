// HEALTH BUS - SYSTEM EVENT CONTROLLER

const listeners = [];

export function onHealthEvent(fn){
  listeners.push(fn);
}

export function emitHealthEvent(data){
  listeners.forEach(fn => fn(data));
}