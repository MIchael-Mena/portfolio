import {Component} from '@angular/core';
import {SkillData} from "../shared/SkillData";
import {SkillService} from "../../service/skill.service";
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import {MatDialog} from "@angular/material/dialog";
import {StorageSessionService} from "../../service/storage-session.service";
import {ModalSkillComponent} from "../modal-skill/modal-skill.component";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  faSquarePlus = faSquarePlus;
  public skills?: SkillData[]

  constructor(private skillService: SkillService,
              private storageSession: StorageSessionService,
              private dialog: MatDialog) {
    this.skillService.skills.subscribe((skills: SkillData[]) => {
      this.skills = skills;
    });
  }

  public addSkill() {
    const dialogRef = this.dialog.open(ModalSkillComponent, {
      data: null,
      disableClose: true,
      autoFocus: true,
      width: '450px',
      height: '500px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '100ms',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.skillService.addSkill(result);
      }
    });
  }


}
