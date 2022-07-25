import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Grid, Tooltip } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WindPowerIcon from "@mui/icons-material/WindPower";
import AirIcon from "@mui/icons-material/Air";
import { ICityResult } from "../../Models/city-restAPI-model";
import Cloudy from "../../Assets/Icons/cloudy.png";
import Sunny from "../../Assets/Icons/sunny.png";
import Foggy from "../../Assets/Icons/foggy.png";

interface IProps {
  data: ICityResult;
}

const getIcon = (value: string): string => {
  switch (value) {
    case "Clouds":
      return Cloudy;
    case "Clear":
      return Sunny;
    case "Fog":
    case "Mist":
      return Foggy;
    default:
      return Cloudy;
  }
};

const City: React.FC<IProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <img
            src={getIcon(data.weather.summary.title)}
            style={{ width: 45 }}
            alt="icon"
          />
        }
        title={data.name}
        subheader={data.country}
      />
      <CardContent>
        <Grid container>
          <Grid item md={3}>
            <Typography variant="h6" color="text.secondary">
              {data.weather.summary.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data.weather.summary.description}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Tooltip title="actual temperature">
              <Typography variant="subtitle1" color="text.secondary">
                <DeviceThermostatIcon
                  style={{ verticalAlign: "middle", width: 20, marginRight: 5 }}
                />
                {data.weather.temperature.actual} °C
              </Typography>
            </Tooltip>
            <Tooltip title="how it feels">
              <Typography variant="subtitle1" color="text.secondary">
                <InsertEmoticonIcon
                  style={{ verticalAlign: "middle", width: 20, marginRight: 5 }}
                />
                {data.weather.temperature.feelsLike} °C
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item md={3}>
            <Tooltip title="maximum temperature degree">
              <Typography variant="subtitle1" color="text.secondary">
                <ArrowDropUpIcon style={{ verticalAlign: "bottom" }} />
                {data.weather.temperature.max} °C
              </Typography>
            </Tooltip>
            <Tooltip title="minimum temperature degree">
              <Typography variant="subtitle1" color="text.secondary">
                <ArrowDropDownIcon style={{ verticalAlign: "top" }} />
                {data.weather.temperature.min} °C
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item md={3}>
            <Tooltip title="wind degree">
              <Typography variant="subtitle1" color="text.secondary">
                <AirIcon
                  style={{ verticalAlign: "middle", width: 20, marginRight: 5 }}
                />
                {data.weather.wind.deg} °
              </Typography>
            </Tooltip>
            <Tooltip title="wind speed">
              <Typography variant="subtitle1" color="text.secondary">
                <WindPowerIcon
                  style={{ verticalAlign: "middle", width: 20, marginRight: 5 }}
                />
                {data.weather.wind.speed} Km/h
              </Typography>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default City;
