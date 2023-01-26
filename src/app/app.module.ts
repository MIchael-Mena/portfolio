import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

// Necesario para usar [formControl] en los inputs
import {ReactiveFormsModule} from '@angular/forms';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from "./material.module";
import {DateLanguageModule} from "./date-language.module";

import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NavComponent} from './components/nav/nav.component';
import {ExperiencesComponent} from './components/experiences/experiences.component';
import {CardExperienceComponent} from './components/card-experience/cardExperience.component';
import {AddExperienceComponent} from './components/add-experience/add-experience.component';
import {UpdateDirective} from './directives/update.directive';
import {DatePickerComponent} from './components/date-picker/date-picker.component';
import {HomeComponent} from './components/home/home.component';
import {ExperienceService} from "./service/experience.service";
import {LoginFormComponent} from './components/login-form/login-form.component';
import {DialogDeleteCardComponent} from './components/dialog-delete-card/dialog-delete-card.component';
import {AboutComponent} from './components/about/about.component';
import {
  ExperienceAndEducationComponent
} from './components/experience-and-education/experience-and-education.component';
import {AuthService} from "./service/auth.service";

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
    DialogDeleteCardComponent,
    AboutComponent,
    ExperienceAndEducationComponent,
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
  providers: [ExperienceService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
