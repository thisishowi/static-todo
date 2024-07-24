let doingAngle = 0; 
setInterval(()=> {
  doingAngle++;
  if (doingAngle > 360) doingAngle = 1;
  document.documentElement.style.setProperty("--doing-angle", `${doingAngle}deg`);
}, 30);