import { Observable } from "rxjs";
import { ICityForecastDayItem } from "../interfaces/forecast";
import { ICityWeatherDetails } from "../interfaces/weather";

export class CityWeatherDetailsModel implements ICityWeatherDetails {
  city$: Observable<string>;
  state$: Observable<string>;
  temp$: Observable<number>;
  hum$: Observable<number>;
  wind$: Observable<number>;
  forecasts$: Observable<Array<ICityForecastDayItem>>;

  constructor() {
    this.city$ = null;
    this.state$ = null;
    this.temp$ = null;
    this.hum$ = null;
    this.wind$ = null;
    this.forecasts$ = null;
  }
}
