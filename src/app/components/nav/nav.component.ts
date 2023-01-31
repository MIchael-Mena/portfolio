import {Component} from '@angular/core';

import {StorageSessionService} from "../../service/storage-session.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public isLoggedIn: boolean = false;

  constructor(public storageService: StorageSessionService,
              private authService: AuthService,
              private router: Router) {
    this.storageService.onToggleSignUp().subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
  }

  logOut() {
    this.authService.logout();
    this.storageService.cleanUser();
    this.router.navigate(['/login']);
  }

}
