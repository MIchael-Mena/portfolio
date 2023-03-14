import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {DialogContent} from "../../dialog-card/DialogContent";
import {DialogCardComponent} from "../../dialog-card/dialog-card.component";
import {MatDialog} from "@angular/material/dialog";
import {ModalSkillComponent} from "../modal-skill/modal-skill.component";
import {SkillData} from "../SkillData";

import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {StorageSessionService} from "../../../service/storage-session.service";
import {SkillService} from "../service/skill.service";
import {Observable, Subscription} from "rxjs";
import {ModalResponse} from "../../shared/ModalResponse";
import {ActionForShipment} from "../../shared/ActionForShipment";

@Component({
  selector: 'app-skill-bar',
  templateUrl: './skill-bar.component.html',
  styleUrls: ['./skill-bar.component.css']
})
export class SkillBarComponent implements OnChanges, OnInit, OnDestroy {
  @Input() skill: SkillData = <SkillData>{};
  @Output() onDeleteSkill = new EventEmitter<SkillData>();
  @Output() onUpdateSkill = new EventEmitter<SkillData>();
  public isLoggedIn: boolean = false;
  public faPenToSquare = faPenToSquare;
  public faTrashCan = faTrashCan;
  private subscription: Subscription = new Subscription();

  public skillLevel: [boolean, boolean, boolean, boolean, boolean] = [false, false, false, false, false];

  constructor(private dialog: MatDialog, private iconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer, private storageSession: StorageSessionService,
              private skillService: SkillService) {
    this.subscription.add(this.storageSession.onToggleSignUp().subscribe((result: boolean) => {
      this.isLoggedIn = result;
    }));
    this.setLevelSkill();
  }

  // ngOnChanges se ejecuta antes que ngOnInit
  ngOnChanges() {
    this.setLevelSkill();
  }

  ngOnInit() {
    this.iconRegistry.addSvgIconLiteral((this.skill.id!).toString(), this.domSanitizer.bypassSecurityTrustHtml(this.skill.icon));
  }

  private setLevelSkill() {
    for (let i = 0; i < this.skill.level; i++) {
      this.skillLevel[i] = true;
    }
  }

  public editSkill() {
    const data = <ActionForShipment>{
      action: 'Editar',
      onAction: (skill: SkillData) => this.skillService.updateSkill(skill, this.storageSession.token),
      setDataToForm: (callback: (skill: SkillData) => void) => callback(this.skill),
    }
    const dialogRef = this.dialog.open(ModalSkillComponent, {
      data,
      disableClose: true,
      autoFocus: true,
      restoreFocus: true,
      width: '450px',
      height: '500px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((response: ModalResponse) => {
      // Si el backend acepta la modificación (el modal está manejando los errores a diferencia del dialog)
      if (response.state) {
        this.onUpdateSkill.emit(response.content as SkillData);
      }
    });
  }

  openDeleteDialog(): void {
    const data = <DialogContent>{
      title: 'Eliminar habilidad ' + this.skill.name,
      message: '¿Estás seguro de que quieres eliminar esta habilidad?',
      buttonConfirm: 'Eliminar',
      buttonCancel: 'Cancelar',
      buttonConfirmLoading: 'Eliminando...',
      payload: () => this.deleteExperience(),
    }
    const dialogRef = this.dialog.open(DialogCardComponent, {
      data,
      width: '350px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      if (result.state) {
        this.onDeleteSkill.emit(this.skill);
      } else if (result.error) {
        console.log(result.error);
        alert('Error al eliminar la habilidad');
      }
    });
  }

  private deleteExperience(): Observable<any> {
    return this.skillService.deleteSkill(this.skill, this.storageSession.token);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.iconRegistry.ngOnDestroy();
  }

}
