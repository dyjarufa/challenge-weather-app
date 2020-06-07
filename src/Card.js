import React from 'react';
import moment from 'moment';

export default function Card({day}){

    let newDate = new Date();
    const weekday = day.dt * 1000
    newDate.setTime(weekday)

    const imgURL = "owf owf-"+ day.weather[0].id +" owf-5x red"

    return (
      <>

        {/* Informações do tempo */}
        <div className="WeatherDesc-box">
          <div lassName="location">
            <div className="dateWeather">{moment(newDate).locale('pt-br').format('dddd')}</div>
            <i className={imgURL}></i>
            <h2 className="temperature">{Math.round(day.main.temp)} °C</h2>
            <div  className="weather">{day.weather[0].description}
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

      </>
    )
}

