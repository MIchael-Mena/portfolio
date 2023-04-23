import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Image} from "../projects/ProjectData";
import {StorageSessionService} from "../../../service/storage-session.service";
import {ImgBBService} from "../../../service/imgBB.service";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() slides: Image[] = [];
  @Output() slidesChange: EventEmitter<Image[]> = new EventEmitter<Image[]>();
  public activeSlideIndex: number = 0;
  public imgBBKey: string = '';
  public imgLoading: boolean = false;

  constructor(private storageService: StorageSessionService, private imgBBService: ImgBBService) {
    this.imgBBKey = this.storageService.getApiKey('imgBB');
  }

  public addImage(event: any): void {
    this.imgLoading = true;
    const file = <File>event.target.files[0];
    this.imgBBService.upload(file, this.imgBBKey).subscribe({
      next: (data: any) => {
        this.slides.push(<Image>{
          thumbnail: data.thumb.url,
          medium: (data.medium.url === undefined) ? data.image.url : data.medium.url,
          original: data.image.url,
          deleteUrl: data['delete_url']
        });
        this.slidesChange.emit(this.slides);
        setTimeout(() => {
          this.activeSlideIndex = this.slides.length - 1;
        }, 500);
        // this.activeSlideIndex = this.slides.length - 1;
        this.imgLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al subir la imagen')
        this.imgLoading = false;
      }
    });
  }

  public removeCurrentImage(index?: number): void {
    // TODO: imgBB no soporta delete por api, se debería usar web scraping. Por ahora, se elimina manualmente.
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
    this.slidesChange.emit(this.slides);
  }


}
