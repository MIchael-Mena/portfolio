import {Component} from '@angular/core';
import {LoaderService} from "../../../service/loader.service";

@Component({
  selector: 'app-global-spinner',
  templateUrl: './global-spinner.component.html',
  styleUrls: ['./global-spinner.component.css']
})
export class GlobalSpinnerComponent {

  public isLoading = false;

  constructor(public loaderService: LoaderService) {
    this.loaderService.onToggleLoading().subscribe((status) => {
      this.isLoading = status;
    });
  }

}
