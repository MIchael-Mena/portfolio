import {Component} from '@angular/core';
import {Project, Image} from "../projects/Project";
import {StorageSessionService} from "../../../service/storage-session.service";

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.css']
})
export class CardProjectComponent {

  public isLogged: boolean = false;

  public project: Project = {
    name: 'Mecedora',
    date: '2015-01-01',
    description: 'Realización de una mecedora para facultad de diseño de la UBA. El proyecto consistió en la realización de un prototipo de mecedora, el cual fue realizado en madera y plástico. El diseño fue realizado en Rhino y el prototipo fue presentado para la materia Diseño Industrial.',
    images: [
      {
        href: 'https://ibb.co/KyKpvsz',
        thumbnail: 'https://i.ibb.co/KyKpvsz/Prueba-render-10-alt.png',
        original: 'https://i.ibb.co/12ztWXJ/Prueba-render-10-alt.png'
      },
      {
        href: 'https://ibb.co/FDV8BpV',
        thumbnail: 'https://i.ibb.co/FDV8BpV/Prueba-render-12.png',
        original: 'https://i.ibb.co/fxvrCJv/Prueba-render-12.png'
      },
      {
        href: 'https://ibb.co/V9m9xJp',
        thumbnail: 'https://i.ibb.co/V9m9xJp/mecedora.jpg',
        original: 'https://i.ibb.co/LR5RrYh/mecedora.jpg'
      }
    ],
    link: 'Project Link'
  }

  constructor(private storageSession: StorageSessionService) {
    this.storageSession.onToggleSignUp().subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    });
  }

  public showDetails(): void {

  }

  public editProject(): void {

  }

  public deleteProject(): void {

  }

}
