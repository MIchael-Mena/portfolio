import {Component, Input, OnInit} from '@angular/core';
import {ExperienceService} from 'src/app/service/experience.service';
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import {ExperienceData} from 'src/app/components/interfaces/ExperienceData';

import {UiEditFormService} from 'src/app/service/uiEditForm.service';
import {Experience} from '../interfaces/Experience';
import {FormExperience} from '../interfaces/FormExperience';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
  // Cada instancia de este componente tendrá su propio servicio
  providers: [UiEditFormService]
})
export class ExperiencesComponent implements OnInit {
  faSquarePlus = faSquarePlus;
  experiences: ExperienceData[] = [];
  formExperienceConfig: { showForm: boolean, experienceIsNew: boolean } = {showForm: false, experienceIsNew: true};

  formExperience?: FormExperience;
  @Input() experience?: Experience;

  constructor(private experienceService: ExperienceService, private uiEditFormService: UiEditFormService) {
  }

  ngOnInit(): void {
    this.experience?.serviceToUse(this.experienceService);
    this.formExperience = this.experience?.formToUse();

    this.experienceService.getExperiences().subscribe(experiences => {
        this.experiences = experiences;
      }
    );
  }

  showForm() {
    this.formExperienceConfig.showForm = !this.formExperienceConfig.showForm;
  }

  addExperience(experience: ExperienceData) {
    // Check if new experience or update existing experience
    // If experience.id is null, then it is a new experience
    // Uso != ya que null != undefined es false
    this.experienceService.addExperience(experience).subscribe(experience => {
      this.experiences.push(experience);
    });
  }

  updateExperience(experience: ExperienceData) {
    this.experienceService.updateExperience(experience).subscribe(() => {
      this.experiences = this.experiences.map(
        currentExperience => {
          if (experience.id === currentExperience.id) {
            currentExperience = {...experience};
          }
          return currentExperience;
        });
    });
  }

  deleteExperience(experience: ExperienceData) {
    this.experienceService.deleteExperience(experience).subscribe(() => {
      this.experiences = this.experiences.filter(t => t.id !== experience.id);
    });
  }

  editExperience(experience: ExperienceData) {
    // Envío el objeto experience al servicio para que lo pueda editar
    // y lo muestre en el formulario
    this.formExperienceConfig = {showForm: true, experienceIsNew: false};
    this.uiEditFormService.toggleEdit(experience);

    window.scrollTo(0, 0);
  }

}
