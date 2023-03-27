import {Component} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

// Material le asigna un tamaño de 24x24 a los iconos SVG, por lo que se debe
// usar transform="scale(1.5)" para aumentar el tamaño
// otra opción es usar el siguiente código en el css del componente
/*:host .mat-icon {
  height: 48px;
  width: 48px;
}*/

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('account', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/account.svg'));
    iconRegistry.addSvgIcon('no-account', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/no-account.svg'));
    iconRegistry.addSvgIcon('start', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/start.svg'));
  }

}
