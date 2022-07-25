import { Axios } from "axios";
import { IHistoryRecord } from "../Models/city-restAPI-model";

const axios = new Axios({
  baseURL: "https://api.openweathermap.org/data/2.5/onecall",
});
export const getCityDetail = (
  lat: number,
  lon: number,
  dt: number
): Promise<IHistoryRecord[]> =>
  axios
    .get<string>("/timemachine", {
      params: {
        lon,
        lat,
        dt,
        appid: "7a3cf0dcb74e19b1f78f308969ca5311",
        units: "metric",
      },
    })
    .then((response) => {
      const data = JSON.parse(response.data);
      return data.hourly;
    });
