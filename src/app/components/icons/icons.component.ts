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
    iconRegistry.addSvgIcon('owl', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/owl-malicious.svg'));

    /*    iconRegistry.addSvgIcon('c++', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/c++.svg'));
        iconRegistry.addSvgIcon('typescript', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/typescript.svg'));
        iconRegistry.addSvgIcon('java', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/java.svg'));
        iconRegistry.addSvgIcon('python', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/python.svg'));
        iconRegistry.addSvgIcon('js', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/javascript.svg'));

        iconRegistry.addSvgIcon('node', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/node.svg'));
        iconRegistry.addSvgIcon('spring-boot', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/spring-boot.svg'));
        iconRegistry.addSvgIcon('mysql', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/database.svg'));

        iconRegistry.addSvgIcon('angular', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/angular.svg'));
        iconRegistry.addSvgIcon('react', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/react.svg'));
        iconRegistry.addSvgIcon('html', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/html.svg'));
        iconRegistry.addSvgIcon('css', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/css.svg'));
        iconRegistry.addSvgIcon('bootstrap', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/svg/bootstrap.svg'));*/
  }

}
