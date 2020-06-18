import { Component, AfterViewInit, OnDestroy, Type } from "@angular/core";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  childComponentType: Type<any>;

  ngAfterViewInit(): void {}

  ngOnDestroy() {}

  onOverlayClicked(event: MouseEvent) {
    // close the dialog
  }

  onDialogClicked(event: MouseEvent) {
    event.stopPropagation();
  }
}
