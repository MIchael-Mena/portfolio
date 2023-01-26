import {Component} from '@angular/core';
import {Education} from "../interfaces/Education";
import {Work} from "../interfaces/Work";

@Component({
  selector: 'app-experience-and-education',
  templateUrl: './experience-and-education.component.html',
  styleUrls: ['./experience-and-education.component.css']
})
export class ExperienceAndEducationComponent {
  education = new Education()
  work = new Work()

  constructor() {
  }

}
