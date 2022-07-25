import { Axios } from "axios";
import { ICityRecord } from "../Models/city-restAPI-model";

const axios = new Axios({
  baseURL: "https://autocomplete.travelpayouts.com",
});
export const searchCities = (term: string): Promise<ICityRecord[]> =>
  axios
    .get<string>("/places2", {
      params: { locale: "en", types: ["city"], term },
    })
    .then((response) => {
      const data = JSON.parse(response.data);
      const results: ICityRecord[] = [];
      data.forEach((item: { name: string; country_name: string }) => {
        if (results.find((r) => r.name === item.name)) {
          return;
        }
        results.push({
          name: item.name,
          country_name: item.country_name,
        });
      });
      return results;
    });
