import {FormExperience} from "./FormExperience";

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

}
