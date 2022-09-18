const filterWeatherData = (arr) => {
  const copyArr = arr;
  const result = copyArr.filter((elem, index) => {
    if (index === 0) return elem;
    if (elem.dt_txt.indexOf('09:00:00') >= 0) return elem;
    return false;
  })
  return result;
};

export const formatData = (arr) => {
  const result = {};

  arr.forEach((elem) => {
    result[elem.city.city.toLowerCase()] = elem;
  })

  return result;
}

export const compareTime = (currentTime, oldTime) => {
  const ms = currentTime - oldTime
  const hours = Math.floor((ms / (1000 * 60 * 60)))
  return hours >= 1;
}

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const regionNames = new Intl.DisplayNames(
  ['en'], {
    type: 'region'
  }
);

export const prepareData = (data) => {
  const result = {
    city: {
      city: data.city.name,
      country: regionNames.of(data.city.country),
      latitude: data.city.coord.lat,
      longitude: data.city.coord.lon,
    },
    list: filterWeatherData(data.list),
    timestamp: Date.now(),
  }
  return result;
}

export const filterWeatherDataOpenMeteo = (arr1, arr2, arr3) => {
  const result = [];
  for (let i = 0; i < 5; i += 1) {
    const obj = {
      day: arr1[i],
      weathercode: arr2[i],
      temp: arr3[i]
    }
    result.push(obj);
  }

  return result;
}

export const prepareDataForOpenMeteoApi = (weatherData, cityData) => {
  const result = {
    city: {
      city: cityData.city,
      country: cityData.country,
      latitude: cityData.latitude,
      longitude: cityData.longitude,
    },
    list: filterWeatherDataOpenMeteo(weatherData.daily.time, weatherData.daily.weathercode, weatherData.daily.temperature_2m_max),
    timestamp: Date.now(),
  }
  return result;
}

export const getWeatherDescription = (num) => {
  let str = '';

  if (num === 0) {
    str = 'Clear';
  } else if (num > 0 && num < 45) {
    str = 'MainlyClear';
  } else if (num >= 45 && num < 51) {
    str = 'Mist';
  } else if (num >= 51 && num < 56) {
    str = 'CloudSunRain';
  } else if (num >= 56 && num < 71) {
    str = 'Rain';
  } else if (num >= 71 && num < 80) {
    str = 'Snow';
  } else if (num >= 80 && num < 85) {
    str = 'Rain';
  } else if (num >= 85 && num < 95) {
    str = 'Snow'
  } else if (num >= 95) {
    str = 'Thunderstorm';
  }

  return str;
}

export default filterWeatherData;
