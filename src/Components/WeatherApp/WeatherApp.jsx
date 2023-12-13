import { React, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
import visibility_icon from '../Assets/visibility.png'
// import feelslike_icon from '../Assets/feelslike.png'
import atmospheric_pressure_icon from '../Assets/atmospheric_pressure.png'
import SavedWeatherDetails from './SavedWeatherDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeatherApp = () => {

    const [weatherIcon, setWeatherIcon] = useState(cloud_icon);
    const [savedCity, setSavedCity] = useState(null);
    const [savedCities, setSavedCities] = useState([]);
    const [showSavedDetails, setShowSavedDetails] = useState(false);
    
    let api_key = '41f68168744ce70d9b9922a1ab1e62dc'

    const search = async () =>{
        const element = document.getElementsByClassName('cityInput')
        if(element[0].value === '')
        {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`


        let response = await fetch(url);
        let data = await response.json();

        setSavedCity({
            name: data.name,
            temperature: Math.floor(data.main.temp),
            humidity: data.main.humidity,
            windSpeed: Math.floor(data.wind.speed),
            visibility: data.visibility,
            atmosphericPressure: data.main.pressure
        });

        const humidity = document.getElementsByClassName('humidity-percentage')
        const wind = document.getElementsByClassName('wind-rate')
        const temperature = document.getElementsByClassName('weather-temp')
        const location = document.getElementsByClassName('weather-location')
        const visibility = document.getElementsByClassName('visibility')
        // const feelslike = document.getElementsByClassName('feelslike')
        const atmospheric_pressure = document.getElementsByClassName('atmospheric_pressure')

        humidity[0].innerHTML = data.main.humidity +"%";
        wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
        location[0].innerHTML = data.name;
        visibility[0].innerHTML = data.visibility+"m";
        // feelslike[0].innerHTML = data.main.feels_like;
        atmospheric_pressure[0].innerHTML = data.main.pressure+" hPa";

        if(data.weather[0].icon === "01d" || data.weather[0].icon === '01n')
        {
            setWeatherIcon(clear_icon);
        }
        else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n')
        {
            setWeatherIcon(cloud_icon);
        }
        else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n')
        {
            setWeatherIcon(drizzle_icon);
        }
        else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04n')
        {
            setWeatherIcon(drizzle_icon);
        }
        else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n')
        {
            setWeatherIcon(rain_icon);
        }
        else if(data.weather[0].icon === '10d' || data.weather[0].icon === '10n')
        {
            setWeatherIcon(rain_icon);
        }
        else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n')
        {
            setWeatherIcon(snow_icon);
        }
        else
        {
            setWeatherIcon(clear_icon);
        }
    }

    const handleSave = () => {
        if (savedCity) {
            // You can save the details to your backend or use local storage
            // For now, just log the saved city details
            setSavedCities([...savedCities, savedCity]);
            toast.success('Weather data saved!', { autoClose: 3000 });
            // console.log("Weather data saved:", savedCity);
        }
    }

    // const handleFavorites = () => {
    //     setShowSavedDetails(!showSavedDetails);
    // }

    const handleRemoveCity = (cityToRemove) => {
        const updatedCities = savedCities.filter((city) => city.name !== cityToRemove.name);
        setSavedCities(updatedCities);
      };

    return (
        <Router>
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search City" />
                <div className="search-icon" onClick={()=>{search()}} >
                    <img src={search_icon} alt="" srcset="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={weatherIcon} alt="" />
            </div>
            {/* <div className="weather-temp">24°c</div> */}
            <div className="weather-temp"></div>
            {/* <div className="weather-location">Pune</div> */}
            <div className="weather-location"></div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        {/* <div className="humidity-percentage">64</div> */}
                        <div className="humidity-percentage"></div>
                        <div className="text">Humidity</div>
                        
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        {/* <div className="wind-rate">16 </div> */}
                        <div className="wind-rate"> </div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
            <div className="data-container">
            <div className="element">
                    <img src={visibility_icon} alt="" className="icon" />
                    <div className="data">
                        {/* <div className="wind-rate">16 </div> */}
                        <div className="visibility"> </div>
                        <div className="text">Visibility</div>
                    </div>
                </div>
                <div className="element">
                    <img src={atmospheric_pressure_icon} alt="" className="icon" />
                    <div className="data">
                        {/* <div className="wind-rate">16 </div> */}
                        <div className="atmospheric_pressure"> </div>
                        <div className="text1">Atmospheric Pressure</div>
                    </div>
                </div>
            </div>
            
            <button className="saveBtn" onClick={handleSave}>Save</button>
            <br />
            {/* <button className="favBtn" onClick={handleFavorites}>Favorites</button> */}
            <button className="viewText">

            <Link to="/saved-details" >View Saved Weather Details</Link>
            </button>
            
            <Routes>
                <Route
                path='/saved-details' 
                // render = {() => showSavedDetails && (<SavedWeatherDetails savedCities={savedCities} onRemoveCity={handleRemoveCity} />
                // )}
                element={<SavedWeatherDetails savedCities={savedCities} onRemoveCity={handleRemoveCity} />}
                />
            </Routes>
            <ToastContainer />
        </div>
        </Router>
    )
}

export default WeatherApp; 