import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DialogContent } from '../../../core/models/DialogContent';
import { DialogCardComponent } from '../../../shared/components/dialog-card/dialog-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalSkillComponent } from '../modal-skill/modal-skill.component';
import { SkillData } from '../../../core/models/SkillData';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageSessionService } from '../../../core/services/storage-session.service';
import { SkillService } from '../service/skill.service';
import { Observable, Subscription } from 'rxjs';
import { ModalResponse } from '../../../core/models/ModalResponse';
import { ActionForShipment } from '../../../core/models/ActionForShipment';

@Component({
  selector: 'app-skill-bar',
  templateUrl: './skill-bar.component.html',
  styleUrls: ['./skill-bar.component.css'],
})
export class SkillBarComponent implements OnChanges, OnInit, OnDestroy {
  @Output() onUpdatePositions = new EventEmitter<any>();
  @Input() positions: number[] = [];
  @Input() skill: SkillData = <SkillData>{};
  @Output() onDeleteSkill = new EventEmitter<SkillData>();
  @Output() onUpdateSkill = new EventEmitter<SkillData>();
  public isLoggedIn: boolean = false;
  private subscription: Subscription = new Subscription();

  public skillLevel: boolean[] = [false, false, false, false, false];

  constructor(
    private dialog: MatDialog,
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private storageSession: StorageSessionService,
    private skillService: SkillService
  ) {
    this.subscription.add(
      this.storageSession.onToggleSignUp().subscribe((result: boolean) => {
        this.isLoggedIn = result;
      })
    );
    this.setLevelSkill();
  }

  // ngOnChanges se ejecuta antes que ngOnInit
  ngOnChanges() {
    this.setLevelSkill();
  }

  ngOnInit() {
    this.iconRegistry.addSvgIconLiteral(
      this.skill.id!.toString(),
      this.domSanitizer.bypassSecurityTrustHtml(this.skill.icon)
    );
  }

  private setLevelSkill() {
    for (let i = 0; i < this.skill.level; i++) {
      this.skillLevel[i] = true;
    }
  }

  public editSkill() {
    const data = <ActionForShipment>{
      action: 'Editar',
      onAction: (skill: SkillData) => this.skillService.updateSkill(skill),
      setDataToForm: (callback: (skill: SkillData) => void) =>
        callback(this.skill),
      positions: this.positions,
      updatePosition: (itemIsNew, newPosition, oldPosition) => {
        this.onUpdatePositions.emit({ itemIsNew, newPosition, oldPosition });
      },
    };
    const dialogRef = this.dialog.open(ModalSkillComponent, {
      data,
      disableClose: true,
      autoFocus: true,
      restoreFocus: true,
      width: '450px',
      height: '600px',
      maxWidth: '95vw',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((response: ModalResponse) => {
      // Si el backend acepta la modificación (el modal está manejando los errores a diferencia del dialog)
      if (response.state) {
        this.registerIconSvg(
          response.content.id.toString(),
          response.content.icon
        );
        this.onUpdateSkill.emit(response.content as SkillData);
      }
    });
  }

  private registerIconSvg(id: string, icon: string) {
    // TODO: ¿Cómo se puede hacer para que no se repitan los iconos?
    this.iconRegistry.addSvgIconLiteral(
      id,
      this.domSanitizer.bypassSecurityTrustHtml(icon)
    );
  }

  openDeleteDialog(): void {
    const data = <DialogContent>{
      title: 'Eliminar habilidad ' + this.skill.name,
      message: '¿Estás seguro de que quieres eliminar esta habilidad?',
      buttonConfirm: 'Eliminar',
      buttonCancel: 'Cancelar',
      buttonConfirmLoading: 'Eliminando...',
      payload: () => this.deleteExperience(),
    };
    const dialogRef = this.dialog.open(DialogCardComponent, {
      data,
      width: '350px',
      maxWidth: '95vw',
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
    return this.skillService.deleteSkill(this.skill);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // Destruye todos los iconos registrados 'CUIDADO'
    //this.iconRegistry.ngOnDestroy();
  }
}
