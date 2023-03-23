import {WorkData} from "./WorkData";
import {EducationData} from "./EducationData";
import {ExperienceData} from "./ExperienceData";

export interface FormExperience {
  get name(): string;

  getPrimaryInfoLabel(): string;

  getSecondaryInfoLabel(): string;

  parseToExperienceData(experience: WorkData | EducationData): ExperienceData;

  reverseParseFromExperienceData(experience: ExperienceData): WorkData | EducationData;

}
