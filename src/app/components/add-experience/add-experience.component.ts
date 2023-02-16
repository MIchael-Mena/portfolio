import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ExperienceData} from '../shared/ExperienceData';
import {DatePicker} from '../shared/DatePicker';
import {MatDialog} from '@angular/material/dialog';

import {UiEditFormService} from 'src/app/service/uiEditForm.service';
import {FormExperience} from '../shared/FormExperience';
import {DialogCardComponent} from "../dialog-card/dialog-card.component";
import {DialogContent} from "../shared/DialogContent";
import {UnsavedChangesService} from "../../service/unsaved-changes.service";


const datePickerClear = <DatePicker>{
  disable: false,
  dateToSet: '',
  minDate: '',
  maxDate: '',
  disableRangeSelector: false
};

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnChanges {
  @Input() formConfig: { showForm: boolean, experienceIsNew: boolean } = {
    showForm: false,
    experienceIsNew: true,
  };
  @Input() formExperience?: FormExperience;
  @Output() onAddExperience: EventEmitter<ExperienceData> = new EventEmitter();
  @Output() onUpdateExperience: EventEmitter<ExperienceData> = new EventEmitter();
  formIsAvailable: boolean = false;

  initialDateSettings: DatePicker = datePickerClear;
  finalDateSettings: DatePicker = datePickerClear;
  form: FormGroup;

  constructor(private uiEditFormService: UiEditFormService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private unsavedChangesService: UnsavedChangesService) {
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
    this.uiEditFormService.onToggle().subscribe((experience: ExperienceData) => {
      // Se ejecuta cuando se hace click en el boton de editar
      // y carga los datos del objeto experience en el formulario
      // se puede usar setvalue si experience tuviera todos los campos del formulario
      this.form.patchValue(experience);
      this.form.markAsDirty()
      this.setUpDate(experience);
    });
    this.unsavedChangesService.onDismissChanges().subscribe(setFormState => {
      setFormState(this.form.pristine, this.formExperience?.name);
      /*      console.log(this.formExperience?.name + ' formIsEmpty: ' + this.formIsEmpty());
            console.log(this.form.controls);*/
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Se ejecuta cuando cambia el valor de un input (si hace click en el boton de agregar)
    // solo si se cambia el objeto del input al que hace tiene como referencia por otro
    const {showForm} = changes['formConfig'].currentValue;
    this.verifyFormVisibility(showForm);
  }

  private verifyFormVisibility(showForm: boolean): void {
    if (!showForm && this.form.dirty) {
      if (this.form.pristine) {
        this.formIsAvailable = showForm;
      } else {
        // Aca no cambien el objeto del input al que hace referencia el componente
        // solo cambien el valor de una de sus propiedades, por lo tanto no se ejecuta ngOnChanges
        // lo coloco en true ya que todabia no se la eleccion del usuario y la ngClass en el componente
        // padre hace referencia a este valor para cambiar el estilo del boton agregar
        this.formConfig.showForm = true;
        this.OpenDiscardChangesDialog();
      }
    } else {
      this.formIsAvailable = showForm;
    }
  }

  private OpenDiscardChangesDialog(): void {
    const [enterAnimationDuration, exitAnimationDuration] = [200, 100];
    const data = <DialogContent>{
      title: 'Descartar cambios',
      message: 'Perderás todos los cambios realizados en el formulario.\n' +
        '¿Estás seguro de que quieres descartar los cambios?',
    }
    const dialogRef = this.dialog.open(DialogCardComponent, {
      width: '450px',
      data,
      enterAnimationDuration,
      exitAnimationDuration
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formIsAvailable = false;
        this.formConfig.showForm = false;
        this.resetForm();
      } else {
        this.formIsAvailable = true;
      }
    });
  }

  private setUpDate(experience: any): void {
    if (experience.finalDate === null) {
      this.finalDateSettings = {
        ...datePickerClear,
        dateToSet: experience.finalDate,
        minDate: experience.initialDate,
        disable: true
      };
      this.form.controls['presentDate'].setValue(true);
    } else {
      this.finalDateSettings = {...datePickerClear, dateToSet: experience.finalDate, minDate: experience.initialDate};
      this.form.controls['presentDate'].setValue(false);
    }
    // Se envia a los date picker la fecha inicial y final
    this.initialDateSettings = {...datePickerClear, dateToSet: experience.initialDate, maxDate: experience.finalDate};
  }

  public setInitialControlDate(controlDate: FormControl<any>): void {
    // El dato emitido por el date picker es un objeto de tipo FormControl
    this.form.setControl('initialDate', controlDate);
    this.initialDateSettings = {...this.initialDateSettings, dateToSet: controlDate.value};
    this.finalDateSettings = {...this.finalDateSettings, minDate: controlDate.value};
  }

  public setFinalControlDate(controlDate: FormControl<any>): void {
    this.form.setControl('finalDate', controlDate);
    this.initialDateSettings = {...this.initialDateSettings, maxDate: controlDate.value};
    this.finalDateSettings = {...this.finalDateSettings, dateToSet: controlDate.value};
  }

  public setPresentDate(checkBox: any): void {
    if (checkBox.checked) {
      this.finalDateSettings = {...this.finalDateSettings, disable: true};
      return;
    }
    this.finalDateSettings = {...this.finalDateSettings, disable: false};
  }

  public onSubmit(): void {
    if (this.validateForm()) {
      alert('Por favor, llenar todos los campos');
      return;
    }
    const experience = this.setUpExperience()
    this.emitExperience(experience);
    this.resetForm();
  }

  private emitExperience(experience: ExperienceData): void {
    if (!this.formConfig.experienceIsNew) {
      this.onUpdateExperience.emit(experience);
      // Emite el evento onUpdateExperience al componente padre (experience-and-education.component.ts)
    } else {
      this.onAddExperience.emit(experience);
      // Emite el evento onAddExperience al componente padre (experience-and-education.component.ts)
    }
  }

  private validateForm(): boolean {
    if (this.form.value.presentDate) {
      this.form.controls['finalDate'].setValue(null);
      this.form.controls['finalDate'].setErrors(null);
    }
    return !this.form.valid;
  }

  private setUpExperience(): ExperienceData {
    return <ExperienceData>{
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

  private formatDate(aDate: any): string {
    return (typeof (aDate === 'string' || aDate === null) ? aDate : aDate.format('YYYY-MM-DD'));
  }

  private resetForm(): void {
    // Se resetea el formulario y los date picker
    this.formConfig.experienceIsNew = true;
    this.finalDateSettings = datePickerClear;
    this.initialDateSettings = datePickerClear;
    // this.form.setControl('finalDate', new FormControl('', Validators.required));
    this.form.reset();
  }

}
