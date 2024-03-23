import { ExperienceService } from 'src/app/pages/about-me/services/experience.service';
import { IExperience } from './IExperience';
import { FormEducation } from './FormEducation';
import { FormExperience } from './FormExperience';
import { ExperienceServiceForAdd } from './ExperienceServiceForAdd';

export class Education extends ExperienceServiceForAdd implements IExperience {
  title: string = 'Educación';

  serviceToUse(service: ExperienceService): void {
    service.useEducationDatabase();
  }

  formToUse(): FormExperience {
    return new FormEducation();
  }
}
