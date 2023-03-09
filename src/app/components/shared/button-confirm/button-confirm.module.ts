import {NgModule} from '@angular/core';
import {ButtonConfirmComponent} from "./button-confirm.component";
import {MaterialModule} from "../../../shared/material.module";

@NgModule({
  declarations: [ButtonConfirmComponent],
  imports: [MaterialModule],
  exports: [ButtonConfirmComponent]
})

export class ButtonConfirmModule {

}
