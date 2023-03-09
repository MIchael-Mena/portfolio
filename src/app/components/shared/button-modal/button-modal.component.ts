import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonSettings} from "../button-confirm/ButtonSettings";

@Component({
  selector: 'app-button-modal',
  templateUrl: './button-modal.component.html',
  styleUrls: ['./button-modal.component.css']
})
export class ButtonModalComponent {
  @Output() onClickCancel: EventEmitter<void> = new EventEmitter<void>();
  @Input() isWaiting: boolean = false;
  @Input() buttonSettings: ButtonSettings = <ButtonSettings>{};

  constructor() {
  }

  public onClick(): void {
    this.onClickCancel.emit();
  }

}
