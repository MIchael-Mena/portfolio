import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Image} from "../projects/ProjectData";
import {AuthService} from "../../../service/auth.service";
import {StorageSessionService} from "../../../service/storage-session.service";
import {ApiKey} from "../../shared/User";
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
    this.imgBBService.upload(file, this.imgBBKey).subscribe((data: any) => {
      console.log(data);
      this.slides.push(<Image>{
        thumbnail: data.thumb.url,
        original: data.image.url,
        deleteUrl: data['delete_url'],
      });
      this.slidesChange.emit(this.slides);
      this.activeSlideIndex = this.slides.length - 1;
      this.imgLoading = false;
    });
  }

  public removeCurrentImage(index?: number): void {
    // TODO: imgBB no soporta delete por api, se debería usar web scraping. Por ahora, se elimina manualmente.
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
    this.slidesChange.emit(this.slides);
  }


}
