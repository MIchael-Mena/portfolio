import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSquareCaretDown, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrashCan, faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import {StorageSessionService} from "../../../service/storage-session.service";
import {MatDialog} from "@angular/material/dialog";
import {SocialNetwork} from "./SocialNetwork";
import {ModalResponse} from "../../shared/ModalResponse";
import {ModalSocialNetworkComponent} from "../modal-social-network/modal-social-network.component";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {ActionForShipment} from "../../shared/ActionForShipment";
import {AboutService} from "../service/about.service";
import {ComponentState} from "../../shared/ComponentState";
import {DialogContent} from "../../dialog-card/DialogContent";
import {DialogCardComponent} from "../../dialog-card/dialog-card.component";

@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.css'],
})
export class SocialNetworkComponent implements OnInit {

  @Input() isVisible: boolean = false;
  @Output() isLoading: EventEmitter<ComponentState> = new EventEmitter();
  public socialNetworks: SocialNetwork[] = [];
  public icons = {faSquareCaretDown, faPenToSquare, faTrashCan, faSquarePlus}
  public isLoggedIn: boolean = false;
  public activeEdit: boolean = false;

  constructor(private storageService: StorageSessionService, private dialog: MatDialog,
              private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
              private aboutService: AboutService) {
    this.storageService.onToggleSignUp().subscribe(() => {
      this.isLoggedIn = storageService.isLoggedIn;
    });
  }


  ngOnInit(): void {
    // OnInit se ejecuta después de OnChanges
    this.isLoading.emit({name: 'social-network', isLoading: true});
    this.aboutService.socialNetworks.subscribe((socialNetworks: SocialNetwork[]) => {
      this.socialNetworks = socialNetworks;
      this.socialNetworks.forEach(social => {
        this.registerIconSvg((social.id!).toString(), social.icon);
      })
      this.isLoading.emit({name: 'social-network', isLoading: false});
    });
  }

  private registerIconSvg(id: string, icon: string): void {
    this.iconRegistry.addSvgIconLiteral(id, this.domSanitizer.bypassSecurityTrustHtml(icon));
  }

  public editSocialNetwork(): void {
    this.activeEdit = !this.activeEdit;
  }

  public openDeleteDialog(target: SocialNetwork): void {
    const data = <DialogContent>{
      title: 'Eliminar red social ' + this.socialNetworks[0].name,
      message: '¿Estás seguro de que quieres eliminar esta red social?',
      buttonConfirm: 'Eliminar',
      buttonCancel: 'Cancelar',
      buttonConfirmLoading: 'Eliminando...',
      payload: () => this.aboutService.deleteSocialNetwork(target, this.storageService.token)
    }
    const dialogRef = this.dialog.open(DialogCardComponent, {
      data,
      width: '350px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      if (result.state) {
        this.socialNetworks = this.socialNetworks.filter(social => social.id !== target.id);
      } else {
        console.log(result.error);
        alert('Error al eliminar la red social');
      }
    });
  }

  public openEditModal(socialNetwork: SocialNetwork): void {
    const data = <ActionForShipment>{
      action: 'Editar',
      onAction: (social: SocialNetwork) => this.aboutService.updateSocialNetwork(social, this.storageService.token),
      setDataToForm: (callback: (social: SocialNetwork) => void) => callback(socialNetwork)
    }
    const dialogRef = this.dialog.open(ModalSocialNetworkComponent, {
      data,
      disableClose: true,
      autoFocus: true,
      width: '450px',
      height: '500px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      if (result.state) {
        this.registerIconSvg((result.content.id).toString(), result.content.icon);
        const index = this.socialNetworks.findIndex(social => social.id === socialNetwork.id);
        this.socialNetworks[index] = result.content as SocialNetwork;
      }
    });
  }

  public openAddModal(): void {
    const data = <ActionForShipment>{
      action: 'Agregar',
      onAction: (social: SocialNetwork) => this.aboutService.addSocialNetwork(social, this.storageService.token),
      setDataToForm: (callback: (social: SocialNetwork) => void) => {
      }
    }
    const dialogRef = this.dialog.open(ModalSocialNetworkComponent, {
      data,
      disableClose: true,
      autoFocus: true,
      width: '450px',
      height: '500px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      if (result.state) {
        this.registerIconSvg((result.content.id).toString(), result.content.icon);
        this.socialNetworks.push(result.content as SocialNetwork);
      }
    });
  }


}
