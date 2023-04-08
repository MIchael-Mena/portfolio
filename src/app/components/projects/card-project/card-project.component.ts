import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {Image, Project} from "../projects/Project";
import {StorageSessionService} from "../../../service/storage-session.service";
import {faShare} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

import {Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize} from 'ng-gallery';
import {Lightbox} from 'ng-gallery/lightbox';


const images: Image[] = [
  {
    href: 'https://ibb.co/KyKpvsz',
    thumbnail: 'https://i.ibb.co/KyKpvsz/Prueba-render-10-alt.png',
    original: 'https://i.ibb.co/ZT2pDg1/Prueba-render-10-alt.png'
    // original: 'https://i.ibb.co/12ztWXJ/Prueba-render-10-alt.png'
  },
  {
    href: 'https://ibb.co/FDV8BpV',
    thumbnail: 'https://i.ibb.co/FDV8BpV/Prueba-render-12.png',
    original: 'https://i.ibb.co/KrwV9nw/Prueba-render-12.png'
    // original: 'https://i.ibb.co/fxvrCJv/Prueba-render-12.png'
  },
  {
    href: 'https://ibb.co/V9m9xJp',
    thumbnail: 'https://i.ibb.co/V9m9xJp/mecedora.jpg',
    original: 'https://i.ibb.co/XL8LDjk/mecedora.jpg'
    // original: 'https://i.ibb.co/LR5RrYh/mecedora.jpg'
  }
]


@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardProjectComponent implements OnInit {
  public faShare = faShare;
  public faGithub = faGithub;

  public isLogged: boolean = false;
  private items!: GalleryItem[];

  public project: Project = {
    name: 'Mecedora',
    date: '2015-01-01',
    description: 'Realización de una mecedora para facultad de diseño de la UBA. El proyecto consistió en la realización de un prototipo de mecedora, el cual fue realizado en madera y plástico. El diseño fue realizado en Rhino y el prototipo fue presentado para la materia Diseño Industrial.',
    images: images,
    github: 'Project Link'
  }

  constructor(private storageSession: StorageSessionService,
              public gallery: Gallery, public lightbox: Lightbox) {
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

  public showDetails(): void {

  }

  public editProject(): void {

  }

  public deleteProject(): void {

  }

}
