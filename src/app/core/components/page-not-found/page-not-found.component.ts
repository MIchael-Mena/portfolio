import {Component} from '@angular/core';
import {faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

  public faCircleQuestion = faCircleQuestion;

  constructor(private router: Router) {
  }


}
