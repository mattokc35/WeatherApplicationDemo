import { render } from "@testing-library/react";
import WeatherPanel, { WeatherData } from "./CurrentWeather";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

const mockWeatherData: WeatherData = {
  temperature: 75,
  description: "Sunny",
  feelsLike: 72,
  humidity: 60,
  windSpeed: 5,
  iconUrl: "https://example.com/icon.png",
};

describe("WeatherPanel component", () => {
  test("renders with weather data", () => {
    const { getByText, getByAltText } = render(
      <WeatherPanel weatherData={mockWeatherData} />
    );

    expect(getByText("Current Weather")).toBeInTheDocument();
    expect(getByText("Temperature: 75°F")).toBeInTheDocument();
    expect(getByText("Feels Like: 72°F")).toBeInTheDocument();
    expect(getByText("Description: Sunny")).toBeInTheDocument();
    expect(getByText("Humidity: 60%")).toBeInTheDocument();
    expect(getByText("Wind Speed: 5 m/s")).toBeInTheDocument();
    expect(getByAltText("Weather Icon")).toHaveAttribute(
      "src",
      "https://example.com/icon.png"
    );
  });

  test("renders without weather data", () => {
    const { getByText, queryByAltText } = render(
      <WeatherPanel weatherData={null} />
    );

    expect(getByText("Current Weather")).toBeInTheDocument();
    expect(getByText("No weather data available.")).toBeInTheDocument();
    expect(queryByAltText("Weather Icon")).toBeNull();
  });
});
