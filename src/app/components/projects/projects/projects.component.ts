import {Component} from '@angular/core';
import {ProjectService} from "../service/project.service";
import {ProjectData} from "./ProjectData";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  public projects: ProjectData[] = [];

  constructor(private projectService: ProjectService) {
    this.projectService.projectsOrder.subscribe(projects => this.projects = projects);
  }

  public addProject() {

  }

  public deleteProject(project: ProjectData) {
  }

  public editProject(project: ProjectData) {

  }

}
