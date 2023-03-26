import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ExperienceData} from '../ExperienceData';
import {DatePicker} from '../../shared/date-picker/DatePicker';
import {MatDialog} from '@angular/material/dialog';

import {UiEditFormService} from 'src/app/components/experience/service/uiEditForm.service';
import {FormExperience} from '../FormExperience';
import {DialogCardComponent} from "../../dialog-card/dialog-card.component";
import {DialogContent} from "../../dialog-card/DialogContent";
import {UnsavedChangesService} from "../../../service/unsaved-changes.service";
import {ExperienceService} from "../service/experience.service";
import {ButtonSettings} from "../../shared/button-confirm/ButtonSettings";
import {WorkData} from "../WorkData";
import {EducationData} from "../EducationData";


const datePickerClean = <DatePicker>{
  disable: false,
  dateToSet: '',
  minDate: '',
  maxDate: '',
  disableRangeSelector: false
};

const buttonSettingsAdd: ButtonSettings = {
  onConfirmText: 'Agregar',
  onWaitingText: 'Agregando...'
}

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnChanges {
  @Input() formSettings: { showForm: boolean, experienceIsNew: boolean } = {
    showForm: false,
    experienceIsNew: true,
  };
  @Input() formExperience?: FormExperience;
  @Output() onAddExperience: EventEmitter<ExperienceData> = new EventEmitter();
  @Output() onUpdateExperience: EventEmitter<ExperienceData> = new EventEmitter();
  public buttonSettings: ButtonSettings = buttonSettingsAdd;
  public formIsVisible: boolean = false;
  public initialDateSettings: DatePicker = datePickerClean;
  public finalDateSettings: DatePicker = datePickerClean;
  public form: FormGroup;
  public isLoading: boolean = false;

  constructor(private uiEditFormService: UiEditFormService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private unsavedChangesService: UnsavedChangesService,
              private experienceService: ExperienceService) {
    this.form = this.getFormGroup();
    this.onToggleEdit();
    this.unsavedChangesService.onDismissChanges().subscribe(setFormState => {
      setFormState(this.formIsEmpty(), this.formExperience?.name);
    });
  }

  private onToggleEdit() {
    this.uiEditFormService.onToggle().subscribe((experience: ExperienceData) => {
      // Se ejecuta cuando se hace click en el botón de editar
      // y carga los datos del objeto experience en el formulario
      // se puede usar set-value si experience tuviera todos los campos del formulario (No está presentDate)
      this.buttonSettings = {
        onConfirmText: 'Actualizar',
        onWaitingText: 'Actualizando...'
      }
      this.form.patchValue(experience);
      this.form.markAsDirty()
      this.setDate(experience);
    });
  }

  private getFormGroup(): FormGroup {
    return this.fb.group({
      id: [''],
      primaryInfo: ['', Validators.required],
      secondaryInfo: ['', Validators.required],
      initialDate: ['', Validators.required],
      finalDate: ['', Validators.required],
      presentDate: [false],
      description: ['', [Validators.maxLength(400)]],
      link: [''],
      position: [0],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Se ejecuta cuando cambia el valor de un input (si hace click en el botón de agregar)
    // solo si se cambia el objeto del input al que hace tiene como referencia por otro
    const {showForm} = changes['formSettings'].currentValue;
    this.verifyFormVisibility(showForm);
  }

  private formIsEmpty(): boolean {
    return Object.values(this.form.controls).every(control => {
      if (control.value === false || typeof control.value === "number") {
        // presentDate es un booleano y no me sirve compararlo con ''
        return true;
      }
      return control.value === '' || control.value === null;
    });
  }

  private verifyFormVisibility(showForm: boolean): void {
    if (!showForm && this.form.dirty) {
      // No uso pristine porque si el usuario escribe algo y luego lo borra el form sigue siendo dirty
      if (this.formIsEmpty()) {
        this.setFormState(showForm);
      } else {
        // Aca no cambien el objeto del input al que hace referencia el componente
        // solo cambien el valor de una de sus propiedades, por lo tanto, no se ejecuta ngOnChanges
        // lo coloco en true, ya que todavía no sé la elección del usuario y la ngClass en el componente
        // padre hace referencia a este valor para cambiar el estilo del botón agregar
        this.formSettings.showForm = true;
        this.OpenDiscardChangesDialog();
      }
    } else {
      this.setFormState(showForm);
    }
  }

  private setFormState(showForm: boolean) {
    this.formIsVisible = showForm;
    this.form.markAsUntouched()
  }

  private OpenDiscardChangesDialog(): void {
    const [enterAnimationDuration, exitAnimationDuration] = [200, 200];
    const data = <DialogContent>{
      title: 'Descartar cambios',
      message: `Tienes cambios sin guardar en el formulario.
                <br>
                ¿Quieres descartar los cambios?`,
    }
    const dialogRef = this.dialog.open(DialogCardComponent, {
      width: '400px',
      data,
      enterAnimationDuration,
      exitAnimationDuration
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formIsVisible = false;
        this.formSettings.showForm = false;
        this.resetForm();
      } else {
        this.formIsVisible = true;
      }
    });
  }

  private setDate(experience: any): void {
    if (experience.finalDate === null) {
      this.finalDateSettings = {
        ...datePickerClean,
        dateToSet: experience.finalDate,
        minDate: experience.initialDate,
        disable: true
      };
      this.form.controls['presentDate'].setValue(true);
    } else {
      this.finalDateSettings = {...datePickerClean, dateToSet: experience.finalDate, minDate: experience.initialDate};
      this.form.controls['presentDate'].setValue(false);
    }
    // Se envía al date-picker la fecha inicial y final
    this.initialDateSettings = {...datePickerClean, dateToSet: experience.initialDate, maxDate: experience.finalDate};
  }

  public setInitialControlDate(controlDate: FormControl<any>): void {
    // TODO: mejorar la forma de setear el valor del control
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
    this.isLoading = true;
    const experience = this.setupExperience();
    this.chooseTypeOfSubmit(experience);
  }

  private chooseTypeOfSubmit(experience: ExperienceData): void {
    if (this.formSettings.experienceIsNew) {
      this.addExperience(experience);
    } else {
      this.updateExperience(experience);
    }
  }

  private updateExperience(experience: ExperienceData): void {
    const anExperience = this.formExperience!.reverseParseFromExperienceData(experience)
    this.experienceService.updateExperience(anExperience).subscribe({
      next: (response) => {
        // Emite el evento onUpdateExperience al componente padre (experience-and-education.component.ts)
        this.isLoading = false;
        this.onUpdateExperience.emit(experience);
        this.resetForm();
      },
      error: (error: any) => {
        this.isLoading = false;
        alert('Error al actualizar la experiencia');
      }
    });
  }

  private addExperience(experience: ExperienceData): void {
    const anExperience = this.formExperience!.reverseParseFromExperienceData(experience)
    this.experienceService.addExperience(anExperience).subscribe({
      next: (response: WorkData | EducationData) => {
        // Emite el evento onAddExperience al componente padre (experience-and-education.component.ts)
        this.isLoading = false;
        this.onAddExperience.emit(this.formExperience!.parseToExperienceData(response));
        this.resetForm();
      },
      error: (error: any) => {
        this.isLoading = false;
        alert('Error al agregar la experiencia');
      }
    });
  }

  private validateForm(): boolean {
    console.log(this.form.controls)
    if (this.form.value.presentDate) {
      this.form.controls['finalDate'].setValue(null);
      this.form.controls['finalDate'].setErrors(null);
    }
    return !this.form.valid;
  }

  private setupExperience(): ExperienceData {
    return <ExperienceData>{
      // El id se envía un string vació, después el backend le asigna un id
      id: this.form.value.id,
      primaryInfo: this.form.value.primaryInfo,
      secondaryInfo: this.form.value.secondaryInfo,
      initialDate: this.formatDate(this.form.value.initialDate),
      finalDate: this.formatDate(this.form.value.finalDate),
      description: this.form.value.description,
      link: this.form.value.link,
      position: this.form.value.position,
      // Se envía en el formato YYYY-MM para que la pipe date lo pueda interpretar
    };
  }

  private formatDate(aDate: any): string {
    return ((typeof aDate) === 'string' || aDate === null) ? aDate : aDate.format('YYYY-MM-DD');
  }

  private resetForm(): void {
    // Se resetea el formulario y los date picker
    this.formSettings.experienceIsNew = true;
    this.buttonSettings = buttonSettingsAdd;
    this.finalDateSettings = datePickerClean;
    this.initialDateSettings = datePickerClean;
    // this.form.setControl('finalDate', new FormControl('', Validators.required));
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setErrors(null);
    });
    // TODO: el date picker queda en color rojo después de resetear el formulario
  }

}
