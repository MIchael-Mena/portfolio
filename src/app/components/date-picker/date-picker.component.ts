import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

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
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [ { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class DatePickerComponent {
  @Input() dateSettings?: {dateToSet: string, minDate: string, maxDate: string};
  @Output() onDateChange: EventEmitter<FormControl> = new EventEmitter();

  minDate?: Moment;
  maxDate?: Moment;
  private dateValidators = [Validators.required, this.datePickerRangeValidator()];
  date: FormControl<any> = new FormControl('', this.dateValidators);

  constructor() {
    const currentYear = moment().year();
    this.minDate = moment([currentYear - 50, 0, 1]);
    this.maxDate = moment([currentYear + 0, 0, 31]);
  }

  ngOnChanges(): void {
    // Se ejecuta cuando se cambia el valor de un input
    if(this.dateSettings?.dateToSet){
      const [year, month] = this.dateSettings.dateToSet.split('-');
      this.date.setValue(moment([parseInt(year), parseInt(month) - 1 , 1]));
      // moment tambien acepta string como parametro
    }
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    if(this.date.invalid) {
      this.date.setValue(moment());
    }
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    this.onDateChange.emit(this.date);
  }

  private datePickerRangeValidator() {
    return (control: FormControl): {[key: string]: any} | null => {
      const date = control.value;
      if (date) {
        const dateMoment = moment(date);
        if (dateMoment.isBefore(this.minDate) || dateMoment.isAfter(this.maxDate)) {
          return { 'matDatepickerRange': true };
        }
      }
      return null;
    };
  }

  onClickeable() {
/*     console.log(this.date.value!.format('YYYY-MM')); */
    console.log(this.date.valid);
    console.log("Rango de fecha es invalido: " + this.date.getError('matDatepickerRange'));
/*     console.log("Fecha min es invalida: " + this.date.hasError('matDatepickerMin'));
    console.log("Fecha max es invalida:" + this.date.hasError('matDatepickerMax'));
    console.log("Formato de fecha es invalido: " + this.date.hasError('matDatepickerParse')); */
  }
}
