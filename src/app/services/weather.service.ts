import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";

import { TemperatureUnitType } from "../shared/types";
import { WeatherAPI, WeatherQueryParams } from "./constants";
import { CityForecastDayItemModel } from "../shared/models";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCityWeatherByName(
    city: string,
    metric?: TemperatureUnitType
  ): Observable<any> {
    const params = this.getParams(city, metric);
    return this.http.get(WeatherAPI.getEndpoint("weather"), { params });
  }

  getCitiesWeatherByName(
    cities: Array<string>,
    metric?: TemperatureUnitType
  ): Observable<Array<any>> {
    return forkJoin(
      cities.map((city) => this.getCityWeatherByName(city, metric))
    );
  }

  getWeatherState(city: string): Observable<string> {
    return this.getCityWeatherByName(city).pipe(
      map((data) => data["weather"][0].main as string)
    );
  }

  getCurrentTemp(city: string): Observable<number> {
    return this.getCityWeatherByName(city).pipe(
      map((weather) => weather.main.temp as number)
    );
  }

  getCurrentHum(city: string): Observable<number> {
    return this.getForecast(city).pipe(
      map((weather) => weather.main.humidity as number)
    );
  }

  getCurrentWind(city: string): Observable<number> {
    return this.getForecast(city).pipe(
      map((weather) => weather.wind.speed as number)
    );
  }

  getCityForecast(city: string): Observable<Array<any>> {
    return this.getForecast(city).pipe(
      map((weather) => weather["list"] as Array<any>),
      map((forecastList: Array<any>) => {
        const todayNumberInWeek = new Date().getDay();
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const forecasts = new Array<CityForecastDayItemModel>(5);
        forecastList.forEach((listItem) => {
          const date = new Date(listItem.dt_txt).getDay();
          const forecastItem = new CityForecastDayItemModel(
            days[date],
            listItem.weather[0].main,
            listItem.main.temp
          );
          if (
            date === todayNumberInWeek + 1 ||
            (todayNumberInWeek === 6 && date === 0 && !forecasts[0])
          ) {
            forecasts[0] = forecastItem;
          } else if (
            !!forecasts[0] &&
            !forecasts[1] &&
            days[date] !== forecasts[0].name
          ) {
            forecasts[1] = forecastItem;
          } else if (
            !!forecasts[1] &&
            !forecasts[2] &&
            days[date] !== forecasts[1].name
          ) {
            forecasts[2] = forecastItem;
          } else if (
            !!forecasts[2] &&
            !forecasts[3] &&
            days[date] !== forecasts[2].name
          ) {
            forecasts[3] = forecastItem;
          } else if (
            !!forecasts[3] &&
            !forecasts[4] &&
            days[date] !== forecasts[3].name
          ) {
            forecasts[4] = forecastItem;
          }
        });
        return forecasts;
      })
    );
  }

  getForecast(city: string, metric?: TemperatureUnitType): Observable<any> {
    const params = this.getParams(city, metric);
    return this.http.get(WeatherAPI.getEndpoint("forecast"), { params });
  }

  private getParams(city: string, metric?: TemperatureUnitType): HttpParams {
    const params = new HttpParams();
    params.set(WeatherQueryParams.city, city);
    if (metric) {
      params.set(WeatherQueryParams.metric, metric);
    }
    params.set(WeatherQueryParams.token, WeatherAPI.token);
    return params;
  }
}
