import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Experience} from '../interfaces/Experience';
import { DatePicker } from '../interfaces/DatePicker';

import { UiEditFormService } from 'src/app/service/uiEditForm.service';
import { FormExperience } from '../interfaces/FormExperience';


const datePickerClear = <DatePicker> {disable: false, dateToSet: '', minDate: '', maxDate: '', disableRangeSelector: false};

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent{
  @Input() formConfig: {showForm: boolean, experienceIsNew: boolean} = {showForm: false, experienceIsNew: true};
  @Input() formExperience?: FormExperience;
  @Output() onAddExperience: EventEmitter<Experience> = new EventEmitter();
  @Output() onUpdateExperience: EventEmitter<Experience> = new EventEmitter();

  initialDateSettings: DatePicker = datePickerClear;
  finalDateSettings: DatePicker = datePickerClear;
  form: FormGroup;

  constructor(private uiEditFormService: UiEditFormService, private fb : FormBuilder) {
    this.form = this.fb.group({
      id: [''],
      primaryInfo: ['', Validators.required],
      secondaryInfo: ['', Validators.required],
      initialDate: ['', Validators.required],
      finalDate: ['', Validators.required],
      presentDate: [false],
      description: ['', Validators.required],
      link: ['']
    });
    this.uiEditFormService.onToggle().subscribe(experience => {
      // Se ejecuta cuando se hace click en el boton de editar 
      // y carga los datos del objeto experience en el formulario
      // se puede usar setvalue si experience tuviera todos los campos del formulario
      this.form.patchValue(experience);
      this.setUpDate(experience);
    
    });
  }

  private setUpDate(experience: any) {
    if (experience.finalDate === null) {
      this.finalDateSettings = { ...datePickerClear, dateToSet: experience.finalDate, minDate: experience.initialDate, disable: true };
      this.form.controls['presentDate'].setValue(true);
    } else {
      this.finalDateSettings = { ...datePickerClear, dateToSet: experience.finalDate, minDate: experience.initialDate };
      this.form.controls['presentDate'].setValue(false);
    }
    // Se envia a los date picker la fecha inicial y final
    this.initialDateSettings = { ...datePickerClear, dateToSet: experience.initialDate, maxDate: experience.finalDate };
  }

  setInitialControlDate(controlDate: FormControl<any>): void {
    // El dato emitido por el date picker es un objeto de tipo FormControl
    this.form.setControl('initialDate', controlDate);
    this.initialDateSettings = {...this.initialDateSettings, dateToSet: controlDate.value};
    this.finalDateSettings = {...this.finalDateSettings, minDate: controlDate.value};
  }

  setFinalControlDate(controlDate: FormControl<any>): void {
    this.form.setControl('finalDate', controlDate);
    this.initialDateSettings = {...this.initialDateSettings, maxDate: controlDate.value};
    this.finalDateSettings = {...this.finalDateSettings, dateToSet: controlDate.value};
  }

  setPresentDate(checkBox: any): void {
    if(checkBox.checked) {
      this.finalDateSettings = {...this.finalDateSettings, disable: true};
      // EL get me devuelve el form control de finalDate, quedando el campo finalDate undefined.
      // mas adelante en onSubmit() el finalDate vuelve a tomar el valor que tenia antes de ser undefined
      // no se porque pasa esto, genera error si envia en el string onSubmit() ya que tiene los validadores
      // del datepicker que lo toman como invalido
      // genera un warinig en la consola de las dos formas
/*       this.form.get('finalDate')?.setValue('0000-00-00'); */
/*       this.form.controls['finalDate'].setValue('0000-00-00'); */
      return;
    }
    this.finalDateSettings = {...this.finalDateSettings, disable: false};
  }

  onSubmit(): void {
    this.validateForm();

    const experience = this.setUpExperience()
    
    this.emitExperience(experience);

    this.resetForm();
  }

  private emitExperience(experience: Experience) {
    if (!this.formConfig.experienceIsNew) {
      this.onUpdateExperience.emit(experience);
      // Emite el evento onUpdateExperience al componente padre (experience-and-education.component.ts)
    } else {
      this.onAddExperience.emit(experience);
      // Emite el evento onAddExperience al componente padre (experience-and-education.component.ts)
    }
  }

  private validateForm(): void {
    if(this.form.value.presentDate) {
      this.form.controls['finalDate'].setValue(null);
      this.form.controls['finalDate'].setErrors(null);
    }
    if(!this.form.valid) {  
      alert('Por favor, llenar todos los campos');
      return;
    }
  }

  private setUpExperience() {
    return <Experience>{
      // El id se envia un string vacio que queda como undefined ya que deberia ser un numero
      // despues el backend le asigna un id automaticamente
      id: this.form.value.id,
      primaryInfo: this.form.value.primaryInfo,
      secondaryInfo: this.form.value.secondaryInfo,
      initialDate: this.formatDate(this.form.value.initialDate),
      finalDate: this.formatDate(this.form.value.finalDate),
      description: this.form.value.description,
      link: this.form.value.link
      // Se envia en el formato YYYY-MM para que la pipe date lo pueda interpretar
    };
  }

  private formatDate(aDate: any): string{
    return (typeof (aDate === 'string' || aDate === null) ? aDate : aDate.format('YYYY-MM-DD'));
  }

  private resetForm() {
    // Se resetea el formulario y los date picker
    this.formConfig.experienceIsNew = true;
    this.finalDateSettings = datePickerClear;
    this.initialDateSettings = datePickerClear;
    // this.form.setControl('finalDate', new FormControl('', Validators.required));
    this.form.reset();

  }

}
