
export const fetchWeather = (name) => {
  return fetch(
    `/cities/${name}`, {
      credientials: 'include'
    })
    .then(res => res.json());
  }
  
export const parseData = (data) => {
  return {
    cityName: data.name,
    clouds: data.clouds.all || 0,
    temp: convertKToF(data.main.temp),
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    tempMin: convertKToF(data.main.temp_min),
    tempMax: convertKToF(data.main.temp_max),
    rain: data.rain ? data.rain['1h']||data.rain['3h'] : 0,
    country: data.sys.country,
    weatherDesc: data.weather[0].description,
    weatherMain: data.weather[0].main,
  }
};

const convertKToF = (k) => {
  if(typeof k !== 'number') return 0;
  return Math.round((k - 273.15) * (9/5) + 32);
}

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
    case 'Snow':
    src = window.snow;
    break;
    case 'Wind':
    src = window.wind;
    break;
    case 'Unavailable':
    src = window.notFound;
    break;
    case 'Pending':
    src = window.loading;
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