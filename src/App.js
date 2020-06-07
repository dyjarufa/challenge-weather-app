/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayCard from './Card'

const api = {
  key: '9eba34f80c51addca93627714a5e6e94',
  base: 'https://api.openweathermap.org/data/2.5/',
};


function App() {
  const [browseLocation, setBrowseLocation] = useState(false);
  const [location, setLocation] = useState('');
  const [weatherInfo, setWeatherInfo] = useState([]);

  const [initialWeatherInfo, setInitialWeatherInfo] = useState({});
  const [cityName, setCityName] = useState([]);



  const geWeatherInitialLocationForecast = async (latitude, longitude) => {

    const response = await axios.get(
      'http://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: api.key,
          lang: 'pt',
          units: 'metric',
        },
      },
    );
    // const dailyData = response.data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
    const dailyData = dailyDataFilter(response.data.list)
    setWeatherInfo(dailyData);
  };

  const geWeatherInitialLocation = async (latitude, longitude) => {

    const response = await axios.get(
      'http://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: api.key,
          lang: 'pt',
          units: 'metric',
        },
      },
    );
    // const dailyData = response.data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
    console.log(response.data)
    setInitialWeatherInfo(response.data)
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetch(
        `${api.base}forecast?q=${location}&units=metric&APPID=${api.key}&lang=pt`,
      )
        .then((response) => response.json())
        .then((result) => {
          const dailyData = dailyDataFilter(result.list)
          setWeatherInfo(dailyData);
          setLocation('');
          setInitialWeatherInfo('')
        });
    }

    if (event.key === 'Enter') {
      fetch(
        `${api.base}weather?q=${location}&units=metric&APPID=${api.key}&lang=pt`,
      )
        .then((response) => response.json())
        .then((result) => {
          setCityName(result);
          setLocation('');
          setInitialWeatherInfo('')
        });
    }
  };

  //Limitar quantidade de dias
  const dailyDataFilter = (weatherList) => {
     return weatherList.filter(reading => reading.dt_txt.includes("18:00:00"))
  }

  /* Pegar localização inicial */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      geWeatherInitialLocation(
        position.coords.latitude,
        position.coords.longitude,
      );

      geWeatherInitialLocationForecast(
        position.coords.latitude,
        position.coords.longitude,
      );
      setBrowseLocation(true);
    });
  }, []);


  //Controi card dos dias
  const formatDayCards = () => {
    debugger
    console.log(weatherInfo)
    return weatherInfo.map((day, index) => <DayCard day={day} key={index} />)
  }


  if (browseLocation === false) {
    return <h1>Please allow browse location!></h1>
  }


  return (
    <main >
      <div>

      { typeof cityName.main || initialWeatherInfo.main !== 'undefined' ? (
    <>
      <div className="box-search">
        <input
          type="text"
          className="search-bar"
          placeholder="Digite o nome da cidade"
          onChange={(event) => setLocation(event.target.value)}
          value={location}
          onKeyPress={searchLocation}
        />
      </div>

      {/* Localizaçao */}
      <div className="location-box">
          <div className="location">
            {initialWeatherInfo.name}
            {cityName.name}
          </div>
        </div>

        {formatDayCards()}
        </>
      ) : ('')}
      </div>
    </main>
  );
}

export default App;
