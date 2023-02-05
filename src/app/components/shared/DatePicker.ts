export interface DatePicker{
    disable: boolean,
    dateToSet: any,
    // disableRangeSelector si esta en true desactiva el rango de fechas
    // seleccionables del datepicker
    disableRangeSelector: boolean,
    // si disableRangeSelector: true, max y min son el rango de fecha permitido para mostrar 
    // en el datepicker y para los validadores.
    // si disableRangeSelector: false, max y min son solo el rango de fecha permitido para los validadores
    minDate: any, 
    maxDate: any,
}