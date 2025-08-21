import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const url = "https://api.openweathermap.org/data/2.5/weather"
    const API_KEY = "d2dec53dec87ee9920dcc434bca8d19a"
    const kelvinDif = 273.15

    const fetchWeatherData = async() => {
        try {
            const response = await fetch(`${url}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await response.json()
            setWeatherData(data)
        } catch (error) {
            console.error("Ha habido un error: ", error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeatherData()
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    return (
        <div className='container'>
            <h1>Aplicacion de clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Ingresa una ciudad'
                    value={city}
                    onChange={handleCityChange}
                />
                <button type='submit'>Buscar</button>
            </form>

            {weatherData && (

                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>La temperatura actual es de { Math.floor(weatherData.main.temp - kelvinDif)}°C</p>
                    <p>La condicion meteorológica actual: {weatherData.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                </div>

            )}

        </div>
    )
}
