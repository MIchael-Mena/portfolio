import {Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Image, ProjectData} from "../projects/ProjectData";
import {StorageSessionService} from "../../../service/storage-session.service";
import {faShare} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

import {Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize} from 'ng-gallery';
import {Lightbox} from 'ng-gallery/lightbox';
import {ActionForShipment} from "../../shared/ActionForShipment";
import {ModalResponse} from "../../shared/ModalResponse";
import {MatDialog} from "@angular/material/dialog";
import {ProjectService} from "../service/project.service";
import {ModalProjectComponent} from "../modal-project/modal-project.component";


/*const images: Image[] = [
  {
    thumbnail: 'https://i.ibb.co/KyKpvsz/Prueba-render-10-alt.png',
    original: 'https://i.ibb.co/ZT2pDg1/Prueba-render-10-alt.png',
    deleteUrl: ''
    // original: 'https://i.ibb.co/12ztWXJ/Prueba-render-10-alt.png'
  },
  {
    thumbnail: 'https://i.ibb.co/FDV8BpV/Prueba-render-12.png',
    original: 'https://i.ibb.co/KrwV9nw/Prueba-render-12.png',
    deleteUrl: ''
    // original: 'https://i.ibb.co/fxvrCJv/Prueba-render-12.png'
  },
  {
    thumbnail: 'https://i.ibb.co/V9m9xJp/mecedora.jpg',
    original: 'https://i.ibb.co/XL8LDjk/mecedora.jpg',
    deleteUrl: ''
    // original: 'https://i.ibb.co/LR5RrYh/mecedora.jpg'
  }
]*/


@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardProjectComponent implements OnInit {
  @Input() project!: ProjectData;
  @Output() onEdit: EventEmitter<ProjectData> = new EventEmitter<ProjectData>();
  @Output() onDelete: EventEmitter<ProjectData> = new EventEmitter<ProjectData>();
  public faShare = faShare;
  public faGithub = faGithub;
  public isLogged: boolean = false;
  private items!: GalleryItem[];

  /*  public project: ProjectData = {
      name: 'Mecedora',
      date: '2015-01-01',
      description: 'Realización de una mecedora para facultad de diseño de la UBA. El proyecto consistió en la realización de un prototipo de mecedora, el cual fue realizado en madera y plástico. El prototipo fue presentado para la materia Diseño Industrial.',
      images: images,
      technologies: ['Rhinoceros 3D', 'Adobe Illustrator'],
    }*/

  constructor(private storageSession: StorageSessionService,
              public gallery: Gallery, public lightbox: Lightbox,
              private dialog: MatDialog, private projectService: ProjectService) {
    this.storageSession.onToggleSignUp().subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    });
  }

  ngOnInit(): void {
    this.loadGallery();
  }

  private loadGallery(): void {
    // Creat gallery items
    this.items = this.project.images.map(item => new ImageItem({src: item.original, thumb: item.thumbnail}));

    /*    this.lightbox.setConfig({
          panelClass: 'fullscreen',
        })*/

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }

  public editProject(): void {
    const data = <ActionForShipment>{
      action: 'Editar',
      onAction: (project: ProjectData) => this.projectService.updateProject(project),
      setDataToForm: (callback: (project: ProjectData) => void) => callback(this.project),
    }
    const dialogRef = this.dialog.open(ModalProjectComponent, {
      data,
      disableClose: true,
      autoFocus: true,
      restoreFocus: true,
      width: '450px',
      height: '800px',
      maxWidth: '95vw',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((response: ModalResponse) => {
      if (response.state) {
        this.onEdit.emit(response.content as ProjectData);
      }
    });
  }

  public deleteProject(): void {

  }

}
