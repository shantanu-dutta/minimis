import { ICityForecastDayItem } from "./city-forecast-day-item.interface";

export interface ICityWeekForecast {
  forecasts: Array<ICityForecastDayItem>;
}
