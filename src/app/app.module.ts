import { NgModule } from '@angular/core';

import { httpInterceptorProviders } from './interceptors/loading.interceptor';
import { AuthInterceptorRequest } from './interceptors/http-request.interceptor';
import { StorageSessionService } from './service/storage-session.service';

import { UpdateDirective } from './directives/update.directive';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthService } from './service/auth.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DialogCardComponent } from './components/dialog-card/dialog-card.component';

import { AboutModule } from './components/about/about.module';
import { SharedModule } from './shared/shared.module';
import { SkillModule } from './components/skill/skill.module';
import { AppRoutingModule } from './shared/app-routing.module';
import { DateLanguageModule } from './shared/date-language.module';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonConfirmModule } from './components/shared/button-confirm/button-confirm.module';
import { HomeComponent } from './components/home/home.component';
import { ProjectsModule } from './components/projects/projects.module';
import { FooterComponent } from './components/footer/footer.component';
import { IconRegistryService } from './service/icon-registry.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UpdateDirective,
    LoginFormComponent,
    PageNotFoundComponent,
    DialogCardComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AboutModule,
    SkillModule,
    AppRoutingModule,
    DateLanguageModule,
    ButtonConfirmModule,
    ProjectsModule,
  ],
  providers: [
    AuthService,
    StorageSessionService,
    httpInterceptorProviders,
    AuthInterceptorRequest,
    IconRegistryService,
  ],
  exports: [PageNotFoundComponent],
  bootstrap: [AppComponent],
})

// Agrego ButtonConfirmModule para que funcione en login, convertir a login en standalone
// DialogCardComponent nunca se instancia, se usa con mat-dialog
export class AppModule {}
