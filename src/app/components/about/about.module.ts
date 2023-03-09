import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from "./about/about.component";
import {SharedModule} from "../../shared/shared.module";
import {DataComponent} from "./data/data.component";
import {ModalEditImgComponent} from './modal-edit-img/modal-edit-img.component';
import {SocialNetworkComponent} from './social-network/social-network.component';
import {ModalSocialNetworkComponent} from './modal-social-network/modal-social-network.component';
import {ButtonModalModule} from "../shared/button-modal/button-modal.module";
import {SelectFileModule} from "../shared/select-file/select-file.module";


@NgModule({
  declarations: [AboutComponent, DataComponent, ModalEditImgComponent, SocialNetworkComponent, ModalSocialNetworkComponent],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModalModule,
    SelectFileModule
  ],
  exports: [AboutComponent]
})
export class AboutModule {
}
