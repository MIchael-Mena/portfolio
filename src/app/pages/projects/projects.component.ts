import { Component } from '@angular/core';
import { ProjectService } from './service/project.service';
import { ProjectData } from '../../core/models/ProjectData';
import { ActionForShipment } from '../../core/models/ActionForShipment';
import { ModalProjectComponent } from './modal-project/modal-project.component';
import { ModalResponse } from '../../core/models/ModalResponse';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  public projects: ProjectData[] = [];
  public isLoading: boolean = true;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {
    this.projectService.projectsOrder.subscribe((projects) => {
      this.projects = projects;
      this.isLoading = false;
    });
  }

  public addProject() {
    const data = <ActionForShipment>{
      action: 'Agregar',
      onAction: (project: ProjectData) =>
        this.projectService.addProject(project),
      setDataToForm: (callback: (project: ProjectData) => void) => {},
    };
    const dialogRef = this.dialog.open(ModalProjectComponent, {
      data,
      disableClose: true,
      autoFocus: true,
      restoreFocus: true,
      width: '600px',
      height: '900px',
      maxWidth: '95vw',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((response: ModalResponse) => {
      if (response.state) {
        this.projects.push(response.content);
      }
    });
  }

  public deleteProject(project: ProjectData) {
    this.projects.splice(this.projects.indexOf(project), 1);
  }

  public updateProject(project: ProjectData) {
    const index = this.projects.findIndex((p) => p.id === project.id);
    this.projects[index] = project;
  }
}
