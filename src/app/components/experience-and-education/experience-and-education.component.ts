import { Component, OnInit } from '@angular/core';
import { ExperienceService } from 'src/app/service/experience.service';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Experience } from 'src/app/components/Experience';

import { UiEditFormService } from 'src/app/service/uiEditForm.service';

@Component({
  selector: 'app-experience-and-education',
  templateUrl: './experience-and-education.component.html',
  styleUrls: ['./experience-and-education.component.css']
})  
export class ExperienceAndEducationComponent implements OnInit {
  faSquarePlus = faSquarePlus;
/*   anExperenceToEdit: Experience = {primaryInfo: '', secondaryInfo: '', date: '', description: '', link: ''}; */
  experiences: Experience[] = [];
  showAddExperience: boolean = false;
  typeExperience: string = 'work';

  constructor(private experienceService: ExperienceService, private uiEditFormService : UiEditFormService) {
  }

  ngOnInit(): void {
    this.experienceService.getExperiences().subscribe(experiences => {
          this.experiences = experiences;
        }
      );
  }

  showForm() {
    this.showAddExperience = !this.showAddExperience;
  }

  addExperience(experience: Experience) {
    this.experienceService.addExperience(experience).subscribe(experience => {
      this.experiences.push(experience);
    });
  }

  deleteExperience(experience: Experience) {
    this.experienceService.deleteExperience(experience).subscribe(() => {
      this.experiences = this.experiences.filter(t => t.id !== experience.id);
    });
  }

  editExperience(experience: Experience) {
    this.showAddExperience = true;
    this.uiEditFormService.toggleEdit(experience);
    /* this.anExperenceToEdit = experience; */
  }

}
