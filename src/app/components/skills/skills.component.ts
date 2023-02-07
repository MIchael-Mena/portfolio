import {Component} from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  public htmlSkill?: number;

  test(skill: HTMLElement) {
    if (!this.htmlSkill) {
      this.htmlSkill = 10
    } else {
      this.htmlSkill += 10;

    }
    skill.style.setProperty('--html-skill', this.htmlSkill + '%');
  }

}
