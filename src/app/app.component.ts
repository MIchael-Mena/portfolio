import {Component, OnInit} from '@angular/core';
import {StorageSessionService} from "./service/storage-session.service";
import {AuthService} from "./service/auth.service";
import {Router} from "@angular/router";
import {User} from "./components/shared/User";
import {IconRegistryService} from "./service/icon-registry.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(private storageSession: StorageSessionService,
              private authService: AuthService,
              private router: Router,
              private iconRegistry: IconRegistryService) {
  }

  ngOnInit() {
    const isLogged = this.storageSession.isLoggedIn;
    if (isLogged) {
      this.authService.refreshToken().subscribe({
        next: (response) => {
          // Esto es necesario, ya que los detalles del usuario solo viven en la instancia de storageSession
          this.authService.getAuthUser().subscribe({
            next: (user: User) => {
              this.storageSession.saveUser(user);
            }
          })
        },
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
