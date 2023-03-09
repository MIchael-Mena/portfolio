import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExperienceAndEducationComponent} from "./experience-and-education/experience-and-education.component";
import {SharedModule} from "../../shared/shared.module";
import {CardExperienceComponent} from "./card-experience/cardExperience.component";
import {ExperiencesComponent} from "./experiences/experiences.component";
import {AddExperienceComponent} from "./add-experience/add-experience.component";
import {ButtonConfirmModule} from "../shared/button-confirm/button-confirm.module";
import {DatePickerModule} from "../shared/date-picker/date-picker.module";


@NgModule({
  declarations: [ExperienceAndEducationComponent,
    AddExperienceComponent,
    CardExperienceComponent,
    ExperiencesComponent],
  imports: [
    CommonModule,
    SharedModule,
    ButtonConfirmModule,
    DatePickerModule
  ],
  exports: [ExperienceAndEducationComponent, ExperiencesComponent]
})
export class ExperienceModule {
}
