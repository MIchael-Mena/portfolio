import {Component} from '@angular/core';
import {ProjectService} from "../service/project.service";
import {ProjectData} from "./ProjectData";
import {ActionForShipment} from "../../shared/ActionForShipment";
import {ModalProjectComponent} from "../modal-project/modal-project.component";
import {ModalResponse} from "../../shared/ModalResponse";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  public projects: ProjectData[] = [];

  constructor(private projectService: ProjectService, private dialog: MatDialog) {
    this.projectService.projectsOrder.subscribe(projects => this.projects = projects);
  }

  public addProject() {
    const data = <ActionForShipment>{
      action: 'Agregar',
      onAction: (project: ProjectData) => this.projectService.addProject(project),
      setDataToForm: (callback: (project: ProjectData) => void) => {
      },
    }
    const dialogRef = this.dialog.open(ModalProjectComponent, {
      data,
      disableClose: true,
      autoFocus: true,
      restoreFocus: true,
      width: '600px',
      height: '850px',
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
  }

  public editProject(project: ProjectData) {


  }

}
