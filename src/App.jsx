import Clock from './Components/Clock/Clock';
import ToDoList from './Components/ToDoList/ToDoList';
import WeatherTable from './Components/WeatherTable/WeatherTable';
import CityBar from './Components/CityBar/CityBar';
import NewTaskForm from './Components/NewTaskForm/NewTaskForm';
import Spinner from './Components/Spinner/Spinner';
import useWeather from './hooks/useWeather';
import styles from './App.module.scss';

function App() {
  const {
    setBackground,
    background,
    handleRequest,
    cityName,
    countryName,
    errorMessage,
    setCityName,
    weatherData,
  } = useWeather();

  return (
    <main
      className={styles.container}
      style={{ backgroundImage: `url(${setBackground(background)})` }}
    >
      <section className={styles.boxOne}>
        <div className={styles.clockContainer}>
          <Clock />
          <NewTaskForm />
          <ToDoList />
        </div>
        <div className={styles.cityContainer}>
          <CityBar
            handleRequest={handleRequest}
            cityName={cityName}
            countryName={countryName}
            errorMessage={errorMessage}
            setCityName={setCityName}
          />
        </div>
      </section>
      <section>
        <WeatherTable handleRequest={handleRequest} cityName={cityName} />
      </section>
      {weatherData.loading ? <Spinner /> : null}
    </main>
  );
}

export default App;
