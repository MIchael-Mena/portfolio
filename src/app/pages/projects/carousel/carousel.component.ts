import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Image } from '../../../core/models/ProjectData';
import { StorageSessionService } from '../../../core/services/storage-session.service';
import { ImgBBService } from '../../../core/services/imgBB.service';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { CarouselComponent as CarouselOWL } from 'ngx-owl-carousel-o';
import { ImgBB } from '../../../core/models/ImgBB';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  @ViewChild('owlCarouselO') carousel!: CarouselOWL;
  @Input() imageRequired: boolean = false;
  @Input() slides: Image[] = [];
  @Output() slidesChange: EventEmitter<Image[]> = new EventEmitter<Image[]>();
  public activeSlideIndex: number = 0;
  public imgBBKey: string = '';
  public imgLoading: boolean = false;
  private timeAnimation = 700;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: this.timeAnimation,
    // navText: ['<', '>'],
    // No funciona ya que angular debe sanitizar el html
    // navText: ['<mat-icon>keyboard_arrow_left</mat-icon>', '<mat-icon>keyboard_arrow_right</mat-icon>'],
    items: 1,
    nav: false,
  };

  constructor(
    private storageService: StorageSessionService,
    private imgBBService: ImgBBService
  ) {
    this.imgBBKey = this.storageService.getApiKey('imgBB');
  }

  prevSlide() {
    this.carousel.prev();
  }

  nextSlide() {
    this.carousel.next();
  }

  handleChanged(event: SlidesOutputData) {
    // existe el event change, que se dispara antes de que empiece la animación al cambiar de slide
    this.activeSlideIndex = event.startPosition ?? 0;
  }

  // TODO: refactorizar, conseguir que las imagenes se suban a imgBB cuando se hace
  // click en el boton de guardar y no cuando se agrega la imagen
  public addImage(event: Event): void {
    this.imgLoading = true;
    const file = (<HTMLInputElement>event.target)?.files?.[0]!;
    this.imgBBService.upload(file, this.imgBBKey).subscribe({
      next: (data: ImgBB) => {
        this.slides.push(<Image>{
          thumbnail: data.thumb.url,
          medium: data.medium ? data.medium.url : data.image.url,
          original: data.image.url,
          deleteUrl: data['delete_url'],
        });
        this.slidesChange.emit(this.slides);
        this.activeSlideIndex = this.slides.length - 1;
        // this.carousel.to(activeSlideIndex); // No funciona
        this.customOptions = {
          ...this.customOptions,
          startPosition: this.activeSlideIndex,
        };
        this.imageRequired = false;
        this.imgLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al subir la imagen');
        this.imgLoading = false;
      },
    });
  }

  public removeCurrentImage(index?: number): void {
    // TODO: imgBB no soporta delete por api, se debería usar web scraping. Por ahora, se elimina manualmente.
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
    this.slidesChange.emit(this.slides);
  }
}
