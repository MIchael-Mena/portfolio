import {NgModule} from "@angular/core";
import {SelectFileComponent} from "./select-file.component";
import {MaterialModule} from "../../../shared/material.module";

@NgModule({
  declarations: [SelectFileComponent],
  imports: [MaterialModule],
  exports: [SelectFileComponent]
})

export class SelectFileModule {
}
