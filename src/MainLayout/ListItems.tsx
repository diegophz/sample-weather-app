import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SearchIcon from "@mui/icons-material/Search";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WaterIcon from "@mui/icons-material/Water";
import MapIcon from "@mui/icons-material/Map";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/search">
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItemButton>
    <ListItemButton component={Link} to="/city">
      <ListItemIcon>
        <LocationCityIcon />
      </ListItemIcon>
      <ListItemText primary="City" />
    </ListItemButton>
    <ListItemButton component={Link} to="/temperature-history">
      <ListItemIcon>
        <ThunderstormIcon />
      </ListItemIcon>
      <ListItemText primary="Temperature History" />
    </ListItemButton>
    <ListItemButton component={Link} to="/humidity-history">
      <ListItemIcon>
        <WaterIcon />
      </ListItemIcon>
      <ListItemText primary="Humidity History" />
    </ListItemButton>
    <ListItemButton component={Link} to="/map">
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="Weather Map" />
    </ListItemButton>
  </React.Fragment>
);
