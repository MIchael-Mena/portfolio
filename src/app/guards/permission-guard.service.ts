import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageSessionService} from "../service/storage-session.service";

@Injectable({
  providedIn: 'root'
})
export class PermissiondGuard implements CanActivate {

  constructor(private storageSessionService: StorageSessionService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.storageSessionService.isLogged;
  }

}
