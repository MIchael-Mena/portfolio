import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
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
export class UnsavedChangesGuard implements CanDeactivate<AboutComponent> {

  constructor(private storageSessionService: StorageSessionService) {
  }

  canDeactivate(
    component: AboutComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return !this.storageSessionService.isLoggedIn ? of(true) : component.canDeactivate();
  }

}
