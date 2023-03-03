import {Component, Input} from '@angular/core';
import {ButtonSettings} from "./ButtonSettings";

@Component({
  selector: 'app-button-confirm',
  templateUrl: './button-confirm.component.html',
  styleUrls: ['./button-confirm.component.css']
})
export class ButtonConfirmComponent {

  @Input() buttonSettings: ButtonSettings = {
    onConfirmText: 'Agregar',
    onWaitingText: 'Agregando...'
  }
  @Input() icon: string | null = null;
  @Input() isWaiting: boolean = false;


  constructor() {
  }

}
