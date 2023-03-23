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

  public routeAboutActive: boolean = false;
  public routeExpAndEduActive: boolean = false;
  public routeSkillsActive: boolean = false;
  public routeProjectsActive: boolean = false;
  public routeLoginActive: boolean = false;

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
      case 'expAndEdu':
        this.routeExpAndEduActive = state;
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
    this.authService.logout(this.storageService.user.id);
    this.storageService.cleanUser();
    this.router.navigate(['/login']);
  }

  prueba() {
    console.log('prueba');
  }

}
