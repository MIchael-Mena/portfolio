import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-menu-edition',
  templateUrl: './menu-edition.component.html',
  styleUrls: ['./menu-edition.component.css']
})
export class MenuEditionComponent {
  @Input() disabled: boolean = false;
  @Output() onEdit = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();
  public faPenToSquare = faPenToSquare;
  public faTrashCan = faTrashCan;

  public edit(): void {
    this.onEdit.emit();
  }

  public delete(): void {
    this.onDelete.emit();
  }

}
