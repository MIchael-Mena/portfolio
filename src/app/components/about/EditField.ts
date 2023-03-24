import {Observable} from "rxjs";
import {AboutMeData} from "./AboutMeData";

export interface EditField {
  content: string;
  html: string;
  inputType: string;
  label: string;
  update: (value: string) => Observable<AboutMeData>
  canDeactivate: () => boolean;
}
