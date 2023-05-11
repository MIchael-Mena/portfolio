import {Component} from '@angular/core';

import {StorageSessionService} from "../../service/storage-session.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {faUserSecret, faArrowRightFromBracket, faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public routeAboutActive: boolean = false;
  public routeSkillsActive: boolean = false;
  public routeProjectsActive: boolean = false;
  public routeLoginActive: boolean = false;
  public icon = {
    faUserSecret,
    faArrowRightFromBracket,
    faArrowRightToBracket
  }
  // public faUserSecret = faUserSecret;
  // public faArrowRightFromBracket = faArrowRightFromBracket;
  public isLoggedIn: boolean = false;

  constructor(public storageService: StorageSessionService,
              private authService: AuthService,
              private router: Router) {
    this.storageService.onToggleSignUp().subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
  }

  public routerActive(state: boolean, route: string): void {
    // this.routeLoginActive = state;
    switch (route) {
      case 'about':
        this.routeAboutActive = state;
        break;
      case 'skills':
        this.routeSkillsActive = state;
        break;
      case 'projects':
        this.routeProjectsActive = state;
        break;
      case 'login':
        this.routeLoginActive = state;
        break;
    }
  }

  public logOut(): void {
    this.authService.logout().subscribe({
      next: (data: any) => {
        this.storageService.cleanUser();
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  prueba() {
    console.log('prueba');
  }

}
