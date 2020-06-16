import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-weather-card",
  templateUrl: "./weather-card.component.html",
  styleUrls: ["./weather-card.component.css"],
})
export class WeatherCardComponent implements OnInit {
  darkMode = true;
  condition = "Clouds";
  currentTemp = 15;
  minTemp = 6;
  maxTemp = 21;

  constructor() {}

  ngOnInit(): void {}

  openDetails() {}
}
