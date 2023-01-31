import {Component, Input, OnInit} from '@angular/core';
import {ExperienceService} from 'src/app/service/experience.service';
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import {ExperienceData} from 'src/app/components/interfaces/ExperienceData';

import {UiEditFormService} from 'src/app/service/uiEditForm.service';
import {Experience} from '../interfaces/Experience';
import {FormExperience} from '../interfaces/FormExperience';
import {StorageSessionService} from "../../service/storage-session.service";

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
  // Cada instancia de este componente tendrá su propio servicio
  providers: [UiEditFormService, ExperienceService]
})
export class ExperiencesComponent implements OnInit {
  faSquarePlus = faSquarePlus;
  public isLoggedIn: boolean = false;
  public experiences: ExperienceData[] = [];
  public formExperienceConfig: { showForm: boolean, experienceIsNew: boolean } = {
    showForm: false,
    experienceIsNew: true
  };

  public formExperience?: FormExperience;
  @Input() experience?: Experience;

  constructor(private experienceService: ExperienceService,
              private uiEditFormService: UiEditFormService,
              public storageService: StorageSessionService) {
    this.storageService.onToggleSignUp().subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
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
    this.experienceService.addExperience(experience, this.storageService.tokenValue).subscribe(experience => {
      this.experiences.push(experience);
    });
  }

  updateExperience(experience: ExperienceData) {
    this.experienceService.updateExperience(experience, this.storageService.tokenValue).subscribe(() => {
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
    this.experienceService.deleteExperience(experience, this.storageService.tokenValue).subscribe(() => {
      this.experiences = this.experiences.filter(t => t.id !== experience.id);
    });
  }

  editExperience(experience: ExperienceData, element: HTMLElement) {
    // Envío el objeto experience al servicio, y es recibido por add-experience
    // que está subscrito al servicio. Para que lo pueda carga en el formulario
    this.formExperienceConfig = {showForm: true, experienceIsNew: false};
    this.uiEditFormService.toggleEdit(experience);

    element.scrollIntoView({behavior: "smooth"});

    /*    const routerOption: ExtraOptions = {
          scrollPositionRestoration: 'enabled',
          anchorScrolling: 'enabled',
          onSameUrlNavigation: 'reload',
        }

        this.router.navigate([], {fragment: element.id, ...routerOption});*/

    // window.scrollTo(0, 0);
  }

}
