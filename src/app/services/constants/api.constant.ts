import { IWeatherAPI, APIPartType, IWeatherEndpoints } from "../interfaces";

const API_ENDPOINT = "https://api.openweathermap.org/data/2.5";
const API_TOKEN = "41862a7af923864643e1643fe60b0e6c";

class WeatherAPIClass implements IWeatherAPI {
  base: string;
  token: string;
  endpoints = {
    weather: "/weather",
    forecast: "/forecast",
  };

  constructor(baseEndpoint: string, token: string) {
    this.base = baseEndpoint;
    this.token = token;
  }

  getEndpoint(part: APIPartType): string {
    return this.base + this.endpoints[part];
  }
}

export const WeatherAPI: IWeatherAPI = new WeatherAPIClass(
  API_ENDPOINT,
  API_TOKEN
);
