import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// @ts-ignore
import { default as _rollupMoment, Moment } from 'moment';
import { DatePicker } from './DatePicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM-YYYY',
  },
  display: {
    dateInput: 'MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MomentDateModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class DatePickerComponent {
  @Input() dateSettings?: DatePicker;
  @Output() onDateChange: EventEmitter<FormControl> = new EventEmitter();

  minDateValid?: Moment;
  maxDateValid?: Moment;

  private dateValidators = [
    Validators.required,
    this.minDateValidator(),
    this.maxDateValidator(),
  ];
  date: FormControl<any>;
  /*   date: FormControl<any> = new FormControl('', this.dateValidators); */

  /*   date: FormControl<any> = new FormControl({value:'', disabled: false}, this.dateValidators); */

  constructor() {
    this.date = new FormControl(
      { value: '', disabled: false },
      this.dateValidators
    );
    this.setMinDate();
    this.setMaxDate();
  }

  ngOnChanges(): void {
    // Se ejecuta cuando se cambia el valor con el decorador Input()
    if (this.dateSettings?.disable) {
      this.date.disable();
    } else {
      this.date.enable();
    }

    if (this.dateSettings?.dateToSet) {
      if (typeof this.dateSettings.dateToSet === 'string') {
        this.date.setValue(this.stringToMoment(this.dateSettings.dateToSet));
      } else {
        // Si es un objeto moment
        this.date.setValue(this.dateSettings.dateToSet);
      }
    } else {
      // si es un null o undefined o ''
      this.date.setValue('');
    }

    if (this.dateSettings?.minDate) {
      if (typeof this.dateSettings.minDate === 'string') {
        this.minDateValid = this.stringToMoment(this.dateSettings.minDate);
      } else {
        // Si es un objeto moment
        this.minDateValid = moment(this.dateSettings.minDate._d);
      }
    } else {
      this.setMinDate();
    }

    if (this.dateSettings?.maxDate) {
      if (typeof this.dateSettings.maxDate === 'string') {
        this.maxDateValid = this.stringToMoment(this.dateSettings.maxDate);
      } else {
        // Si es un objeto moment
        this.maxDateValid = moment(this.dateSettings.maxDate._d);
      }
    } else {
      this.setMaxDate();
    }
  }

  changeDateInput(aDate: any) {
    // Se ejecuta cuando se cambia el valor del input, aDate.value es un moment
    if (aDate.value) {
      this.emitDate(aDate.value);
    } else {
      // Si aDate.value es null
      this.emitDate('');
    }
  }

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    if (this.date.invalid) {
      // Si date no tiene un momento le asigno el moment actual
      this.date.setValue(moment());
    }
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    datepicker.close();

    this.emitDate(ctrlValue);
  }

  private emitDate(aDate: Moment | string) {
    this.date.setValue(aDate);
    this.onDateChange.emit(this.date);
  }

  private minDateValidator() {
    // Si es undefined, no se valida
    return (control: FormControl): { [key: string]: any } | null => {
      const date = control.value;
      if (date && this.minDateValid) {
        // Entra si tengo algo en date y tengo una fecha minima valida
        const dateMoment = moment(date);
        if (dateMoment.isBefore(this.minDateValid)) {
          // Si entra es porque la fecha es menor a la fecha minima
          return { matDatepickerMinInvalid: true };
        }
      }
      return null;
    };
  }

  private maxDateValidator() {
    return (control: FormControl): { [key: string]: any } | null => {
      const date = control.value;
      if (date && this.maxDateValid) {
        const dateMoment = moment(date);
        if (dateMoment.isAfter(this.maxDateValid)) {
          return { matDatepickerMaxInvalid: true };
        }
      }
      return null;
    };
  }

  private setMinDate() {
    this.minDateValid = moment([1993, 0, 1]);
  }

  private setMaxDate() {
    this.maxDateValid = moment([
      moment().year(),
      moment().month(),
      moment().date(),
    ]);
  }

  private stringToMoment(aDate: string): Moment {
    // Se espera un string con formato YYYY-MM
    const [year, month] = aDate.split('-');
    // moment tambien acepta string como parametro
    return moment([parseInt(year), parseInt(month) - 1, 1]);
  }
}
