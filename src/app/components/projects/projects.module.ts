import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsComponent} from './projects/projects.component';
import {CardProjectComponent} from './card-project/card-project.component';
import {SharedModule} from "../../shared/shared.module";
import {MatRippleModule} from "@angular/material/core";
import {MenuEditionModule} from "../shared/menu-edition/menu-edition.module";

@NgModule({
  declarations: [
    ProjectsComponent,
    CardProjectComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatRippleModule,
    MenuEditionModule
  ],
  exports: [
    ProjectsComponent
  ]
})

export class ProjectsModule {
}
