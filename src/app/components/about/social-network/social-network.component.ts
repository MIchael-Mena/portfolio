import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSquareCaretDown, faGrip} from '@fortawesome/free-solid-svg-icons';
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import {StorageSessionService} from "../../../service/storage-session.service";
import {MatDialog} from "@angular/material/dialog";
import {SocialNetwork} from "./SocialNetwork";
import {ModalResponse} from "../../shared/ModalResponse";
import {ModalSocialNetworkComponent} from "../modal-social-network/modal-social-network.component";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {ActionForShipment} from "../../shared/ActionForShipment";
import {DialogContent} from "../../dialog-card/DialogContent";
import {DialogCardComponent} from "../../dialog-card/dialog-card.component";
import {SocialNetworkService} from "../service/social-network.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {PositionController} from "../../shared/PositionController";
import {LoaderComponentService} from "../../../service/loader-component.service";

@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.css'],
})
export class SocialNetworkComponent implements OnInit {

  public isVisible: boolean = false;
  public socialNetworks: SocialNetwork[] = [];
  public icons = {faSquareCaretDown, faSquarePlus, faGrip}
  public isLoggedIn: boolean = false;
  public activeEdit: boolean = false;
  public activeDragAndDrop: boolean = false;
  private positionController!: PositionController;


  constructor(private storageService: StorageSessionService, private dialog: MatDialog,
              private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
              private socialService: SocialNetworkService,
              private loaderComponentService: LoaderComponentService) {
    this.storageService.onToggleSignUp().subscribe(() => {
      this.isLoggedIn = storageService.isLoggedIn;
    });
    this.loaderComponentService.onToggleLoading().subscribe((status: boolean) => {
      this.isVisible = !status;
    })
  }


  ngOnInit(): void {
    // OnInit se ejecuta después de OnChanges
    this.loaderComponentService.toggleLoad(true, 'social-network');
    this.socialService.socialNetworksOrder.subscribe((socialNetworks: SocialNetwork[]) => {
      this.socialNetworks = socialNetworks;
      this.socialNetworks.forEach(social => {
        this.registerIconSvg((social.id!).toString(), social.icon);
      })
      this.positionController = new PositionController(this.socialNetworks,
        (social: SocialNetwork) => this.updatePositionSocialNetworkInBackend(social));
      this.loaderComponentService.toggleLoad(false, 'social-network');
    });
  }

  public activateDragAndDrop(): void {
    this.activeDragAndDrop = !this.activeDragAndDrop;
  }

  public drop(event: CdkDragDrop<SocialNetwork[]>): void {
    //TODO: en media query menor a 600px no funciona el drag and drop, se divide la fila en dos
    moveItemInArray(this.socialNetworks, event.previousIndex, event.currentIndex);
    this.positionController.reorderPositionsBySideMovement()
  }


  private registerIconSvg(id: string, icon: string): void {
    this.iconRegistry.addSvgIconLiteral(id, this.domSanitizer.bypassSecurityTrustHtml(icon));
  }

  public editSocialNetwork(): void {
    this.activeEdit = !this.activeEdit;
  }


  private updatePositionSocialNetworkInBackend(social: SocialNetwork): void {
    this.socialService.updatePosition(social.id!, social.position).subscribe({
      next: (social: SocialNetwork) => {
      },
      error: error => {
        console.log(error);
      }
    });

  }

  public openDeleteDialog(target: SocialNetwork): void {
    if (this.activeDragAndDrop) return;
    const data = <DialogContent>{
      title: 'Eliminar red social ' + this.socialNetworks[0].name,
      message: '¿Estás seguro de que quieres eliminar esta red social?',
      buttonConfirm: 'Eliminar',
      buttonCancel: 'Cancelar',
      buttonConfirmLoading: 'Eliminando...',
      payload: () => this.socialService.delete(target)
    }
    const dialogRef = this.dialog.open(DialogCardComponent, {
      data,
      width: '350px',
      maxWidth: '95vw',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      if (result.state) {
        this.socialNetworks.splice(target.position - 1, 1);
        this.positionController.reorderPositionsOnDelete(target.position);
      } else if (result.error) {
        console.log(result.error);
        alert('Error al eliminar la red social');
      }
    });
  }

  public openEditModal(socialNetwork: SocialNetwork): void {
    if (this.activeDragAndDrop) return;
    const data = <ActionForShipment>{
      action: 'Editar',
      onAction: (social: SocialNetwork) => this.socialService.update(social),
      setDataToForm: (callback: (social: SocialNetwork) => void) => callback(socialNetwork),
      updatePosition: (itemIsNew, newPosition, oldPosition) => {
        this.positionController.updatePositionsIfChanged(itemIsNew, newPosition, oldPosition);
      },
      positions: this.positionController.getPositions(),
    }
    const dialogRef = this.dialog.open(ModalSocialNetworkComponent, {
      data,
      disableClose: true,
      autoFocus: true,
      width: '450px',
      height: '600px',
      maxWidth: '95vw',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      if (result.state) {
        this.registerIconSvg((result.content.id).toString(), result.content.icon);
        const index = this.socialNetworks.findIndex(social => social.id === socialNetwork.id);
        this.socialNetworks[index] = result.content as SocialNetwork;
        this.reorderSocialNetworks();
      }
    });
  }

  public openAddModal(): void {
    this.positionController.addPosition();
    const data = <ActionForShipment>{
      action: 'Agregar',
      onAction: (social: SocialNetwork) => this.socialService.add(social),
      setDataToForm: (callback: (social: SocialNetwork) => void) => {
      },
      updatePosition: (itemIsNew, newPosition, oldPosition) => {
        this.positionController.updatePositionsIfChanged(itemIsNew, newPosition, oldPosition);
      },
      positions: this.positionController.getPositions(),
    }
    const dialogRef = this.dialog.open(ModalSocialNetworkComponent, {
      data,
      disableClose: true,
      autoFocus: true,
      width: '450px',
      height: '600px',
      maxWidth: '95vw',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      if (result.state) {
        this.registerIconSvg((result.content.id).toString(), result.content.icon);
        this.socialNetworks.push(result.content as SocialNetwork);
        this.reorderSocialNetworks();
      } else {
        this.positionController.removePosition();
      }
    });
  }

  private reorderSocialNetworks(): void {
    // Ordena las redes sociales por posición para que se reflejen en el front
    this.socialNetworks.sort((a, b) => a.position - b.position);
  }


}
