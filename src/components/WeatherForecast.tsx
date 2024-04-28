import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { kelvinToFahrenheit } from "../helperFunctions/helperFunctions";
import { fetchForecastData } from "../network/networkRequests";

const WeatherForecast: React.FC<{ lat: number; lon: number }> = ({
  lat,
  lon,
}) => {
  const [forecastData, setForecastData] = useState<any[]>([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await fetchForecastData(lat, lon);
        setForecastData(data);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecast();
  }, [lat, lon]);

  const getCardStyles = (time: number) => {
    let backgroundColor = "";

    // Determine time of day based on the hour
    if (time >= 5 && time < 20) {
      // Daytime
      backgroundColor = "rgba(176, 224, 230, 0.6)";
    } else {
      // Nighttime
      backgroundColor = "rgba(25, 25, 112, 0.5)";
    }

    return { background: backgroundColor };
  };

  const groupForecastsByDay = () => {
    const groupedForecasts: { [key: string]: any[] } = {};
    forecastData.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000);
      const dayKey = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      if (!groupedForecasts[dayKey]) {
        groupedForecasts[dayKey] = [];
      }
      groupedForecasts[dayKey].push(forecast);
    });
    return groupedForecasts;
  };

  return (
    <>
      <h2>{`5 Day Summary (Every 3 hours)`}</h2>

      <Grid container spacing={2}>
        {Object.entries(groupForecastsByDay()).map(
          ([day, forecasts], index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography sx={{ marginBottom: "10px" }} variant="h6">
                    {day}
                  </Typography>
                  <Grid container spacing={2}>
                    {forecasts.map((forecast: any, idx: number) => {
                      const forecastTime = new Date(
                        forecast.dt * 1000
                      ).getHours();
                      const cardStyles = getCardStyles(forecastTime);

                      return (
                        <Grid
                          item
                          xs={12}
                          sm={isMobile ? 12 : 6}
                          md={4}
                          lg={3}
                          key={idx}
                        >
                          <Card style={{ ...cardStyles, height: "100%" }}>
                            <CardContent>
                              <Typography variant="subtitle1">
                                {new Date(
                                  forecast.dt * 1000
                                ).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                })}
                              </Typography>
                              <Typography>
                                {kelvinToFahrenheit(forecast.main.temp).toFixed(
                                  0
                                )}{" "}
                                °F
                              </Typography>
                              <Typography>
                                {forecast.weather[0].description}
                              </Typography>
                              <img
                                src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                                alt="weather-icon"
                              />
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </>
  );
};

export default WeatherForecast;
