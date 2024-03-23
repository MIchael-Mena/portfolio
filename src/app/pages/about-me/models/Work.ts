import { ExperienceService } from 'src/app/pages/about-me/services/experience.service';
import { IExperience } from './IExperience';
import { FormExperience } from './FormExperience';
import { FormWork } from './FormWork';
import { ExperienceServiceForAdd } from './ExperienceServiceForAdd';

export class Work extends ExperienceServiceForAdd implements IExperience {
  title: string = 'Experiencia Laboral';

  serviceToUse(service: ExperienceService): void {
    service.useWorkingDatabase();
  }

  formToUse(): FormExperience {
    return new FormWork();
  }
}
