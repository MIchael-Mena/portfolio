import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExperienceAndEducationComponent} from "./experience-and-education/experience-and-education.component";
import {SharedModule} from "../../shared/shared.module";
import {CardExperienceComponent} from "./card-experience/cardExperience.component";
import {DatePickerComponent} from "../date-picker/date-picker.component";
import {ExperiencesComponent} from "./experiences/experiences.component";
import {ButtonConfirmComponent} from "../button-confirm/button-confirm.component";
import {AddExperienceComponent} from "./add-experience/add-experience.component";


@NgModule({
  declarations: [ExperienceAndEducationComponent,
    AddExperienceComponent,
    CardExperienceComponent,
    ExperiencesComponent,
    DatePickerComponent,
    ButtonConfirmComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [ExperienceAndEducationComponent, ExperiencesComponent, ButtonConfirmComponent]
})
export class ExperienceModule {
}
