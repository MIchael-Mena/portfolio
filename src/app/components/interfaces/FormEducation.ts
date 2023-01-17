import { FormExperience } from "./FormExperience";

export class FormEducation implements FormExperience {

    getPrimaryInfoLabel(): string {
        return 'Título';
    }

    getSecondaryInfoLabel(): string {
        return 'Institución';
    }

}