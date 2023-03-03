import {Observable} from "rxjs";
import {AboutMeData} from "./AboutMeData";

export interface EditData {
  content: string;
  html: string;
  inputType: string;
  label: string;
  update: (value: string) => Observable<AboutMeData>
  canDeactivate: () => boolean;
}
