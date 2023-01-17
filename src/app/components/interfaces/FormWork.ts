import { FormExperience } from "./FormExperience";

export class FormWork implements FormExperience{

    getPrimaryInfoLabel(): string {
        return 'Cargo';
    }

    getSecondaryInfoLabel(): string {
        return 'Empresa';
    }

}