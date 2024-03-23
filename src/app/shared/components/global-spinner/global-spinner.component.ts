import { Component, Input } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-global-spinner',
  templateUrl: './global-spinner.component.html',
  styleUrls: ['./global-spinner.component.css'],
})
export class GlobalSpinnerComponent {
  @Input() diameter = 100;
  @Input() isLoading = false;

  constructor(public loaderService: LoaderService) {
    /*    this.loaderService.onToggleLoading().subscribe((status) => {
          this.isLoading = status;
        });*/
  }
}
