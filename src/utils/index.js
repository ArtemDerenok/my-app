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
  const hours = Math.floor((currentTime / (1000 * 60 * 60)) % 24) - Math.floor((oldTime / (1000 * 60 * 60)) % 24);
  return hours >= 1;
}

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default filterWeatherData;
