import React, { useEffect, useState } from "react";
import Leaflet from "leaflet";
import Cloudy from "../../Assets/Icons/cloudy.png";
import SunCloudy from "../../Assets/Icons/sun-cloudy.png";
import Foggy from "../../Assets/Icons/foggy.png";
import Sunny from "../../Assets/Icons/sunny.png";
import Rain from "../../Assets/Icons/rain.png";
import { getMapStatus } from "./API";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

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

const rainIcon = Leaflet.icon({
  iconUrl: Rain,
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
      return rainIcon;
    case "Drizzle":
      return rainIcon;
    default:
      return sunCloudyIcon;
  }
};
const Map: React.FC = () => {
  function MyComponent() {
    const map = useMap();
    const [center, setCenter] = useState<{ lat: number; lon: number }>({
      lat: 49.325121,
      lon: 3.224152,
    });
    const calculateBoundBox = () => {
      const lonLeft = Math.floor(map.getCenter().lng - 3);
      const lonRight = Math.floor(map.getCenter().lng + 2);
      const latTop = Math.floor(map.getCenter().lat + 2);
      const latBottom = Math.floor(map.getCenter().lat - 3);
      const zoomLevel = map.getZoom();
      return `${lonLeft},${latBottom},${lonRight},${latTop},${zoomLevel}`;
    };
    map.on("dragend", () => {
      const center = map.getCenter();
      setCenter({ lat: center.lat, lon: center.lng });
    });
    useEffect(() => {
      if (!center || !map) return;
      (async () => {
        const results = await getMapStatus(calculateBoundBox());
        results.forEach((record) => {
          Leaflet.marker([record.coords.lat, record.coords.lon], {
            icon: getIcon(record.status),
          }).addTo(map);
        });
      })();
    }, [center, map]);
    return null;
  }
  return (
    <MapContainer
      center={[40, 40]}
      style={{ height: "80vh" }}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=218c7cbbfca34de8a3453cd8af7d4868"
      />
      <MyComponent />
    </MapContainer>
  );
};
export default Map;
