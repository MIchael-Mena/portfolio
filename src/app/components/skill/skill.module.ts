import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillsComponent} from "./skills/skills.component";
import {SharedModule} from "../../shared/shared.module";
import {SkillBarComponent} from "./skill-bar/skill-bar.component";
import {ModalSkillComponent} from "./modal-skill/modal-skill.component";
import {SelectFileComponent} from "../select-file/select-file.component";


@NgModule({
  declarations: [SkillsComponent, SkillBarComponent, ModalSkillComponent, SelectFileComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [SkillsComponent]
})

export class SkillModule {
}
