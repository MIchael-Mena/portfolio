import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddButtonComponent} from './add-button.component';
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [
    AddButtonComponent
  ],
  exports: [
    AddButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AddButtonModule {
}
