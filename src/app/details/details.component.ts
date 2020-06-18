import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { map, switchMap, shareReplay } from "rxjs/operators";

import { WeatherService } from "../services/weather.service";
import { CityWeatherDetailsModel } from "../shared/models";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  today: string;
  weatherDetail: CityWeatherDetailsModel;

  private destroy$: Subject<any>;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {
    this.weatherDetail = new CityWeatherDetailsModel();
    this.destroy$ = new Subject();
  }

  ngOnInit(): void {
    this.initializeToday();
    this.initializeWeatherDetails();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeToday() {
    const todayNumberInWeek = new Date().getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.today = days[todayNumberInWeek];
  }

  private initializeWeatherDetails() {
    this.weatherDetail.city$ = this.route.paramMap.pipe(
      map((route: any) => route.params.city),
      shareReplay(1)
    );

    this.weatherDetail.state$ = this.weatherDetail.city$.pipe(
      switchMap((city: string) => this.weatherService.getWeatherState(city))
    );

    this.weatherDetail.temp$ = this.weatherDetail.city$.pipe(
      switchMap((city: string) => this.weatherService.getCurrentTemp(city))
    );

    this.weatherDetail.hum$ = this.weatherDetail.city$.pipe(
      switchMap((city: string) => this.weatherService.getCurrentHum(city))
    );

    this.weatherDetail.wind$ = this.weatherDetail.city$.pipe(
      switchMap((city: string) => this.weatherService.getCurrentWind(city))
    );

    this.weatherDetail.forecasts$ = this.weatherDetail.city$.pipe(
      switchMap((city: string) => this.weatherService.getCityForecast(city))
    );
  }
}
