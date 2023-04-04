import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsComponent} from './projects/projects.component';
import {CardProjectComponent} from './card-project/card-project.component';
import {SharedModule} from "../../shared/shared.module";
import {MenuEditionModule} from "../shared/menu-edition/menu-edition.module";
import {MainHeaderModule} from "../shared/main-header/main-header.module";

@NgModule({
  declarations: [
    ProjectsComponent,
    CardProjectComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MenuEditionModule,
    MainHeaderModule
  ],
  exports: [
    ProjectsComponent
  ]
})

export class ProjectsModule {
}
