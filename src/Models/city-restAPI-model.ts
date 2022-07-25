export interface ICityResult {
  id: string;
  name: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    summary: {
      title: string;
      description: string;
      icon: string;
    };
    temperature: {
      actual: number;
      feelsLike: number;
      min: number;
      max: number;
    };
    clouds: {
      all: number;
      visibility: number;
      humidity: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
  };
}
export interface IGetCityByNameResult {
  getCityByName: ICityResult;
}

export interface IHistoryRecord {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
  rain: { [key: string]: number };
}

export interface ICityRecord {
  name: string;
  country_name: string;
}
