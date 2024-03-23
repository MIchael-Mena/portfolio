import {LOCALE_ID, NgModule} from "@angular/core";
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {MAT_DATE_FORMATS} from '@angular/material/core';

registerLocaleData(localeEs, 'es');

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule(
  {
    providers: [
      {provide: LOCALE_ID, useValue: 'es'},
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
  }
)
export class DateLanguageModule {
}
