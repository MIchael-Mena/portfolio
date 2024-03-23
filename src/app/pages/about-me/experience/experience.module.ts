import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceAndEducationComponent } from './experience-and-education/experience-and-education.component';
import { SharedModule } from '../../../core/shared.module';
import { CardExperienceComponent } from './card-experience/cardExperience.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { ButtonConfirmModule } from '../../../shared/components/button-confirm/button-confirm.module';
// import { DatePickerModule } from '../../../shared/components/date-picker/date-picker.module';
import { MenuEditionModule } from '../../../shared/components/menu-edition/menu-edition.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MainHeaderModule } from '../../../shared/components/main-header/main-header.module';
import { AddButtonModule } from '../../../shared/components/add-button/add-button.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatePickerComponent } from 'src/app/shared/components/date-picker/date-picker.component';

@NgModule({
  declarations: [
    ExperienceAndEducationComponent,
    AddExperienceComponent,
    CardExperienceComponent,
    ExperiencesComponent,
  ],
  imports: [
    DatePickerComponent,
    CommonModule,
    SharedModule,
    ButtonConfirmModule,
    // DatePickerModule,
    MenuEditionModule,
    MatTabsModule,
    MainHeaderModule,
    AddButtonModule,
    MatExpansionModule,
  ],
  exports: [ExperienceAndEducationComponent, ExperiencesComponent],
})
export class ExperienceModule {}
