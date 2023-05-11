import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {
  ExperienceAndEducationComponent
} from "../components/experience/experience-and-education/experience-and-education.component";
import {AboutComponent} from "../components/about/about/about.component";

/* Para agregar un nuevo componente que pueda ser escuchado por el guard, se debe agregar en
* CanDeactivate<ExperienceAndEducationComponent | AboutComponent> el nuevo componente, y en
* component: ExperienceAndEducationComponent | AboutComponent.
 */

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<AboutComponent> {
  canDeactivate(
    component: AboutComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate();
  }

}
