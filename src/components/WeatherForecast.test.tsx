import { render } from "@testing-library/react";
import WeatherForecast from "./WeatherForecast";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

jest.mock("../network/networkRequests", () => ({
  fetchForecastData: jest.fn().mockResolvedValue([
    {
      dt: 1629387600, //Sample timestamp for 20 Aug 2021, 12:00:00 PM UTC
      main: {
        temp: 293, //Sample temperature in Kelvin
        feels_like: 294, //Sample feels like temperature in Kelvin
        humidity: 80, //Sample humidity percentage
      },
      weather: [{ description: "Clear", icon: "01d" }], // Sample weather description and icon
      wind: { speed: 5 }, //Sample wind speed in m/s
    },
    {
      dt: 1629409200, //Sample timestamp for 20 Aug 2021, 6:00:00 PM UTC
      main: {
        temp: 295,
        feels_like: 296,
        humidity: 75,
      },
      weather: [{ description: "Clouds", icon: "02d" }],
      wind: { speed: 6 },
    },
    {
      dt: 1629430800, //Sample timestamp for 21 Aug 2021, 12:00:00 AM UTC
      main: {
        temp: 292,
        feels_like: 293,
        humidity: 85,
      },
      weather: [{ description: "Rain", icon: "10d" }],
      wind: { speed: 4 },
    },
  ]),
}));
describe("WeatherForecast component", () => {
  test("renders without crashing", async () => {
    //Render the component
    const { getByText } = render(<WeatherForecast lat={0} lon={0} />);

    //Assert that the component renders without crashing
    const headerElement = getByText("5 Day Summary (Every 3 hours)");
    expect(headerElement).toBeInTheDocument();
  });
});
