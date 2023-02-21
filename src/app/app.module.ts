import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

// Necesario para usar [formControl] en los inputs
import {ReactiveFormsModule} from '@angular/forms';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from "./material.module";
import {DateLanguageModule} from "./date-language.module";
import {httpInterceptorProviders} from "./interceptors/loading.interceptor";
import {StorageSessionService} from "./service/storage-session.service";

import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NavComponent} from './components/nav/nav.component';
import {ExperiencesComponent} from './components/experiences/experiences.component';
import {CardExperienceComponent} from './components/card-experience/cardExperience.component';
import {AddExperienceComponent} from './components/add-experience/add-experience.component';
import {UpdateDirective} from './directives/update.directive';
import {DatePickerComponent} from './components/date-picker/date-picker.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {AboutComponent} from './components/about/about.component';
import {
  ExperienceAndEducationComponent
} from './components/experience-and-education/experience-and-education.component';
import {AuthService} from "./service/auth.service";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {IconsComponent} from './components/icons/icons.component';
import {DialogCardComponent} from './components/dialog-card/dialog-card.component';
import {SafePipe} from './pipes/safe.pipe';
import {SkillsComponent} from './components/skills/skills.component';
import {SkillBarComponent} from './components/skill-bar/skill-bar.component';
import {ModalSkillComponent} from './components/modal-skill/modal-skill.component';

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
    AboutComponent,
    ExperienceAndEducationComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    IconsComponent,
    DialogCardComponent,
    SafePipe,
    SkillsComponent,
    SkillBarComponent,
    ModalSkillComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    DateLanguageModule,
  ],
  providers: [AuthService, StorageSessionService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
