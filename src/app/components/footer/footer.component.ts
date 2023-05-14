import {Component} from '@angular/core';
import {faCode} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  public faCode = faCode;

  constructor() {
  }

  ngOnInit(): void {
  }

}
