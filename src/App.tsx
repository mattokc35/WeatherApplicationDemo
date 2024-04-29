import "./App.css";
import WeatherPanel from "./components/CurrentWeather";
import SearchBar from "./components/SearchBar";
import { WeatherData } from "./components/CurrentWeather";
import { useState } from "react";
import {
  isZipCode,
  kelvinToFahrenheit,
} from "./helperFunctions/helperFunctions";
import WeatherForecast from "./components/WeatherForecast";
import {
  fetchWeatherData,
  fetchGeolocationData,
} from "./network/networkRequests";

function App() {
  const [currentWeatherData, setCurrentWeatherData] =
    useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [locationNotFound, setLocationNotFound] = useState(false);

  async function handleSearch(location: string) {
    setLoading(true);
    setLocationNotFound(false);
    try {
      const geolocationData = await fetchGeolocationData(location);

      if (geolocationData.length === 0) {
        setLocationNotFound(true);
        return;
      }

      const { lat, lon, name, country, state } = isZipCode(location)
        ? geolocationData
        : geolocationData[0];
      setLat(lat);
      setLong(lon);
      setLocationName(`${name}, ${state ? state + ", " : ""}${country}`);

      const weatherResponse = await fetchWeatherData(lat, lon);

      if (!weatherResponse || !weatherResponse.ok) {
        throw new Error("Weather data not available");
      }

      const weatherData = await weatherResponse.json();

      const formattedWeatherData = {
        temperature: Math.round(kelvinToFahrenheit(weatherData.main.temp)),
        feelsLike: Math.round(kelvinToFahrenheit(weatherData.main.feels_like)),
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        iconUrl: `${import.meta.env.VITE_OPEN_WEATHER_ICON_URL}/${
          weatherData.weather[0].icon
        }.png`,
      };

      setCurrentWeatherData(formattedWeatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        {!currentWeatherData && (
          <>
            <h1>Weather Application Demo</h1>
            <p>{`Enter a location (City), (City, State, Country), or (City, Country) or a zip code to check the weather! Zip Code search currently only works for US zip codes.`}</p>
            <p>Example Searches: (Houston), (Houston, Texas, US) or (77479)</p>
          </>
        )}
        <div style={{ margin: "10px 0" }}></div>
        <SearchBar onSearch={handleSearch} />
        {!locationNotFound && (
          <>
            {locationName && <h2>Weather in {locationName}</h2>}
            {currentWeatherData && (
              <WeatherPanel weatherData={currentWeatherData} />
            )}
            {currentWeatherData && <WeatherForecast lat={lat} lon={long} />}
          </>
        )}
        {loading && <p>Loading...</p>}
        {locationNotFound && <p>Location not found. Please try again.</p>}{" "}
      </div>
    </>
  );
}

export default App;
