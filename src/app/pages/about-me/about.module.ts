import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SharedModule } from '../../core/shared.module';
import { FieldComponent } from './field/field.component';
import { ModalEditImgComponent } from './modal-edit-img/modal-edit-img.component';
import { SocialNetworkComponent } from './social-network/social-network.component';
import { ModalSocialNetworkComponent } from './modal-social-network/modal-social-network.component';
import { ButtonModalModule } from '../../shared/components/button-modal/button-modal.module';
import { SelectFileModule } from '../../shared/components/select-file/select-file.module';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { MenuEditionModule } from '../../shared/components/menu-edition/menu-edition.module';
import { AboutComponent } from './about.component';
import { ExperienceModule } from './experience/experience.module';

@NgModule({
  declarations: [
    AboutComponent,
    FieldComponent,
    ModalEditImgComponent,
    SocialNetworkComponent,
    ModalSocialNetworkComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModalModule,
    SelectFileModule,
    CdkDropList,
    CdkDrag,
    MenuEditionModule,
    ExperienceModule,
    NgOptimizedImage,
  ],
  exports: [AboutComponent],
})
export class AboutModule {}
