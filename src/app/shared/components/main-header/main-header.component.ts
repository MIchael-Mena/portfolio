import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
  animations: [
    trigger('shake', [
      state('initial', style({ transform: 'translateX(0)' })),
      state('toLeft', style({ transform: 'translateX(-5px) rotate(-10deg)' })),
      state(
        'toRight',
        style({
          transform:
            'translateX(5px) rotate(10deg) translateX(-5px) rotate(-10deg)',
        })
      ),
      transition('initial => toLeft', animate('200ms ease-in')),
      transition('toLeft => toRight', animate('200ms ease-in-out')),
      transition('toRight => initial', animate('200ms ease-out')),
    ]),
  ],
})
export class MainHeaderComponent {
  @Input() title: string = 'Main Header';
  @Input() hideButton: boolean = false;
  @Input() active = false;
  @Input() icon: string = '';
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  public hoverState: string = 'initial';

  emitAdd(): void {
    this.onAdd.emit();
  }

  onMouseOver() {
    this.hoverState = 'toLeft';
    setTimeout(() => {
      this.hoverState = 'toRight';
    }, 100);
  }

  onMouseOut() {
    this.hoverState = 'initial';
  }
}
