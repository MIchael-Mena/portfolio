import {Component} from '@angular/core';
import {StorageSessionService} from "../../service/storage-session.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public isLoggedIn: boolean = false;

  constructor(storageService: StorageSessionService) {
    storageService.onToggleSignUp().subscribe(() => {
      this.isLoggedIn = storageService.isLoggedIn;
    });
  }

}
