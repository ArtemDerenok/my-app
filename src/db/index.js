import { openDB } from 'idb';

const dbPromise = openDB('weather-app-store', 1, {
  upgrade(db) {
    db.createObjectStore('tasks');
    db.createObjectStore('openWeatherApi');
    db.createObjectStore('currentCity');
  }
})

const clearTasks = async () => (await dbPromise).clear('tasks');

export const setTask = async (key, val) => (await dbPromise).put('tasks', val, key);

export const getAllTasksFromDb = async () => (await dbPromise).getAll('tasks');

export const setCurrentCityInDb = async (key, val) => (await dbPromise).put('currentCity', val, key);

export const setWatherDataOpenWeatherApiInDb = async (key, val) => (await dbPromise).put('openWeatherApi', val, key.toLowerCase());

export const getWeatherDataOpenWeatherApiFromDb = async (key) => (await dbPromise).get('openWeatherApi', key.toLowerCase());

export const getAllWeatherDataOpenWeatherApiFromDb = async () => (await dbPromise).getAll('openWeatherApi');

export const getCurrentCityFromDb = async (key) => (await dbPromise).get('currentCity', key);

export default clearTasks;
