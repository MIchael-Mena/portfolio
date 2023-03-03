import {ExperienceService} from "src/app/components/experience/service/experience.service";
import {Experience} from "./Experience";
import {FormEducation} from "./FormEducation";
import {FormExperience} from "./FormExperience";

export class Education implements Experience {

  title: string = "Educación";

  serviceToUse(service: ExperienceService): void {
    service.useEducationDatabase();
  }

  formToUse(): FormExperience {
    return new FormEducation();
  }
}
