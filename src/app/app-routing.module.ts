import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './pages/auth/login-form/login-form.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { PermissionGuard } from './core/guards/permission-guard.service';
import { UnsavedChangesGuard } from './core/guards/unsaved-changes.guard';
import { SkillsComponent } from './pages/skills/skills.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AboutComponent } from './pages/about-me/about.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'about',
    component: AboutComponent,
    canDeactivate: [UnsavedChangesGuard],
  },
  { path: 'skills', component: SkillsComponent },
  { path: 'projects', component: ProjectsComponent },
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [PermissionGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
      /*    scrollPositionRestoration: 'enabled',
        scrollOffset: [0, 64]*/
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
