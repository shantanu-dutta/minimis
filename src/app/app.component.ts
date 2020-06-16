import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  showMenu: boolean;
  darkModeActive: boolean;

  ngOnInit() {
    this.initialize();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.darkModeActive = !this.darkModeActive;
  }

  private initialize() {
    this.showMenu = false;
    this.darkModeActive = false;
  }
}
