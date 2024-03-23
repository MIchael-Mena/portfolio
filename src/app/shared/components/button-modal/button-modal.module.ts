import { NgModule } from '@angular/core';
import { ButtonModalComponent } from './button-modal.component';
import { ButtonConfirmModule } from '../button-confirm/button-confirm.module';
import { MaterialModule } from '../../../core/material.module';

@NgModule({
  declarations: [ButtonModalComponent],
  imports: [ButtonConfirmModule, MaterialModule],
  exports: [ButtonModalComponent],
})
export class ButtonModalModule {}
