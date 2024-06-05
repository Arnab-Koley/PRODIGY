import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { API_KEY } from "../src/secrets/api";

import { UilMapMarker } from "@iconscout/react-unicons";
import { UilTemperature } from "@iconscout/react-unicons";
import { UilRaindropsAlt } from "@iconscout/react-unicons";
import { UilWind } from "@iconscout/react-unicons";
import { UilCompressV } from "@iconscout/react-unicons";

const App = () => {
  const [locationGranted, setLocationGranted] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(
    "Your location is used for getting real-time weather data. Please allow location access."
  );
  const [city, setCity] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationGranted(true);
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage("Location permission is not given.");
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setErrorMessage("The request to get user location timed out.");
              break;
            default:
              setErrorMessage("An unknown error occurred.");
          }
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: API_KEY,
            q: `${lat},${lon}`,
          },
        }
      );
      setWeatherData(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch weather data.");
    }
  };

  const fetchWeatherByCity = async () => {
    try {
      const response = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: API_KEY,
            q: city,
          },
        }
      );
      setWeatherData(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch weather data.");
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeatherByCity();
    }
  };

  return (
    <div className=" w-full flex justify-center mt-10">
      <div className="bg-bg2 rounded-lg border-2 border-slate-500 p-5 w-[400px] flex flex-col items-center">
        <h1 className="text-3xl font-normal text-white  bg-slate-700 w-full p-2 rounded-lg">
          Weather App
        </h1>
        <div id="search-box" className="my-5">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
            className="bg-slate-300 p-2 outline-none"
          />
          <button onClick={handleSearch} className="bg-slate-500 p-2">
            Search
          </button>
        </div>
        {!locationGranted && (
          <div id="message-box">
            <p className="text-red-600">{errorMessage}</p>
          </div>
        )}
        {weatherData && (
          <div
            id="weather-info"
            className="bg-bg2 flex flex-col text-white text-lg"
          >
            <div className="flex items-center justify-center">
              <UilMapMarker size="30" color="white" />
              {weatherData.location.name}, {weatherData.location.region},{" "}
              {weatherData.location.country}
            </div>

            <div className="flex items-center text-white text-lg border-2 my-5">
              <img
                src={weatherData.current.condition.icon}
                alt="Weather icon"
              />
              {weatherData.current.condition.text}
            </div>

            <div className="flex items-center">
              <div className="mr-6 gap-2 flex items-center text-yellow-500">
                <UilTemperature size="30" color="white" />
                Temperature{" "}
              </div>
              {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F
            </div>
            <div className="flex items-center">
              <div className="mr-6 mt-2 gap-2 flex items-center text-yellow-500">
                <UilRaindropsAlt size="30" color="white" />
                Humidity{" "}
              </div>
              {weatherData.current.humidity}
            </div>
            <div className="flex items-center">
              <div className="mr-6 gap-2 mt-2 flex items-center text-yellow-500">
                <UilWind size="30" color="white" />
                Wind{" "}
              </div>
              {weatherData.current.wind_mph} mph, Direction :{" "}
              {weatherData.current.wind_dir}
            </div>
            <div className="flex items-center">
              <div className="mr-6 gap-2 mt-2 flex items-center text-yellow-500">
                <UilCompressV size="30" color="white" />
                Pressure{" "}
              </div>
              {weatherData.current.pressure_in} in
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
