import {Component, OnInit} from '@angular/core';
import {faPenToSquare, faImagePortrait, faSquareCaretDown} from "@fortawesome/free-solid-svg-icons";
import {AboutService} from "../service/about.service";
import {StorageSessionService} from "../../../service/storage-session.service";
import {AboutMeData} from "../AboutMeData";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {EditData} from "../EditData";
import {MatDialog} from "@angular/material/dialog";
import {ModalEditImgComponent} from "../modal-edit-img/modal-edit-img.component";
import {DialogContent} from "../../shared/DialogContent";
import {DialogCardComponent} from "../../dialog-card/dialog-card.component";
import {Observable, of} from "rxjs";
import {ModalResponse} from "../../shared/ModalResponse";

const imageTest = 'url(\'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDIFodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMC4xMCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nPgogIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnN0b2NrOjY4ODU0MTQ2LWI1NDEtNGQxMi1hOTE0LTEwMTNiZTZmZTZiYjwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjdjMDRlMjliLTlkMGMtNGIyMS04Nzg1LTgwMTE5MzY1YWIyMTwveG1wTU06SW5zdGFuY2VJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/8AACwgBaAIOAQERAP/EAB0AAQEAAgMBAQEAAAAAAAAAAAAIBQcDBgkEAQL/xABPEAABAgMCCAcOAwcCBQUBAAAAAQMCBAUGEQcIFiExQZTSN1FxcpGxsxITGDM0NlRVVmF0dbLTFDJCFSJSYoGSoSMkJUNTY8GCk6LR4fD/2gAIAQEAAD8AssAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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\')';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public faSquareCaretDown = faSquareCaretDown;
  // faPenToSquare = faPenToSquare;
  public faImagePortrait = faImagePortrait;
  public aboutMe: AboutMeData = <AboutMeData>{}
  public isLoading = true;
  public isLoggedIn = false;
  public nameData: EditData = <EditData>{};
  public titleData: EditData = <EditData>{};
  public descriptionData: EditData = <EditData>{};
  public canDeactivate: () => Observable<boolean> = () => this.canDeactivateComponent();

  constructor(private aboutService: AboutService, private iconRegistry: MatIconRegistry,
              private storageService: StorageSessionService, private domSanitizer: DomSanitizer,
              private dialog: MatDialog) {
    this.storageService.onToggleSignUp().subscribe(() => {
      this.isLoggedIn = storageService.isLoggedIn;
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.aboutService.data.subscribe((result: AboutMeData) => {
      this.isLoading = false;
      this.aboutMe = result;
      this.prepareData();
      this.setPhoto();
      this.aboutMe.socialMedia.forEach(social => {
        this.iconRegistry.addSvgIconLiteral(social.name, this.domSanitizer.bypassSecurityTrustHtml(social.icon));
      })
    });
  }

  private setPhoto(): void {
    // TODO: se puede usar img en vez de un div con background-image, y cambiarles el [src] al img
    document.getElementById('imageURL')?.style.setProperty(
      '--image-url', `url(${this.aboutMe.photo})`
    );
  }

  private prepareData(): void {
    this.prepareNameData();
    this.prepareTitleData();
    this.prepareDescriptionData();
  }

  private canDeactivateComponent(): Observable<boolean> {
    if (this.nameData.canDeactivate() && this.titleData.canDeactivate() && this.descriptionData.canDeactivate()) {
      return of(true);
    }
    const data = <DialogContent>{
      title: 'Cambios sin guardar',
      message: `Tienes cambios sin guardar en un formulario.
                <br>
                Si continúas perderás los cambios.`,
      buttonCancel: 'Cancelar',
      buttonConfirm: 'Continuar',
    }
    const dialogRef = this.dialog.open(DialogCardComponent, {
      width: '400px',
      data,
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
    });
    return dialogRef.afterClosed()
  }

  private prepareNameData(): void {
    this.nameData = {
      content: this.aboutMe.name,
      html: `<h2 class="">${this.aboutMe.name}</h2>`,
      inputType: 'text',
      label: 'Nombre',
      update: (value: string) => this.setUpdate(value, 'name'),
      /*      update: (value: string) => this.aboutService.update({
              ...this.aboutMe,
              name: value
            }, this.storageService.token),*/
      canDeactivate: () => true
    }
  }

  private prepareTitleData(): void {
    this.titleData = {
      content: this.aboutMe.title,
      html: `<h2 class="text-muted ">${this.aboutMe.title}</h2>`,
      inputType: 'text',
      label: 'Título',
      update: (value: string) => this.setUpdate(value, 'title'),
      canDeactivate: () => true
    }
  }

  private prepareDescriptionData(): void {
    this.descriptionData = {
      content: this.aboutMe.description,
      html: `<p class="lh-lg px-1">${this.aboutMe.description}</p>`,
      inputType: 'textarea',
      label: 'Descripción',
      update: (value: string) => this.setUpdate(value, 'description'),
      canDeactivate: () => true
    }
  }

  private setUpdate(value: string, field: string): Observable<AboutMeData> {
    return this.aboutService.update({
      ...this.aboutMe,
      [field]: value
    }, this.storageService.token);
  }

  public updateName(name: string): void {
    this.aboutMe.name = name;
    this.prepareNameData();
  }

  public updateTitle(title: string): void {
    this.aboutMe.title = title;
    this.prepareTitleData();
  }

  public updateDescription(description: string): void {
    this.aboutMe.description = description;
    this.prepareDescriptionData();

  }

  public editProfileImage(): void {
    // TOOD: no enviar todo el aboutMe, solo la foto. Hacerlo cuando se elimine fake-backend
    const editImg: EditData = {
      content: this.aboutMe.photo,
      html: '',
      inputType: 'image',
      label: 'Imagen de perfil',
      update: (value: string) => this.setUpdate(value, 'photo'),
      canDeactivate: () => true
    }
    const dialogRef = this.dialog.open(ModalEditImgComponent, {
      width: '350px',
      height: '300px',
      data: editImg,
      autoFocus: true,
      restoreFocus: true,
      disableClose: true,
      enterAnimationDuration: 200,
      exitAnimationDuration: 200
    });
    dialogRef.afterClosed().subscribe((response: ModalResponse) => {
      if (response.state) {
        this.aboutMe.photo = response.content;
        this.setPhoto();
      }
    });
  }

  public editSocialMedia(): void {

  }

  test(element: HTMLElement) {
    element.style.setProperty('--image-url', `${imageTest}`);
  }


}
