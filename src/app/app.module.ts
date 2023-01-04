import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Necesario para usar [formControl] en los inputs
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './components/nav/nav.component';
import { ExperienceAndEducationComponent } from './components/experience-and-education/experience-and-education.component';
import { CardComponent } from './components/card/card.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { UpdateDirective } from './directives/update.directive';

/* const appRoutes: Routes = [
  { path: '', component: Home },
] */

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ExperienceAndEducationComponent,
    CardComponent,
    AddExperienceComponent,
    UpdateDirective
  ],
  imports: [
    BrowserModule, 
    FontAwesomeModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
