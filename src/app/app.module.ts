import { NgModule } from '@angular/core';

import { httpInterceptorProviders } from './core/interceptors/loading.interceptor';
import { AuthInterceptorRequest } from './core/interceptors/http-request.interceptor';
import { StorageSessionService } from './core/services/storage-session.service';

import { UpdateDirective } from './core/directives/update.directive';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { LoginFormComponent } from './pages/auth/login-form/login-form.component';
import { AuthService } from './core/services/auth.service';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { DialogCardComponent } from './shared/components/dialog-card/dialog-card.component';

import { SharedModule } from './core/shared.module';
import { SkillModule } from './pages/skills/skill.module';
import { AppRoutingModule } from './app-routing.module';
import { DateLanguageModule } from './core/date-language.module';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonConfirmModule } from './shared/components/button-confirm/button-confirm.module';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsModule } from './pages/projects/projects.module';
import { FooterComponent } from './core/components/footer/footer.component';
import { IconRegistryService } from './core/services/icon-registry.service';
import { AboutModule } from './pages/about-me/about.module';

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
