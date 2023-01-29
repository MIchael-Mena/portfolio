import {Component} from '@angular/core';

import {StorageService} from "../../service/storage.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public storageService: StorageService, private authService: AuthService) {
  }

  logOut() {
    this.authService.logout();
    this.storageService.cleanUser();
  }

}
