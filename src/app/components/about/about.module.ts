import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from "./about/about.component";
import {SharedModule} from "../../shared/shared.module";
import {DataComponent} from "./data/data.component";
import {ModalEditImgComponent} from './modal-edit-img/modal-edit-img.component';
import {SocialMediaComponent} from './social-media/social-media.component';
import { ModalSocialMediaComponent } from './modal-social-media/modal-social-media.component';

// error si importo safe pipe que también esta en app.module.ts

@NgModule({
  declarations: [AboutComponent, DataComponent, ModalEditImgComponent, SocialMediaComponent, ModalSocialMediaComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AboutComponent]
})
export class AboutModule {
}
