import { Component, EventEmitter, Output } from '@angular/core';
import { StorageSessionService } from '../../../core/services/storage-session.service';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
})
export class AddButtonComponent {
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  public isLoggedIn: boolean = false;
  public faCirclePlus = faCirclePlus;

  constructor(private storageService: StorageSessionService) {
    this.storageService.onToggleSignUp().subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  add() {
    this.onAdd.emit();
  }
}
