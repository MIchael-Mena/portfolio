import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, of} from 'rxjs';
import {AboutComponent} from "../components/about/about/about.component";
import {StorageSessionService} from "../service/storage-session.service";

/* Para agregar un nuevo componente que pueda ser escuchado por el guard, se debe agregar en
* CanDeactivate<ExperienceAndEducationComponent | AboutComponent> el nuevo componente, y en
* component: ExperienceAndEducationComponent | AboutComponent.
 */

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard  {

  constructor(private storageSessionService: StorageSessionService) {
  }

  canDeactivate(
    component: AboutComponent,
    _currentRoute: ActivatedRouteSnapshot,
    _currentState: RouterStateSnapshot,
    _nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return !this.storageSessionService.isLoggedIn ? of(true) : component.canDeactivate();
  }

}
