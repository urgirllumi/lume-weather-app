import React, { useState, useEffect } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
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

// Automatically locate the user's location on mount
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
    locationerror(e) {
      console.error("Geolocation error: ", e.message);
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

function MapClickHandler({ setWeatherData }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            lat,
            lon: lng,
            appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
            units: "metric",
          },
        })
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) =>
          console.error("Error fetching weather data: ", error)
        );
    },
  });
  return null;
}

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  return (
    <div className="App">
      <MapContainer
        center={fallbackLocation}
        zoom={15}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setUserLocation={setUserLocation} />
        <MapClickHandler setWeatherData={setWeatherData} />
      </MapContainer>
      {weatherData && (
        <Sidebar weatherData={weatherData} onClose={() => setWeatherData(null)} />
      )}
    </div>
  );
}

export default App;
