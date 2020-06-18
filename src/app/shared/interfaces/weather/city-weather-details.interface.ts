import { Observable } from "rxjs";

import { ICityForecastDayItem } from "../forecast";

export interface ICityWeatherDetails {
  city$: Observable<string>;
  state$: Observable<string>;
  temp$: Observable<number>;
  hum$: Observable<number>;
  wind$: Observable<number>;
  forecasts$: Observable<Array<ICityForecastDayItem>>;
}
