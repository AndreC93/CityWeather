const cssSun = () => {
  let delta = 2.5;
  let degrees = 0;
  
  const changeBackground = () => {
    if (delta + degrees >= 60) {
      delta = -2.5;
    } else if (delta + degrees <= -60) {
      delta = 2.5;
    }
    degrees += delta;
    console.log(degrees)
    document.documentElement.style.setProperty("--gradDeg", `${degrees}deg`);
    document.documentElement.style.setProperty("--shadow", `${-degrees/10}px`);
  }
  
  return setInterval(() => changeBackground(), 200);
};

export default cssSun;