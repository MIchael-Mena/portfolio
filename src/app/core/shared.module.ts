import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

import { SafePipe } from './pipes/safe.pipe';
import { GlobalSpinnerComponent } from '../shared/components/global-spinner/global-spinner.component';

@NgModule({
  declarations: [SafePipe, GlobalSpinnerComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    SafePipe,
    GlobalSpinnerComponent,
  ],
})
export class SharedModule {}
