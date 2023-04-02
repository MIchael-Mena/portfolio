import {NgModule} from "@angular/core";
import {MenuEditionComponent} from "./menu-edition.component";
import {MaterialModule} from "../../../shared/material.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [MenuEditionComponent],
  imports: [MaterialModule, FontAwesomeModule],
  exports: [MenuEditionComponent]
})

export class MenuEditionModule {

}
