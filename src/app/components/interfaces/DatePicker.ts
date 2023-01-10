export interface DatePicker{
    disabled: boolean,
    dateToSet: string, 
    // disableRangeSelector si esta en true desactiva el rango de fechas
    // seleccionables del datepicker
    disableRangeSelector: boolean,
        // maxi y min valor que se puede seleccionar en el datepicker
    // debe ser del tipo moment
    minDate: any, 
    maxDate: any,
}