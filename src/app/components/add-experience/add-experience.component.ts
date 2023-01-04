import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Experience } from '../Experience';

import { UiEditFormService } from 'src/app/service/uiEditForm.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {
  @Input() showForm: boolean = false;
  /*   @Input() experenceToEdit?: Experience; */
  /* @Input() experenceToEdit = {primaryInfo: '', secondaryInfo: '', date: '', description: '', link: ''} as Experience; */
  
  @Input() formForTypeOfExperience: string = '';
  @Output() onAddExperience: EventEmitter<Experience> = new EventEmitter();

  experienceToEdit?: Experience;

  typeOfForm = { primaryInfo: 'Informacion primaria', secondaryInfo: 'informacion secundaria' };

  form: FormGroup;

/*   primaryInfoControl: FormControl = new FormControl('', Validators.required);
  secondaryInfoControl: FormControl = new FormControl('', Validators.required);
  dateControl: FormControl = new FormControl('', Validators.required);
  descriptionControl: FormControl = new FormControl('', Validators.required);
  linkControl: string = ''; */

  

  constructor(private uiEditFormService: UiEditFormService, private fb : FormBuilder) {
    this.form = this.fb.group({
      primaryInfo: ['', Validators.required],
      secondaryInfo: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      link: ['']
    });

    this.uiEditFormService.onToggle().subscribe(experience => this.form.get('primaryInfo')?.setValue(experience.primaryInfo));

    /* this.uiEditFormService.onToggle().subscribe(experience => this.experienceToEdit = experience); */
  }

  ngOnInit(): void {
    if (this.formForTypeOfExperience === 'work') {
      this.typeOfForm = {
        primaryInfo: 'Cargo',
        secondaryInfo: 'Empresa',
      }
    } if (this.formForTypeOfExperience === 'education') {
      this.typeOfForm = {
        primaryInfo: 'Titulo',
        secondaryInfo: 'Institucion',
      }
    }
  }

  onSubmit() {
/*     if (!this.primaryInfoControl.valid || !this.secondaryInfoControl.valid || !this.dateControl.valid || !this.descriptionControl.valid) {
      alert('Por favor, llenar todos los campos');
      return;
    } */
    if(!this.form.valid) {
      alert('Por favor, llenar todos los campos');
      return;
    }

/*     const experience = {
      primaryInfo: this.primaryInfoControl.value,
      secondaryInfo: this.secondaryInfoControl.value,
      date: this.dateControl.value,
      description: this.descriptionControl.value,
      link: this.linkControl
    } */

    const experience = {
      primaryInfo: this.form.value.primaryInfo,
      secondaryInfo: this.form.value.secondaryInfo,
      date: this.form.value.date,
      description: this.form.value.description,
      link: this.form.value.link
    }

    this.onAddExperience.emit(experience);
  }


}
