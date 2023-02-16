import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {DialogContent} from "../shared/DialogContent";
import {DialogCardComponent} from "../dialog-card/dialog-card.component";
import {MatDialog} from "@angular/material/dialog";
import {ModalSkillComponent} from "../modal-skill/modal-skill.component";
import {SkillData} from "../shared/SkillData";

import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {StorageSessionService} from "../../service/storage-session.service";
import {SkillService} from "../../service/skill.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-skill-bar',
  templateUrl: './skill-bar.component.html',
  styleUrls: ['./skill-bar.component.css']
})
export class SkillBarComponent implements OnChanges, OnInit {
  @Input() skill: SkillData = <SkillData>{id: 0, name: 'Skill', level: 0, icon: {name: '', content: ''}};
  public faPenToSquare = faPenToSquare;
  public faTrashCan = faTrashCan;

  public skillLevel: [boolean, boolean, boolean, boolean, boolean] = [false, false, false, false, false];

  constructor(private dialog: MatDialog, private iconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer, private storageSession: StorageSessionService,
              private skillService: SkillService) {
    this.setSkill();
  }

  // ngOnChanges se ejecuta antes que ngOnInit
  ngOnChanges() {
    this.setSkill();
  }

  ngOnInit() {
    this.iconRegistry.addSvgIconLiteral(this.skill.icon.name, this.domSanitizer.bypassSecurityTrustHtml(this.skill.icon.content));
  }

  private setSkill() {
    for (let i = 0; i < this.skill.level; i++) {
      this.skillLevel[i] = true;
    }
  }

  public editSkill() {
    const dialogRef = this.dialog.open(ModalSkillComponent, {
      data: this.skill,
      disableClose: true,
      autoFocus: true,
      width: '450px',
      height: '500px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '100ms',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('edit');
      }
    });
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const data = <DialogContent>{
      title: 'Eliminar habilidad ' + this.skill.name,
      message: '¿Estás seguro de que quieres eliminar esta habilidad?',
      payload: () => this.deleteExperience(),
    }
    const dialogRef = this.dialog.open(DialogCardComponent, {
      data,
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('result true');
      }
      alert('Base de datos no disponible. Inténtelo más tarde.');
    });
  }

  private deleteExperience(): Observable<any> {
    console.log('delete');
    return this.skillService.deleteSkill(this.skill, this.storageSession.tokenValue);
    /*    this.skillService.deleteSkill(this.skill, this.storageSession.tokenValue).subscribe(
          (response) => {
            console.log(response);
          }
        )*/
  }

}
