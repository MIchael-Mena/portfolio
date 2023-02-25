import {NgModule} from '@angular/core';

import {httpInterceptorProviders} from "./interceptors/loading.interceptor";
import {StorageSessionService} from "./service/storage-session.service";

import {UpdateDirective} from './directives/update.directive';

// import {SafePipe} from './pipes/safe.pipe';

import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {ExperiencesComponent} from './components/experiences/experiences.component';
import {CardExperienceComponent} from './components/card-experience/cardExperience.component';
import {AddExperienceComponent} from './components/add-experience/add-experience.component';
import {DatePickerComponent} from './components/date-picker/date-picker.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {
  ExperienceAndEducationComponent
} from './components/experience-and-education/experience-and-education.component';
import {AuthService} from "./service/auth.service";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {IconsComponent} from './components/icons/icons.component';
import {DialogCardComponent} from './components/dialog-card/dialog-card.component';
import {SkillsComponent} from './components/skills/skills.component';
import {SkillBarComponent} from './components/skill-bar/skill-bar.component';
import {ModalSkillComponent} from './components/modal-skill/modal-skill.component';

import {AboutModule} from "./components/about/about.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ExperiencesComponent,
    CardExperienceComponent,
    AddExperienceComponent,
    UpdateDirective,
    DatePickerComponent,
    LoginFormComponent,
    ExperienceAndEducationComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    IconsComponent,
    DialogCardComponent,
    // SafePipe,
    SkillsComponent,
    SkillBarComponent,
    ModalSkillComponent,
  ],
  imports: [
    SharedModule,
    AboutModule
  ],
  providers: [AuthService, StorageSessionService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
