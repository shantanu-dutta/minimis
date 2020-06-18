import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";

import { DialogModule } from "./dialog/dialog.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { WeatherCardComponent } from "./weather-card/weather-card.component";
import { AddCardComponent } from "./add-card/add-card.component";
import { DetailsComponent } from "./details/details.component";
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherCardComponent,
    AddCardComponent,
    DetailsComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, DialogModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
