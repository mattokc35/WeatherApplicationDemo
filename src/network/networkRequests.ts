import { isZipCode } from "../helperFunctions/helperFunctions";

export async function fetchWeatherData(
  lat: number,
  lon: number
): Promise<Response> {
  const weatherApiEndpoint = `${
    import.meta.env.VITE_OPEN_WEATHER_WEATHER_URL
  }?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`;
  return fetch(weatherApiEndpoint);
}

export async function fetchGeolocationData(location: string): Promise<any> {
  try {
    let geoApiEndpoint = "";
    if (isZipCode(location)) {
      geoApiEndpoint = `${
        import.meta.env.VITE_OPEN_WEATHER_GEOCODING_URL
      }/zip?zip=${location},US&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`;
    } else {
      geoApiEndpoint = `${
        import.meta.env.VITE_OPEN_WEATHER_GEOCODING_URL
      }/direct?q=${location}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`;
    }
    const geocodeResponse = await fetch(geoApiEndpoint);
    return geocodeResponse.json();
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
    throw error;
  }
}

export async function fetchForecastData(
  lat: number,
  lon: number
): Promise<any[]> {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_OPEN_WEATHER_FORECAST_URL
      }?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    );
    const data = await response.json();
    return data.list;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
}
