import { Component } from '@angular/core';
import { Education } from '../../models/Education';
import { Work } from '../../models/Work';
import { UnsavedChangesService } from '../../../../core/services/unsaved-changes.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { StorageSessionService } from '../../../../core/services/storage-session.service';
// import {LoaderComponentService} from "../../../service/loader-component.service";

// return await firstValueFrom(dialogRef.afterClosed()) para devolver un observable como promesa
//   public canDeactivate: () => Promise<boolean> = async () => true; para devolver una promesa

@Component({
  selector: 'app-experience-and-education',
  templateUrl: './experience-and-education.component.html',
  styleUrls: ['./experience-and-education.component.css'],
  // providers: [LoaderComponentService]
})
export class ExperienceAndEducationComponent {
  public isLoading: boolean = true;
  public education = new Education();
  public work = new Work();
  public isLoggedIn: boolean = false;
  private actualTab = 0;
  public activeTab: boolean[] = [true, false, false];
  public tabs = [
    { label: 'Educación', icon: 'school' },
    { label: 'Idiomas', icon: 'language' },
    { label: 'Experiencia', icon: 'work' },
  ];

  constructor(
    private unsavedChanges: UnsavedChangesService,
    private dialog: MatDialog,
    private storageService: StorageSessionService
  ) {
    this.storageService.onToggleSignUp().subscribe((result: boolean) => {
      this.isLoggedIn = result;
    });
    /*    this.loaderComponentService.onToggleLoading().subscribe((result: boolean) => {
          this.isLoading = result;
        });*/
  }

  public tabChanged(tavEvent: MatTabChangeEvent): void {
    // Todavía no utilizo la segunda posición del array '1' en su lugar está el botón de agregar
    this.actualTab = tavEvent.index;
    this.markTabAsActive();
  }

  private markTabAsActive(): void {
    switch (this.actualTab) {
      case 0:
        this.activeTab = [true, false, false];
        break;
      case 2:
        this.activeTab = [false, false, true];
        break;
    }
  }

  public addEducation(): void {
    this.education.toggleAdd();
  }

  public add(): void {
    switch (this.actualTab) {
      case 0:
        this.addEducation();
        break;
      case 2:
        this.addWork();
    }
  }

  public addWork(): void {
    this.work.toggleAdd();
  }
}
