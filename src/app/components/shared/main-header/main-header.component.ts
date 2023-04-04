import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {
  @Input() title: string = 'Main Header';
  @Input() hideButton: boolean = false;
  @Input() active = false;
  @Input() icon: string = '';
  @Output() onAdd: EventEmitter<any> = new EventEmitter();

  emitAdd(): void {
    this.onAdd.emit();
  }

}
