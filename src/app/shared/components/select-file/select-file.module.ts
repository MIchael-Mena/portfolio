import { NgModule } from '@angular/core';
import { SelectFileComponent } from './select-file.component';
import { MaterialModule } from '../../../core/material.module';

@NgModule({
  declarations: [SelectFileComponent],
  imports: [MaterialModule],
  exports: [SelectFileComponent],
})
export class SelectFileModule {}
