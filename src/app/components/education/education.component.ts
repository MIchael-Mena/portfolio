import { Component } from '@angular/core';
import { Education } from '../interfaces/Education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {

  education: Education = new Education();
}
