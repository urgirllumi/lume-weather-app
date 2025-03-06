import React, { useState, useEffect } from "react";
import "./App.css";
import "./Variables.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
 } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import Sidebar from "./Sidebar";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Fallback coordinates for Open Cities Lab in Johannesburg
const fallbackLocation = { lat: -26.145667103696482, lng: 28.04375691349353 };

function LocationMarker({ setUserLocation }) {
  const [position, setPosition] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      setIsFallback(false);
      map.flyTo(e.latlng, map.getZoom());
      setUserLocation(e.latlng);
    },
    locationerror() {
      console.error("Geolocation error: Location access denied.");
      setPosition(fallbackLocation);
      setIsFallback(true);
      map.setView(fallbackLocation, 15);
      setUserLocation(fallbackLocation);
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>{isFallback ? "Open Cities Lab is here!" : "You are here!"}</Popup>
    </Marker>
  );
}

function ChangeMapView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13);
    }
  }, [center, map]);
  return null;
}

function MapClickHandler({ setWeatherData }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat,
              lon: lng,
              units: "metric",
              appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
            },
          }
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
  });

  return null;
}

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/geo/1.0/direct",
        {
          params: {
            q: searchQuery,
            limit: 1,
            appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
          },
        }
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setSearchLocation({ lat, lng: lon });

        setMarkers((prevMarkers) => [
          ...prevMarkers,
          { lat, lng: lon, name: searchQuery },
        ]);
      } else {
        alert("City not found. Try again.");
      }
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
    }
  };

  useEffect(() => {
    if (weatherData) {
      setIsSidebarOpen(true);
    }
  }, [weatherData]);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button button" onClick={handleSearch}>
          Search
        </button>

        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <MapContainer
        center={fallbackLocation}
        zoom={13}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler setWeatherData={setWeatherData} />

        <ChangeMapView center={searchLocation || userLocation} />
        <LocationMarker setUserLocation={setUserLocation} />

        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup className="city-name">{marker.name} is here!</Popup>
          </Marker>
        ))}
      </MapContainer>

      {weatherData && (
        <Sidebar
          weatherData={weatherData}
          onClose={() => setIsSidebarOpen(false)}
          isOpen={isSidebarOpen}
        />
      )}
    </div>
  );
}

export default App;
