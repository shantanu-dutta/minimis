export interface IWeatherAPI {
  base: string;
  endpoints: IWeatherEndpoints;
  token: string;
  getEndpoint: (part: APIPartType) => string;
}

export type APIPartType = "weather" | "forecast";

export interface IWeatherEndpoints {
  weather: string;
  forecast: string;
}
