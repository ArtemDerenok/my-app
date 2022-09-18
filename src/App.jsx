import Clock from "./Components/Clock/Clock";
import ToDoList from "./Components/ToDoList/ToDoList";
import WeatherTable from "./Components/WeatherTable/WeatherTable";
import styles from './App.module.scss';
import CityBar from "./Components/CityBar/CityBar";
import NewTaskForm from "./Components/NewTaskForm/NewTaskForm";
import Spinner from './Components/Spinner/Spinner';
import useWeather from './hooks/useWeather';

function App() {
  const {setBackground, background, handleRequest, cityName, countryName, errorMessage, setCityName, weatherData} = useWeather();
   
  return (
    <main className={styles.container} style={{backgroundImage: `url(${setBackground(background)})`}}>
      <div className={styles.boxOne}>
        <div className={styles.clockContainer}>
          <Clock />
          <NewTaskForm />
          <ToDoList />
        </div>
        <div className={styles.cityContainer}>
          <CityBar handleRequest={handleRequest} cityName={cityName} countryName={countryName} errorMessage={errorMessage} setCityName={setCityName} />
        </div>
      </div>
      <div>
        <WeatherTable handleRequest={handleRequest} cityName={cityName} />
      </div>
      {weatherData.loading ? <Spinner /> : null}
    </main>
  );
}

export default App;
