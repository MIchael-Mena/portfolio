import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Experience} from '../interfaces/Experience';
import { DatePicker } from '../interfaces/DatePicker';

import { UiEditFormService } from 'src/app/service/uiEditForm.service';

const datePickerClear = <DatePicker> {disabled: false, dateToSet: '', minDate: '', maxDate: '', disableRangeSelector: false};

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {
  @Input() formConfig: {showForm: boolean, experienceIsNew: boolean} = {showForm: false, experienceIsNew: true};
  @Input() formForTypeOfExperience: string = '';
  @Output() onAddExperience: EventEmitter<Experience> = new EventEmitter();
  @Output() onUpdateExperience: EventEmitter<Experience> = new EventEmitter();

  resetPicker: Boolean = false;

  initialDateSettings: DatePicker = datePickerClear;
  finalDateSettings: DatePicker = datePickerClear;
  typeOfForm = { primaryInfo: 'Informacion primaria', secondaryInfo: 'informacion secundaria' };
  form: FormGroup;

  constructor(private uiEditFormService: UiEditFormService, private fb : FormBuilder) {
/*     if(this.formConfig.experienceIsNew) {
      this.finalDateSettings = {...datePickerClear, disabled: true};
    } */

    this.form = this.fb.group({
      id: [''],
      primaryInfo: ['', Validators.required],
      secondaryInfo: ['', Validators.required],
      initialDate: ['', Validators.required],
      finalDate: ['', Validators.required],
      description: ['', Validators.required],
      link: ['']
    });

    this.uiEditFormService.onToggle().subscribe(experience => {
      // Se ejecuta cuando se hace click en el boton de editar 
      // y carga los datos del objeto experience en el formulario
      this.form.setValue(experience);
      // Se envia a los date picker la fecha inicial y final
      this.finalDateSettings = {...datePickerClear ,dateToSet: experience.finalDate, minDate: experience.initialDate};
      this.initialDateSettings = {...datePickerClear, dateToSet: experience.initialDate, maxDate: experience.finalDate};
    });
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

  onSubmit(): void {
    if(!this.form.valid) {
      alert('Por favor, llenar todos los campos');
      return;
    }
    
    const experience = <Experience> {
      // El id se envia un string vacio que queda como undefined ya que deberia ser un numero
      // despues el backend le asigna un id automaticamente
      id: this.form.value.id,
      primaryInfo: this.form.value.primaryInfo,
      secondaryInfo: this.form.value.secondaryInfo,
      // Si el primer valor no es un string, se envia el segundo valor
      initialDate: this.formatDate(this.form.value.initialDate),
      finalDate: this.formatDate(this.form.value.finalDate),
/*       initialDate: this.form.value.initialDate || this.form.value.initialDate.format('YYYY-MM-DD'),
      finalDate: this.form.value.finalDate || this.form.value.finalDate.format('YYYY-MM-DD'), */
      description: this.form.value.description,
      link: this.form.value.link
    }
    // Se envia en el formato YYYY-MM para que la pipe date lo pueda interpretar

    if (!this.formConfig.experienceIsNew) {
      this.onUpdateExperience.emit(experience);
      // Emite el evento onUpdateExperience al componente padre (experience-and-education.component.ts)
    } else {
      this.onAddExperience.emit(experience);
      // Emite el evento onAddExperience al componente padre (experience-and-education.component.ts)
    }
    this.resetForm();
  }

  private formatDate(aDate: any): string{
    return (typeof aDate === 'string' ? aDate : aDate.format('YYYY-MM-DD'));
/*     if(typeof aDate === 'string') {
      return aDate;
    }else{
      return aDate.format('YYYY-MM-DD');
    } */
  }

  private resetForm() {
    // Se resetea el formulario y los date picker
    this.formConfig.experienceIsNew = true;
    this.finalDateSettings = datePickerClear;
    this.initialDateSettings = datePickerClear;
    this.form.reset();
  }

  setControlDate( controlDate: FormControl<any>, dateName : string): void {
    this.form.setControl(dateName, controlDate);
    if(dateName === 'initialDate') {
      this.initialDateSettings = {...this.initialDateSettings, dateToSet: controlDate.value};
      this.finalDateSettings = {...this.finalDateSettings,minDate: controlDate.value};
    }
    if(dateName === 'finalDate') {
      this.finalDateSettings = {...this.finalDateSettings, dateToSet: controlDate.value};
      this.initialDateSettings = {...this.initialDateSettings, maxDate: controlDate.value};
    }
    console.log(this.form.value);
    console.log(this.form.value[dateName].format('MM-YYYY') + ' setControlDate');
  }


}
