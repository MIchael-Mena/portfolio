import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from "./components/about/about.component";
import {
  ExperienceAndEducationComponent
} from "./components/experience-and-education/experience-and-education.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";

const appRoutes: Routes = [
  {path: '', component: AboutComponent},
  {path: 'experience&education', component: ExperienceAndEducationComponent},
  {path: 'login', component: LoginFormComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: false}),],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
