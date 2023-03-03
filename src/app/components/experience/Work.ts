import {ExperienceService} from "src/app/components/experience/service/experience.service";
import {Experience} from "./Experience";
import {FormExperience} from "./FormExperience";
import {FormWork} from "./FormWork";

export class Work implements Experience {

  title: string = "Experiencia Laboral";

  serviceToUse(service: ExperienceService): void {
    service.useWorkingDatabase();
  }

  formToUse(): FormExperience {
    return new FormWork();
  }
}
