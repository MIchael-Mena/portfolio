import {Component} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

// Material le asigna un tamaño de 24x24 a los iconos SVG, por lo que se debe
// usar transform="scale(1.5)" para aumentar el tamaño

const OWl_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 26">
  <path
    d="M12,16C12.56,16.84 13.31,17.53 14.2,18L12,20.2L9.8,18C10.69,17.53 11.45,16.84 12,16M17,11.2A2,2 0 0,0 15,13.2A2,2 0 0,0 17,15.2A2,2 0 0,0 19,13.2C19,12.09 18.1,11.2 17,11.2M7,11.2A2,2 0 0,0 5,13.2A2,2 0 0,0 7,15.2A2,2 0 0,0 9,13.2C9,12.09 8.1,11.2 7,11.2M17,8.7A4,4 0 0,1 21,12.7A4,4 0 0,1 17,16.7A4,4 0 0,1 13,12.7A4,4 0 0,1 17,8.7M7,8.7A4,4 0 0,1 11,12.7A4,4 0 0,1 7,16.7A4,4 0 0,1 3,12.7A4,4 0 0,1 7,8.7M2.24,1C4,4.7 2.73,7.46 1.55,10.2C1.19,11 1,11.83 1,12.7A6,6 0 0,0 7,18.7C7.21,18.69 7.42,18.68 7.63,18.65L10.59,21.61L12,23L13.41,21.61L16.37,18.65C16.58,18.68 16.79,18.69 17,18.7A6,6 0 0,0 23,12.7C23,11.83 22.81,11 22.45,10.2C21.27,7.46 20,4.7 21.76,1C19.12,3.06 15.36,4.69 12,4.7C8.64,4.69 4.88,3.06 2.24,1Z"/>
  </svg>
  `;

const START_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
  <path d="M1.75 18.15V5.85h2.275v12.3Zm14.325.05-1.625-1.6 3.45-3.45H5.925v-2.3H17.9L14.475 7.4l1.6-1.6L22.25 12Z"/></svg>
  `;

const ACCOUNT_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <path d="M18.9,31.1c-4.2,0-8-2.2-10.2-5.4c0.1-3.4,6.8-5.3,10.2-5.3s10.1,1.9,10.2,5.3C26.9,29,23.1,31.1,18.9,31.1
\t M18.9,7.1c2.8,0,5.1,2.3,5.1,5.1s-2.3,5.1-5.1,5.1s-5.1-2.3-5.1-5.1S16.1,7.1,18.9,7.1 M20,3C10.6,3,3,10.6,3,20s7.6,17,17,17
\ts17-7.6,17-17C36.9,10.6,29.3,3,20,3z"/>
</svg>

  `;

const NO_ACCOUNT_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <path d="M24.8,18.8l-8-8c0.4-0.3,0.9-0.5,1.5-0.6c0.6-0.2,1.1-0.3,1.7-0.3c1.6,0,3,0.6,4.1,1.7
\tc1.1,1.1,1.7,2.5,1.7,4.1c0,0.6-0.1,1.2-0.3,1.8C25.4,18,25.1,18.5,24.8,18.8z M9.5,29c1.6-1.1,3.3-1.9,5-2.5s3.5-0.9,5.5-0.9
\tc0.8,0,1.6,0.1,2.4,0.2c0.7,0.1,1.4,0.3,1.9,0.4l-4.8-4.8c-1.5-0.1-2.7-0.6-3.7-1.6c-0.9-0.9-1.5-2.1-1.6-3.5l-5.1-5.1
\tc-0.9,1.2-1.7,2.6-2.2,4s-0.8,3-0.8,4.8c0,1.6,0.3,3.2,0.8,4.7C7.6,26.2,8.4,27.6,9.5,29z M30.8,28.7c0.9-1.1,1.6-2.4,2.1-3.9
\tc0.5-1.5,0.8-3.1,0.8-4.8c0-4-1.3-7.3-3.9-9.9S24,6.2,20,6.2c-1.8,0-3.4,0.3-4.8,0.8c-1.4,0.5-2.7,1.3-3.9,2.1L30.8,28.7z M20,37
\tc-2.4,0-4.6-0.4-6.6-1.3S9.5,33.5,8,32s-2.7-3.3-3.6-5.4S3,22.4,3,20s0.4-4.6,1.3-6.6S6.5,9.5,8,8s3.3-2.7,5.4-3.6S17.6,3,20,3
\ts4.6,0.4,6.6,1.3S30.5,6.5,32,8s2.7,3.3,3.6,5.4S37,17.6,37,20s-0.4,4.6-1.3,6.6S33.5,30.5,32,32s-3.3,2.7-5.4,3.6S22.4,37,20,37z"
  />
</svg>
  `;

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('owl', sanitizer.bypassSecurityTrustHtml(OWl_ICON));
    iconRegistry.addSvgIconLiteral('start', sanitizer.bypassSecurityTrustHtml(START_ICON));
    iconRegistry.addSvgIconLiteral('account', sanitizer.bypassSecurityTrustHtml(ACCOUNT_ICON));
    iconRegistry.addSvgIconLiteral('no-account', sanitizer.bypassSecurityTrustHtml(NO_ACCOUNT_ICON));
  }

}
