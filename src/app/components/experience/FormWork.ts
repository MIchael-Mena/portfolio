import {FormExperience} from "./FormExperience";

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

}
