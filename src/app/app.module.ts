import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MomentDateModule} from '@angular/material-moment-adapter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

// Necesario para usar la fecha en español
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Necesario para usar [formControl] en los inputs
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NavComponent} from './components/nav/nav.component';
import {ExperiencesComponent} from './components/experiences/experiences.component';
import {CardExperienceComponent} from './components/card-experience/cardExperience.component';
import {AddExperienceComponent} from './components/add-experience/add-experience.component';
import {UpdateDirective} from './directives/update.directive';
import {DatePickerComponent} from './components/date-picker/date-picker.component';
import {HomeComponent} from './components/home/home.component';
import {EducationComponent} from './components/education/education.component';
import {WorkComponent} from './components/work/work.component';
import {ExperienceService} from "./service/experience.service";
import {LoginFormComponent} from './components/login-form/login-form.component';
import {DialogDeleteCardComponent} from './components/dialog-delete-card/dialog-delete-card.component';
import {MatDialogModule} from "@angular/material/dialog";


registerLocaleData(localeEs, 'es');

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'education', component: EducationComponent},
  {path: 'work', component: WorkComponent},
  {path: 'login', component: LoginFormComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ExperiencesComponent,
    CardExperienceComponent,
    AddExperienceComponent,
    UpdateDirective,
    DatePickerComponent,
    EducationComponent,
    WorkComponent,
    LoginFormComponent,
    DialogDeleteCardComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MomentDateModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    MatDialogModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}, ExperienceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
