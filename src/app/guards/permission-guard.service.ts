import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageSessionService} from "../service/storage-session.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private storageSessionService: StorageSessionService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.storageSessionService.isLoggedIn) {
      this.router.navigate(['/home']);
      alert('Debes cerrar sesión para acceder a esta página');
      return false;
    }
    return true;
  }

}
