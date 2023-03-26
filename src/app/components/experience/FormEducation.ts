import {FormExperience} from "./FormExperience";
import {EducationData} from "./EducationData";
import {ExperienceData} from "./ExperienceData";

export class FormEducation implements FormExperience {
  get name(): string {
    return 'education';
  }

  getPrimaryInfoLabel(): string {
    return 'Título';
  }

  getSecondaryInfoLabel(): string {
    return 'Institución';
  }

  parseToExperienceData(experience: EducationData): ExperienceData {
    return {
      id: experience.id,
      primaryInfo: experience.title,
      secondaryInfo: experience.institution,
      description: experience.description,
      initialDate: experience.initialDate,
      finalDate: experience.finalDate,
      link: experience.link,
      position: experience.position,
      type: 'education'
    };
  }

  reverseParseFromExperienceData(experience: ExperienceData): EducationData {
    return {
      id: experience.id,
      title: experience.primaryInfo,
      institution: experience.secondaryInfo,
      description: experience.description,
      initialDate: experience.initialDate,
      finalDate: experience.finalDate,
      link: experience.link,
      position: experience.position,
    };
  }

}
