export const fetchWeather = (name) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=c0a9b33f3889ab4f0926ba26ed8c9638`,
    {
      credientials: 'include'
    })
      .then(res => res.json());
};

export const parseData = (data) => {
  return {
    clouds: data.clouds.all || 0,
    temp: data.main.temp,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    rain: data.rain ? data.rain['1h'] : 0,
    country: data.sys.country,
    weatherDesc: data.weather[0].description,
    weatherMain: data.weather[0].main,
  }
};