import { Component, OnInit } from '@angular/core';
import { ExperienceService } from 'src/app/service/experience.service';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Experience } from 'src/app/components/interfaces/Experience';

import { UiEditFormService } from 'src/app/service/uiEditForm.service';
import { FormWork } from '../interfaces/FormWork';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})  
export class Experiences implements OnInit {
  faSquarePlus = faSquarePlus;
  experiences: Experience[] = [];
  formExperienceConfig : {showForm: boolean, experienceIsNew: boolean} = {showForm: false, experienceIsNew: true};
  formWork: FormWork = new FormWork();

  constructor(private experienceService: ExperienceService, private uiEditFormService : UiEditFormService) {
  }

  ngOnInit(): void {
    this.experienceService.getExperiences().subscribe(experiences => {
          this.experiences = experiences;
        }
      );
  }

  showForm() {
    this.formExperienceConfig.showForm = !this.formExperienceConfig.showForm;
  }

  addExperience(experience: Experience) {
    // Check if new experience or update existing experience
    // If experience.id is null, then it is a new experience
    // Uso != ya que null != undefined es false
    this.experienceService.addExperience(experience).subscribe(experience => {
      this.experiences.push(experience);
    });
  }

  updateExperience(experience: Experience) {
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

  deleteExperience(experience: Experience) {
    this.experienceService.deleteExperience(experience).subscribe(() => {
      this.experiences = this.experiences.filter(t => t.id !== experience.id);
    });
  }

  editExperience(experience: Experience) {
    // Envio el objeto experience al servicio para que lo pueda editar
    // y lo muestre en el formulario
    this.formExperienceConfig = {showForm: true, experienceIsNew: false};
    this.uiEditFormService.toggleEdit(experience);
    
    window.scrollTo(0, 0);
  }

}
