import {FormExperience} from "./FormExperience";
import {ExperienceData} from "./ExperienceData";
import {WorkData} from "./WorkData";

export class FormWork implements FormExperience {

  get name(): string {
    return 'work';
  }

  getPrimaryInfoLabel(): string {
    return 'Cargo';
  }

  getSecondaryInfoLabel(): string {
    return 'Empresa';
  }

  parseToExperienceData(experience: WorkData): ExperienceData {
    return {
      id: experience.id,
      primaryInfo: experience.job,
      secondaryInfo: experience.company,
      description: experience.description,
      initialDate: experience.initialDate,
      finalDate: experience.finalDate,
      link: experience.link,
      position: experience.position,
      type: 'work',
    };
  }

  reverseParseFromExperienceData(experience: ExperienceData): WorkData {
    return {
      id: experience.id,
      job: experience.primaryInfo,
      company: experience.secondaryInfo,
      description: experience.description,
      initialDate: experience.initialDate,
      finalDate: experience.finalDate,
      link: experience.link,
      position: experience.position,
    };
  }

}
