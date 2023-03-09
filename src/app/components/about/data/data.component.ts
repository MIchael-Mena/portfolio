import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {StorageSessionService} from "../../../service/storage-session.service";
import {faSquareCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogContent} from "../../dialog-card/DialogContent";
import {DialogCardComponent} from "../../dialog-card/dialog-card.component";
import {EditData} from "../EditData";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() data: EditData = <EditData>{};
  @Output() dataChange = new EventEmitter<string>();
  public faSquareCaretDown = faSquareCaretDown;
  public isWaitingResponse: boolean = false;
  public isLoggedIn: boolean = false;
  public activeEdit: boolean = false;
  public newData: FormControl = new FormControl('', [Validators.required]);

  constructor(private storageService: StorageSessionService, private dialog: MatDialog) {
    this.storageService.onToggleSignUp().subscribe(() => {
      this.isLoggedIn = storageService.isLoggedIn;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] !== undefined && changes['isVisible'].currentValue === true) {
      this.newData.setValue(this.data.content);
    }
    if (changes['data'] !== undefined && changes['data'].currentValue) {
      // changes['data'].currentValue.canDeactivate = () => this.newData.value === this.data.content;
      // TODO: Se modifica el objeto de entrada, no es buena práctica. Usar el servicio unsavedChangesService
      this.data.canDeactivate = () => this.newData.value === this.data.content;
    }
  }

  public saveData(): void {
    if (this.newData.invalid) {
      return;
    }
    this.isWaitingResponse = true;
    this.data.update(this.newData.value).subscribe({
      next: () => {
        this.isWaitingResponse = false;
        this.activeEdit = false;
        this.dataChange.emit(this.newData.value);
      },
      error: () => {
        this.isWaitingResponse = false;
        alert('Error al actualizar los datos');
      }
    });
  }

  public editData(): void {
    if (this.activeEdit && this.newData.value !== this.data.content) {
      const data = <DialogContent>{
        title: 'Descartar cambios',
        message: `Tienes cambios sin guardar.
                <br>
                ¿Quieres descartar los cambios?`,
      }
      const dialogRef = this.dialog.open(DialogCardComponent, {
        width: '400px',
        data,
        enterAnimationDuration: 200,
        exitAnimationDuration: 200,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.activeEdit = false;
          this.newData.setValue(this.data.content);
        }
      });
    } else {
      this.activeEdit = !this.activeEdit;
    }
  }

}
