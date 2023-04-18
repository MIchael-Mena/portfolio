import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Image} from "../projects/ProjectData";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() slides: Image[] = [];
  @Output() slidesChange: EventEmitter<Image[]> = new EventEmitter<Image[]>();
  public activeSlideIndex: number = 0;

  constructor() {
  }

  public addImage(): void {
    // this.slides.push(this.slides.length + 1);
    this.slides.push(<Image>{
      thumbnail: '',
      original: '',
      deleteUrl: '',
    });
    this.slidesChange.emit(this.slides);
  }

  public removeCurrentImage(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
    this.slidesChange.emit(this.slides);
  }


}
