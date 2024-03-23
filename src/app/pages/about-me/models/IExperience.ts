import { ExperienceService } from 'src/app/pages/about-me/services/experience.service';
import { FormExperience } from './FormExperience';
import { Observable } from 'rxjs';

export interface IExperience {
  title: string;

  serviceToUse(service: ExperienceService): void;

  formToUse(): FormExperience;

  onToggleAdd(): Observable<boolean>;

  toggleAdd(): void;
}
