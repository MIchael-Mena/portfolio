import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ProjectData } from '../../../core/models/ProjectData';
import { StorageSessionService } from '../../../core/services/storage-session.service';
import {
  faShare,
  faExpand,
  faExternalLinkSquareAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import {
  Gallery,
  GalleryItem,
  ImageItem,
  ThumbnailsPosition,
  ImageSize,
} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { ActionForShipment } from '../../../core/models/ActionForShipment';
import { ModalResponse } from '../../../core/models/ModalResponse';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../service/project.service';
import { ModalProjectComponent } from '../modal-project/modal-project.component';
import { DialogContent } from '../../../core/models/DialogContent';
import { DialogCardComponent } from '../../../shared/components/dialog-card/dialog-card.component';

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProjectComponent implements OnInit {
  @Input() project!: ProjectData;
  @Output() onEdit: EventEmitter<ProjectData> = new EventEmitter<ProjectData>();
  @Output() onDelete: EventEmitter<ProjectData> =
    new EventEmitter<ProjectData>();
  public icons = {
    faShare,
    faExpand,
    faGithub,
    faExternalLinkSquareAlt,
  };

  public isLogged: boolean = false;
  public currentIndex = 0;
  private items!: GalleryItem[];
  public itemsCard!: GalleryItem[];
  public galleryConfig = {
    thumb: false,
    dots: false,
  };
  public playerInterval = Math.floor(Math.random() * (10000 - 5000 + 1) + 2000);

  constructor(
    private storageSession: StorageSessionService,
    public gallery: Gallery,
    public lightbox: Lightbox,
    private dialog: MatDialog,
    private projectService: ProjectService
  ) {
    this.storageSession.onToggleSignUp().subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    });
  }

  public openLink(link: string): void {
    if (link) {
      window.open(link, '_blank');
    }
  }

  ngOnInit(): void {
    this.loadGallery();
    this.setupGallery();
  }

  private setupGallery(): void {
    if (this.project.images.length > 1) {
      this.galleryConfig = {
        thumb: true,
        dots: true,
      };
    }
  }

  private loadGallery(): void {
    // Creat gallery items
    this.items = this.project.images.map(
      (item) => new ImageItem({ src: item.original, thumb: item.thumbnail })
    );
    this.itemsCard = this.project.images.map(
      (item) => new ImageItem({ src: item.medium, thumb: item.thumbnail })
    );

    /*    this.lightbox.setConfig({
          panelClass: 'fullscreen',
        })*/

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref(this.project.name);

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Top,
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }

  public editProject(): void {
    const data = <ActionForShipment>{
      action: 'Editar',
      onAction: (project: ProjectData) =>
        this.projectService.updateProject(project),
      setDataToForm: (callback: (project: ProjectData) => void) =>
        callback(this.project),
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
        this.onEdit.emit(response.content as ProjectData);
      }
    });
  }

  public openDeleteDialog(): void {
    const data = <DialogContent>{
      title: 'Eliminar habilidad ' + this.project.name,
      message: '¿Estás seguro de que quieres eliminar esta habilidad?',
      buttonConfirm: 'Eliminar',
      buttonCancel: 'Cancelar',
      buttonConfirmLoading: 'Eliminando...',
      payload: () => this.projectService.deleteProject(this.project),
    };
    const dialogRef = this.dialog.open(DialogCardComponent, {
      data,
      width: '350px',
      maxWidth: '95vw',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      if (result.state) {
        this.onDelete.emit(this.project);
      } else if (result.error) {
        console.log(result.error);
        alert('Error al eliminar la habilidad');
      }
    });
  }
}
