export const fetchWeather = (name) => {
  return $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=c0a9b33f3889ab4f0926ba26ed8c9638`,
  });
};