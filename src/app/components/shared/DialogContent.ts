import {Observable} from "rxjs";

export interface DialogContent {
  payload?: () => Observable<any>;
  title: string;
  message: string;

  buttonCancel?: string;

  buttonAccept?: string;
}
