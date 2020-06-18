import {
  ICityForecastDayItem,
  ICityWeekForecast,
} from "../interfaces/forecast";

export class CityWeekForecastModel implements ICityWeekForecast {
  forecasts: Array<ICityForecastDayItem>;

  constructor();
  constructor(forecasts: Array<ICityForecastDayItem> = []) {
    this.forecasts = forecasts || [];
  }
}

export class CityForecastDayItemModel implements ICityForecastDayItem {
  name: string;
  state: string;
  temperature: number;

  constructor(name = "", state = "", temp = 0) {
    this.name = name;
    this.state = state;
    this.temperature = temp;
  }
}
