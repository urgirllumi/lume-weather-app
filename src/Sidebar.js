import React from "react";
import "./Sidebar.css";

function Sidebar({ weatherData, onClose }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Weather Information</h2>
        <button className="close-btn" onClick={onClose}>x</button>
      </div>
      <p>
        <strong>Location:</strong>{" "}
        {weatherData.name ? weatherData.name : "Unknown"}
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
    </div>
  );
}

export default Sidebar;
