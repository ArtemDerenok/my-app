import { openDB } from 'idb';

const dbPromise = openDB('weather-app-store', 1, {
  upgrade(db) {
    db.createObjectStore('tasks');
  }
})

const clearTasks = async () => (await dbPromise).clear('tasks');

export const setTask = async (key, val) => (await dbPromise).put('tasks', val, key);

export default clearTasks;
