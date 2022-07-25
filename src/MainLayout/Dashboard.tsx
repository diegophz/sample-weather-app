import { useEffect, useState } from "react";
import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "./ListItems";
import { Route, Routes } from "react-router-dom";
import City from "../Components/City/City";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { getCityDetail } from "../API-Services/GetCity";
import {
  ICityResult,
  IGetCityByNameResult,
  IHistoryRecord,
} from "../Models/city-restAPI-model";
import SearchBox from "../Components/Search/Search";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { GET_CITY_BY_NAME } from "../Models/graphQL-query-model";
import Map from "../Components/Map/Map";
import Temperature from "../Components/HistoricalWeather/Temperature";
import Humidity from "../Components/HistoricalWeather/Humidity";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const weatherClient = new ApolloClient({
  uri: "https://graphql-weather-api.herokuapp.com/",
  cache: new InMemoryCache(),
});

interface IProps {
  defaultCity: string | null;
}

const DashboardContent: React.FC<IProps> = ({ defaultCity }) => {
  const [cityName, setCityName] = useState<string>(
    defaultCity !== null ? defaultCity : "Manchester"
  );
  const [result, setResult] = useState<ICityResult>();

  const { loading } = useQuery(GET_CITY_BY_NAME, {
    client: weatherClient,
    variables: {
      name: cityName,
    },
    onCompleted: (data: IGetCityByNameResult) => {
      setResult(data.getCityByName);
    },
  });

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [loadingDetails, setLoadingDetails] = useState(false);
  const [historyRecord, setHistoryRecords] = useState<IHistoryRecord[]>([]);

  useEffect(() => {
    if (!result) return;
    (async () => {
      setLoadingDetails(true);
      const time = Math.ceil(Date.now() / 1000) - 24 * 3600;
      const results = await getCityDetail(
        result.coord.lat,
        result.coord.lon,
        time
      );
      setHistoryRecords(results);
      setLoadingDetails(false);
    })();
  }, [result?.id]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Button component={RouterLink} to="/" color="inherit">
              Sample Weather App
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              {!!result && (
                <Route path="city" element={<City data={result} />} />
              )}

              {!!historyRecord && (
                <Route
                  path="temperature-history"
                  element={<Temperature records={historyRecord} />}
                />
              )}

              {!!historyRecord && (
                <Route
                  path="humidity-history"
                  element={<Humidity records={historyRecord} />}
                />
              )}

              <Route path="map" element={<Map />} />

              <Route
                path=""
                element={<p>Welcome to the sample weather app.</p>}
              />

              {!!result && !!historyRecord && (
                <Route
                  path="search"
                  element={
                    <SearchBox
                      data={result}
                      records={historyRecord}
                      defaultValue={defaultCity}
                      onSelected={(value) => {
                        setCityName(value);
                        setHistoryRecords([]);
                      }}
                    />
                  }
                />
              )}
            </Routes>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardContent;
