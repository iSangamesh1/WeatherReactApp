import React from "react";
import './SavedWeatherDetails.css';

const savedWeatherDetails = ({ savedCities, onRemoveCity }) => {
    return (
        <div className="saved-weather-details-container" >
            <h2>Saved Weather Details</h2>
            <ul>
                {savedCities.map((city, index) => (
                     <div key={index} className="saved-city">
                     <div className="saved-city-header">
                       <span className="saved-city-name">{city.name}</span>
                       <span className="saved-city-remove" onClick={() => onRemoveCity(city)}>
                            Remove
                        </span>
                     </div>
                     <div className="saved-city-details">
                       <p>Temperature: {city.temperature} °c</p>
                       <p>Humidity: {city.humidity} %</p>
                       <p>Wind Speed: {city.windSpeed} km/h</p>
                       <p>Atmospheric Pressure: {city.visibility} m</p>
                       <p>Wind Speed: {city.atmosphericPressure} hPa</p>
                       {/* Add more details as needed */}
                     </div>
                   </div>
                ))}
            </ul>
        </div>
    )
}

export default savedWeatherDetails;