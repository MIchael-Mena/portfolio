import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {
  ExperienceAndEducationComponent
} from "../components/experience/experience-and-education/experience-and-education.component";
import {AboutComponent} from "../components/about/about/about.component";
import {StorageSessionService} from "../service/storage-session.service";

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<ExperienceAndEducationComponent | AboutComponent> {
  

  canDeactivate(
    component: ExperienceAndEducationComponent | AboutComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate();
  }

}
