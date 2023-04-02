import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillsComponent} from "./skills/skills.component";
import {SharedModule} from "../../shared/shared.module";
import {SkillBarComponent} from "./skill-bar/skill-bar.component";
import {ModalSkillComponent} from "./modal-skill/modal-skill.component";
import {ButtonModalModule} from "../shared/button-modal/button-modal.module";
import {SelectFileModule} from "../shared/select-file/select-file.module";
import {MenuEditionModule} from "../shared/menu-edition/menu-edition.module";

@NgModule({
  declarations: [SkillsComponent, SkillBarComponent, ModalSkillComponent],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModalModule,
    SelectFileModule,
    MenuEditionModule
  ],
  exports: [SkillsComponent]
})

export class SkillModule {
}
