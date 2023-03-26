import {Component, OnInit} from '@angular/core';
import {StorageSessionService} from "./service/storage-session.service";
import {AuthService} from "./service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(private storageSession: StorageSessionService,
              private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    const isLogged = this.storageSession.isLoggedIn;
    if (isLogged) {
      this.authService.refreshToken().subscribe({
        error: (error) => {
          this.authService.logout().subscribe({
              complete: () => {
                this.storageSession.cleanUser();
                this.router.navigate(['/login']);
              }
            }
          );
        }
      });
    }
  }

}
