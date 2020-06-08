import React from 'react';
import moment from 'moment';

export default function Card({day}){

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

    let newDate = new Date();
    const weekday = day.dt * 1000
    newDate.setTime(weekday)

    const imgURL = "owf owf-"+ day.weather[0].id +" owf-5x red"

    return (
      <>

        {/* Informações do tempo */}
        <div className="WeatherDesc-box">
          <div lassName="location">
            <h2 className="temperature">{Math.round(day.main.temp)} °C</h2>
            <div  className="weather">{day.weather[0].description}
            <div className="dateWeather">{dateConstructor(newDate)}</div>

                <ul className="weatherLis">
                    <li>Vento: {day.wind.speed} km/h</li>
                    <li>Pressão: {day.main.temp} hpa</li>
                    <li>Umidade: {day.main.humidity}%</li>
                </ul>
            </div>
            <div>
            </div>
          </div>
        </div>

            <i className={imgURL}></i>
      </>
    )
}

