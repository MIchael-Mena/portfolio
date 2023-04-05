import {Component, OnInit} from '@angular/core';
import {faImagePortrait, faSquareCaretDown} from "@fortawesome/free-solid-svg-icons";
import {AboutService} from "../service/about.service";
import {StorageSessionService} from "../../../service/storage-session.service";
import {AboutMeData} from "../AboutMeData";
import {EditField} from "../EditField";
import {MatDialog} from "@angular/material/dialog";
import {ModalEditImgComponent} from "../modal-edit-img/modal-edit-img.component";
import {DialogContent} from "../../dialog-card/DialogContent";
import {DialogCardComponent} from "../../dialog-card/dialog-card.component";
import {Observable, of} from "rxjs";
import {ModalResponse} from "../../shared/ModalResponse";
import {LoaderComponentService} from "../../../service/loader-component.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [LoaderComponentService]
})
export class AboutComponent implements OnInit {
  public faSquareCaretDown = faSquareCaretDown;
  public faImagePortrait = faImagePortrait;
  public aboutMe: AboutMeData = <AboutMeData>{}
  public isLoading: boolean = true;
  private componentsLoading: Map<string, boolean> = new Map<string, boolean>();
  public isLoggedIn = false;
  public nameData: EditField = <EditField>{};
  public titleData: EditField = <EditField>{};
  public descriptionData: EditField = <EditField>{};

  public canDeactivate: () => Observable<boolean> = () => this.canDeactivateComponent();

  constructor(private aboutService: AboutService,
              private storageService: StorageSessionService,
              private dialog: MatDialog,
              private loaderComponentService: LoaderComponentService) {
    this.storageService.onToggleSignUp().subscribe(() => {
      this.isLoggedIn = storageService.isLoggedIn;
    });
    this.loaderComponentService.onToggleLoading().subscribe((status: boolean) => {
      this.isLoading = status;
    })
  }

  ngOnInit(): void {
    this.loaderComponentService.toggleLoad(true, 'about-me');
    this.aboutService.aboutMe.subscribe((result: AboutMeData) => {
      this.aboutMe = result;
      this.prepareData();
      this.setPhoto();
      this.loaderComponentService.toggleLoad(false, 'about-me');
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
    if (this.isLoading ||
      (this.nameData.canDeactivate() &&
        this.titleData.canDeactivate() &&
        this.descriptionData.canDeactivate())
    ) {
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
      update: (value: string) => this.aboutService.updateName(value),
      canDeactivate: () => true
    }
  }

  private prepareTitleData(): void {
    this.titleData = {
      content: this.aboutMe.title,
      html: `<h2 class="text-muted ">${this.aboutMe.title}</h2>`,
      inputType: 'text',
      label: 'Título',
      update: (value: string) => this.aboutService.updateTitle(value),
      canDeactivate: () => true
    }
  }

  private prepareDescriptionData(): void {
    this.descriptionData = {
      content: this.aboutMe.description,
      html: `<p class="lh-lg px-1">${this.aboutMe.description}</p>`,
      inputType: 'textarea',
      label: 'Descripción',
      update: (value: string) => this.aboutService.updateDescription(value),
      canDeactivate: () => true
    }
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
    const editImg: EditField = {
      content: this.aboutMe.photo,
      html: '',
      inputType: 'image',
      label: 'Imagen de perfil',
      update: (value: string) => this.aboutService.updatePhoto(value),
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

}
