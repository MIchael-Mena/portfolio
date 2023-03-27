import {Component, OnInit} from '@angular/core';
import {SkillData} from "../SkillData";
import {SkillService} from "../service/skill.service";
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import {MatDialog} from "@angular/material/dialog";
import {StorageSessionService} from "../../../service/storage-session.service";
import {ModalSkillComponent} from "../modal-skill/modal-skill.component";
import {ModalResponse} from "../../shared/ModalResponse";
import {ActionForShipment} from "../../shared/ActionForShipment";
import {PositionController} from "../../shared/PositionController";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  faSquarePlus = faSquarePlus;
  public isLoggedIn: boolean = false;
  public skills: SkillData[] = [];
  public positionController!: PositionController;
  public isLoading: boolean = true;

  constructor(private skillService: SkillService,
              private storageSession: StorageSessionService,
              private dialog: MatDialog) {
    this.storageSession.onToggleSignUp().subscribe((result: boolean) => {
      this.isLoggedIn = result;
    });
  }

  ngOnInit() {
    this.skillService.SkillsOrder.subscribe((skills: SkillData[]) => {
      this.skills = skills;
      this.positionController = new PositionController(this.skills,
        (skill: SkillData) => this.updatePositionSkillInBackend(skill));
      this.isLoading = false;
    });
  }

  private updatePositionSkillInBackend(skill: SkillData) {
    this.skillService.updatePosition(skill.id!, skill.position).subscribe({
      error: error => {
        console.log(error);
      }
    });
  }

  public updatePositions({
                           itemIsNew,
                           newPosition,
                           oldPosition
                         }: { itemIsNew: boolean, newPosition: number, oldPosition: number }) {
    this.positionController.updatePositionsIfChanged(itemIsNew, newPosition, oldPosition);
  }

  public addSkill() {
    this.positionController.addPosition();
    const data = <ActionForShipment>{
      action: 'Agregar',
      onAction: (skill: SkillData) => this.skillService.addSkill(skill),
      setDataToForm: (callback: (skill: SkillData) => void) => {
      },
      positions: this.positionController.getPositions(),
      updatePosition: (itemIsNew, newPosition, oldPosition) => {
        this.positionController.updatePositionsIfChanged(itemIsNew, newPosition, oldPosition);
      },
    }
    const dialogRef = this.dialog.open(ModalSkillComponent, {
      data,
      disableClose: true,
      autoFocus: true,
      width: '450px',
      height: '600px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      // El usuario ha pulsado el botón de agregar, y el backend ha devuelto el skill creado
      if (result.state) {
        this.skills.push(result.content as SkillData);
        this.reorderSkills()
      } else {
        this.positionController.removePosition();
      }
    });
  }

  public deleteSkill(skill: SkillData): void {
    // Elimino el skill de la lista de skills
    this.skills.splice(skill.position - 1, 1);
    this.positionController.reorderPositionsOnDelete(skill.position);
  }

  public updateSkill(skill: SkillData): void {
    // Actualizo el skill de la lista de skills
    const index = this.skills.findIndex((s: SkillData) => s.id === skill.id);
    this.skills[index] = skill;
    // Ordeno las skills si ha cambiado la posición
    this.reorderSkills();
  }

  private reorderSkills(): void {
    // Ordena las redes sociales por posición para que se reflejen en el front
    this.skills.sort((a, b) => a.position - b.position);
  }

}
