
export const fetchWeather = (name) => {
  return fetch(
    `/cities/${name}`, {
      credientials: 'include'
    })
    .then(res => res.json());
  }
  
export const parseData = (data) => {
  return {
    clouds: data.clouds.all || 0,
    temp: data.main.temp,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    rain: data.rain ? data.rain['1h']||data.rain['3h'] : 0,
    country: data.sys.country,
    weatherDesc: data.weather[0].description,
    weatherMain: data.weather[0].main,
  }
};

export const getImgSrc = (weatherMain) => {
  let src = '';
  switch (weatherMain) {
    case 'Rain':
      src = window.rain;
      break;
    case 'Clouds':
      src = window.clouds;
      break;
    case 'Mist':
    case 'Haze':
      src = window.haze;
      break;
    case 'Hail':
      src = window.hail;
      break;
    default:
      src = window.sunny;
  }

  return src;
}

// export const fetchFrontend = (name) => {
//   return fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=c0a9b33f3889ab4f0926ba26ed8c9638`,
//     {
//       credientials: 'include'
//     })
//       .then(res => res.json());
// };