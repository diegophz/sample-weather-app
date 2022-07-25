import { Axios } from "axios";
import { IMapRecord } from "../../Models/map-model";

const axios = new Axios({
  baseURL: "https://api.openweathermap.org/data/2.5",
});
export const getMapStatus = (bbox: string): Promise<IMapRecord[]> =>
  axios
    .get<string>("/box/city", {
      params: {
        bbox,
        appid: "7a3cf0dcb74e19b1f78f308969ca5311",
        units: "metric",
      },
    })
    .then((response) => {
      const data = JSON.parse(response.data);
      return data.list.map(
        (record: {
          name: string;
          coord: { Lon: number; Lat: number };
          weather: { main: string }[];
        }) => {
          return {
            name: record.name,
            coords: { lon: record.coord.Lon, lat: record.coord.Lat },
            status: record.weather[0].main,
          };
        }
      );
    });
