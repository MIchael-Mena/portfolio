import { ExperienceService } from "src/app/service/experience.service";
import { FormExperience } from "./FormExperience";

export interface Experience {

    title: string;

    serviceToUse(service: ExperienceService): void;
    
    formToUse(): FormExperience;
}