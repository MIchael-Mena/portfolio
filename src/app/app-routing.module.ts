import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from "./components/about/about.component";
import {
  ExperienceAndEducationComponent
} from "./components/experience-and-education/experience-and-education.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {PermissionGuard} from "./guards/permission-guard.service";
import {UnsavedChangesGuard} from "./guards/unsaved-changes.guard";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'experience&education', component: ExperienceAndEducationComponent, canDeactivate: [UnsavedChangesGuard]},
  {path: 'login', component: LoginFormComponent, canActivate: [PermissionGuard]},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: false}),],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
