import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { SharedModule } from '../../core/shared.module';
import { SkillBarComponent } from './skill-bar/skill-bar.component';
import { ModalSkillComponent } from './modal-skill/modal-skill.component';
import { ButtonModalModule } from '../../shared/components/button-modal/button-modal.module';
import { SelectFileModule } from '../../shared/components/select-file/select-file.module';
import { MenuEditionModule } from '../../shared/components/menu-edition/menu-edition.module';
import { MainHeaderModule } from '../../shared/components/main-header/main-header.module';

@NgModule({
  declarations: [SkillsComponent, SkillBarComponent, ModalSkillComponent],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModalModule,
    SelectFileModule,
    MenuEditionModule,
    MainHeaderModule,
  ],
  exports: [SkillsComponent],
})
export class SkillModule {}
