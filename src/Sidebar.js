import React from "react";
import "./Sidebar.css";

function Sidebar({ weatherData, onClose, isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <div className="sidebar-header">
        <h2>Weather Information</h2>
        <button className="close-btn" onClick={onClose}>
          x
        </button>
      </div>
      <p>
        <strong>Location:</strong> {weatherData.name || "Unknown"}
      </p>
      <p>
        <strong>Temperature:</strong> {weatherData.main.temp} °C
      </p>
      <p>
        <strong>Weather:</strong> {weatherData.weather[0].description}
      </p>
      <p>
        <strong>Humidity:</strong> {weatherData.main.humidity}%
      </p>
      <p>
        <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
      </p>

      <div className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
        />
      </div>
    </div>
  );
}

export default Sidebar;
