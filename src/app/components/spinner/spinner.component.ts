import {Component} from '@angular/core';
import {LoaderService} from "../../service/loader.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  public isLoading = false;

  constructor(public loaderService: LoaderService) {
    this.loaderService.onToggleLoading().subscribe((status) => {
      this.isLoading = status;
    });
  }

}
