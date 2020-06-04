/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = {
  key: '9eba34f80c51addca93627714a5e6e94',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const dateConstructor = (data) => {
  const mounths = [
    'Janeiro',
    'Favereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julio',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const days = [
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
    'Domingo',
  ];

  const day = days[data.getDay()];
  const date = data.getDate();
  const month = mounths[data.getMonth()];
  const year = data.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

function App() {
  const [browseLocation, setBrowseLocation] = useState(false);
  const [location, setLocation] = useState('');
  const [weatherInfo, setWeatherInfo] = useState({});

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
    setWeatherInfo(response.data);
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetch(
        `${api.base}forecast?q=${location}&units=metric&APPID=${api.key}&lang=pt`,
      )
        .then((response) => response.json())
        .then((result) => {
          setWeatherInfo(result);
          setLocation('');
          console.log(result);
        });
    }
  };

  /* Pegar localização inicial */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      geWeatherInitialLocation(
        position.coords.latitude,
        position.coords.longitude,
      );
      setBrowseLocation(true);
    });
  }, []);

  if (browseLocation === false) {
    return <>Please allow browse location!</>;
  }
  return (
    <div
      className={
        // eslint-disable-next-line no-nested-ternary
        typeof weatherInfo.main !== 'undefined'
          ? weatherInfo.main.temp > 16
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        {/* Pesquisa cidade */}
        <div className="box-search">
          <input
            type="text"
            className="search-bar"
            placeholder="How’s the weather in..."
            onChange={(event) => setLocation(event.target.value)}
            value={location}
            onKeyPress={searchLocation}
          />
        </div>

        {typeof weatherInfo.main !== 'undefined' ? (
          <>
            {/* Localizaçao */}
            <div className="location-box">
              <div className="location">
                {weatherInfo.name}, {weatherInfo.sys.country}
              </div>
              <div className="dateWeather">{dateConstructor(new Date())}</div>
            </div>

            {/* Informação do tempo */}
            <div className="WeatherDesc-box">
              <div className="temperature">
                {Math.round(weatherInfo.main.temp)}
                °C
              </div>
              <div className="weather">
                {weatherInfo.weather.description}
                <ul>
                  <li>Vento: {weatherInfo.wind.speed} km/h</li>
                  <li>Pressão: {weatherInfo.main.temp} hpa</li>
                  <li>Umidade: {weatherInfo.main.humidity}%</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;
