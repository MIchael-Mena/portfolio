import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {ButtonSettings} from "./ButtonSettings";

@Component({
  selector: 'app-button-confirm',
  templateUrl: './button-confirm.component.html',
  styleUrls: ['./button-confirm.component.css']
})
export class ButtonConfirmComponent {
  @Output() onClickConfirm: EventEmitter<void> = new EventEmitter<void>();
  @Input() buttonSettings: ButtonSettings = {
    onConfirmText: 'Agregar',
    onWaitingText: 'Agregando...',
    color: 'primary'
  }
  @Input() icon: string | null = null;
  @Input() isWaiting: boolean = false;

  constructor() {

  }

  public onConfirm(): void {
    // En caso de que el botón no esté dentro de un formulario, se puede emitir el evento
    this.onClickConfirm.emit();
  }


}
