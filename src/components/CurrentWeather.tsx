import React from "react";
import { Typography, Grid, Card, CardContent } from "@mui/material";

export interface WeatherData {
  temperature: number;
  description: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  iconUrl: string;
}

interface WeatherPanelProps {
  weatherData: WeatherData | null;
}

const WeatherPanel: React.FC<WeatherPanelProps> = ({ weatherData }) => {
  return (
    <Card
      sx={{
        width: "100%",
        boxShadow: 4,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Current Weather
        </Typography>
        {weatherData ? (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                Temperature: {weatherData.temperature}°F
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                Feels Like: {weatherData.feelsLike}°F
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                Description: {weatherData.description}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                Humidity: {weatherData.humidity}%
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                Wind Speed: {weatherData.windSpeed} m/s
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2" color="textPrimary">
            No weather data available.
          </Typography>
        )}
        {weatherData && (
          <img
            src={weatherData.iconUrl}
            alt="Weather Icon"
            style={{ maxWidth: "100%" }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherPanel;
