import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {StorageSessionService} from "../../../service/storage-session.service";
import {faSquareCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-name',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnChanges {

  @Input() data: string = '';
  @Input() html: string = '';
  @Input() inputType: string = 'text';
  @Input() label: string = '';
  public faSquareCaretDown = faSquareCaretDown;
  public isLoggedIn: boolean = false;
  public activeEditData: boolean = false;
  public newData: FormControl = new FormControl('', [Validators.required]);

  constructor(private storageService: StorageSessionService) {
    this.storageService.onToggleSignUp().subscribe(() => {
      this.isLoggedIn = storageService.isLoggedIn;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.newData.setValue(changes['data'].currentValue);
    this.newData.setValue(this.data);
  }

  public saveData(): void {

  }

  public editData(): void {
    this.activeEditData = !this.activeEditData;
  }


}
