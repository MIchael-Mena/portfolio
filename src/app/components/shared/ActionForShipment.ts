import {Observable} from "rxjs";

export interface ActionForShipment {
  onAction: <T>(dataToSend: T) => Observable<T>;
  setDataToForm: (callback: any) => void;
  action: string;
}
