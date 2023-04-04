import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainHeaderComponent} from './main-header.component';
import {SharedModule} from "../../../shared/shared.module";
import {AddButtonModule} from "../add-button/add-button.module";
import {MaterialModule} from "../../../shared/material.module";


@NgModule({
  declarations: [
    MainHeaderComponent
  ],
  exports: [
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    AddButtonModule,
    MaterialModule
  ]
})
export class MainHeaderModule {
}
