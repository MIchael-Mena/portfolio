import {NgModule} from '@angular/core';

import {httpInterceptorProviders} from "./interceptors/loading.interceptor";
import {StorageSessionService} from "./service/storage-session.service";

import {UpdateDirective} from './directives/update.directive';

// import {SafePipe} from './pipes/safe.pipe';

import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {AuthService} from "./service/auth.service";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {IconsComponent} from './components/icons/icons.component';
import {DialogCardComponent} from './components/dialog-card/dialog-card.component';

import {AboutModule} from "./components/about/about.module";
import {SharedModule} from "./shared/shared.module";
import {SkillModule} from "./components/skill/skill.module";
import {ExperienceModule} from "./components/experience/experience.module";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UpdateDirective,
    LoginFormComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    IconsComponent,
    DialogCardComponent,
    // SafePipe,
  ],
  imports: [
    SharedModule,
    AboutModule,
    SkillModule,
    ExperienceModule
  ],
  providers: [AuthService, StorageSessionService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
