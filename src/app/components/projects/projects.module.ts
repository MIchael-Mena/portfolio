import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsComponent} from './projects/projects.component';
import {CardProjectComponent} from './card-project/card-project.component';
import {SharedModule} from "../../shared/shared.module";
import {MenuEditionModule} from "../shared/menu-edition/menu-edition.module";
import {MainHeaderModule} from "../shared/main-header/main-header.module";
import {GalleryModule} from "ng-gallery";
import {LightboxModule} from 'ng-gallery/lightbox';
import {ModalProjectComponent} from './modal-project/modal-project.component';
import {ButtonModalModule} from "../shared/button-modal/button-modal.module";
import {AddButtonModule} from "../shared/add-button/add-button.module";
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {MatChipsModule} from "@angular/material/chips";
import {CarouselComponent} from './carousel/carousel.component';
import {ChipsComponent} from './chips/chips.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [
    ProjectsComponent,
    CardProjectComponent,
    ModalProjectComponent,
    CarouselComponent,
    ChipsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MenuEditionModule,
    MainHeaderModule,
    GalleryModule,
    LightboxModule,
    ButtonModalModule,
    AddButtonModule,
    CarouselModule.forRoot(),
    MatChipsModule,
    MatAutocompleteModule
  ],
  exports: [
    ProjectsComponent
  ]
})

export class ProjectsModule {
}
