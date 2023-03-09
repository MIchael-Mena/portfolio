import {NgModule} from '@angular/core';

import {httpInterceptorProviders} from "./interceptors/loading.interceptor";
import {StorageSessionService} from "./service/storage-session.service";

import {UpdateDirective} from './directives/update.directive';


import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {AuthService} from "./service/auth.service";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {IconsComponent} from './components/icons/icons.component';
import {DialogCardComponent} from './components/dialog-card/dialog-card.component';

import {AboutModule} from "./components/about/about.module";
import {SharedModule} from "./shared/shared.module";
import {SkillModule} from "./components/skill/skill.module";
import {ExperienceModule} from "./components/experience/experience.module";
import {AppRoutingModule} from "./shared/app-routing.module";
import {DateLanguageModule} from "./shared/date-language.module";
import {BrowserModule} from "@angular/platform-browser";
import {ButtonConfirmModule} from "./components/shared/button-confirm/button-confirm.module";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UpdateDirective,
    LoginFormComponent,
    PageNotFoundComponent,
    IconsComponent,
    DialogCardComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AboutModule,
    SkillModule,
    ExperienceModule,
    AppRoutingModule,
    DateLanguageModule,
    ButtonConfirmModule
  ],
  providers: [AuthService, StorageSessionService, httpInterceptorProviders],
  exports: [
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})

// Agrego ButtonConfirmModule para que funcione en login, convertir a login en standalone
// DialogCardComponent nunca se instancia, se usa con mat-dialog

export class AppModule {
}
