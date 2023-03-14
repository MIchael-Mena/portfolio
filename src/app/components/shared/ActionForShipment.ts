import {Observable} from "rxjs";

export interface ActionForShipment {
  reorderPositions: (id: number, newPosition: number, oldPosition: number) => void;
  onAction: <T>(dataToSend: T) => Observable<T>;
  setDataToForm: (callback: any) => void;
  action: string;
  positions: number[];
}
