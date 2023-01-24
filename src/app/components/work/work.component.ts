import { Component } from '@angular/core';
import { Work } from '../interfaces/Work';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent {

  work: Work = new Work();

}
