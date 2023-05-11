import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from "./about/about.component";
import {SharedModule} from "../../shared/shared.module";
import {FieldComponent} from "./field/field.component";
import {ModalEditImgComponent} from './modal-edit-img/modal-edit-img.component';
import {SocialNetworkComponent} from './social-network/social-network.component';
import {ModalSocialNetworkComponent} from './modal-social-network/modal-social-network.component';
import {ButtonModalModule} from "../shared/button-modal/button-modal.module";
import {SelectFileModule} from "../shared/select-file/select-file.module";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MenuEditionModule} from "../shared/menu-edition/menu-edition.module";
import {ExperienceModule} from "../experience/experience.module";


@NgModule({
  declarations: [AboutComponent, FieldComponent, ModalEditImgComponent, SocialNetworkComponent, ModalSocialNetworkComponent],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModalModule,
    SelectFileModule,
    CdkDropList,
    CdkDrag,
    MenuEditionModule,
    ExperienceModule
  ],
  exports: [AboutComponent]
})
export class AboutModule {
}
