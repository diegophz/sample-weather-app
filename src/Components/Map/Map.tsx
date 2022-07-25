import React, { useEffect, useState } from "react";
import Leaflet from "leaflet";
import Cloudy from "../../Assets/Icons/cloudy.png";
import SunCloudy from "../../Assets/Icons/sun-cloudy.png";
import Foggy from "../../Assets/Icons/foggy.png";
import Sunny from "../../Assets/Icons/sunny.png";
import { getMapStatus } from "./API";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const cloudyIcon = Leaflet.icon({
  iconUrl: Cloudy,
  iconSize: [20, 20],
  iconAnchor: [0, 0],
});
const sunCloudyIcon = Leaflet.icon({
  iconUrl: SunCloudy,
  iconSize: [20, 20],
  iconAnchor: [0, 0],
});
const foggyIcon = Leaflet.icon({
  iconUrl: Foggy,
  iconSize: [20, 20],
  iconAnchor: [0, 0],
});
const sunnyIcon = Leaflet.icon({
  iconUrl: Sunny,
  iconSize: [20, 20],
  iconAnchor: [0, 0],
});

const getIcon = (value: string): Leaflet.Icon => {
  switch (value) {
    case "Clouds":
      return cloudyIcon;
    case "Clear":
      return sunnyIcon;
    case "Fog":
    case "Mist":
      return foggyIcon;
    case "Rain":
      return foggyIcon;
    case "Drizzle":
      return foggyIcon;
    default:
      return sunCloudyIcon;
  }
};
const Map: React.FC = () => {
  function MyComponent() {
    const map = useMap();
    console.log("map center:", map.getCenter());

    // const [map, setMap] = useState<Leaflet.Map>();
    // // default center of map
    // const map = useMap();
    const [center, setCenter] = useState<{ lat: number; lon: number }>({
      lat: 49.325121,
      lon: 3.224152,
    });
    // /**
    //  * calculates bbox based on current center
    //  * @returns string
    //  */
    const calculateBbox = () => {
      const lonLeft = Math.floor(map.getCenter().lng - 3);
      const lonRight = Math.floor(map.getCenter().lng + 2);
      const latTop = Math.floor(map.getCenter().lat + 2);
      const latBottom = Math.floor(map.getCenter().lat - 3);
      // const lonLeft = map.getBounds().getSouthWest().lng;
      // const lonRight = map.getBounds().getNorthEast().lng;
      // const latTop = map.getBounds().getSouthWest().lat;
      // const latBottom = map.getBounds().getNorthEast().lat;
      console.log(map.getBounds(), "sdsdsd");
      console.log(lonLeft, lonRight, latTop, latBottom, "sdsdsd");
      const zoomLevel = map.getZoom();
      console.log(zoomLevel, "zoom");
      return `${lonLeft},${latBottom},${lonRight},${latTop},${zoomLevel}`;
    };
    // initializes map for the first time
    // useEffect(() => {
    //   if (!!map) return;
    //   setMap(
    //     Leaflet.map("map", {
    //       minZoom: 7,
    //       maxZoom: 7,
    //       zoomControl: false,
    //     }).setView([48.5919574, 2.8749632], 7)
    //   );
    // }, []);
    // useEffect(() => {
    //   if (!map) return;
    //   // initializes tile layer for the first time
    //   Leaflet.tileLayer(
    //     "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    //     {
    //       maxZoom: 18,
    //       id: "mapbox/light-v10",
    //       tileSize: 512,
    //       zoomOffset: -1,
    //     }
    //   ).addTo(map);
    // Leaflet.marker([center.lat, center.lon], { icon: cloudyIcon }).addTo(map);
    //   // listens to dragend and updates the center
    map.on("dragend", () => {
      const center = map.getCenter();
      setCenter({ lat: center.lat, lon: center.lng });
    });
    // }, [map]);
    // listens to center change and updates markers on center change
    // also listens to map change first time (because map is not initialized in first load)
    useEffect(() => {
      if (!center || !map) return;
      // load data
      (async () => {
        const results = await getMapStatus(calculateBbox());
        results.forEach((record) => {
          console.log(record.status, "sdssdsdsdsdsd12");
          Leaflet.marker([record.coords.lat, record.coords.lon], {
            icon: getIcon(record.status),
          }).addTo(map);
        });
      })();
    }, [center, map]);
    const position = [51.505, -0.09];
    return null;
  }
  return (
    // <Box sx={{ flexGrow: 1 }}>
    // <Container>
    // <Grid container justifyContent="center" alignItems="center" spacing={1}>
    <MapContainer
      center={[40, 40]}
      style={{ height: "80vh" }}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="     https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=218c7cbbfca34de8a3453cd8af7d4868 "
      />
      <MyComponent />
      {/* <Marker >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker> */}
    </MapContainer>
    // </Grid>
    // </Container>
    // </Box>
  );
};
export default Map;
