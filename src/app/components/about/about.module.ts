import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from "./about/about.component";
import {SharedModule} from "../../shared/shared.module";
import {DataComponent} from "./name/data.component";

// error si importo safe pipe que también esta en app.module.ts

@NgModule({
  declarations: [AboutComponent, DataComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AboutComponent]
})
export class AboutModule {
}
