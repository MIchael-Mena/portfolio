import {Component} from '@angular/core';
import {faCss3, faHtml5, faJs, faAngular, faReact, faNodeJs, faPython, faJava}
  from "@fortawesome/free-brands-svg-icons";
import {faDatabase} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  public faHtml5 = faHtml5;
  public faCss3 = faCss3;
  public faJs = faJs;
  public faAngular = faAngular;
  public faReact = faReact;
  public faNodeJs = faNodeJs;
  public faPython = faPython;
  public faJava = faJava;
  public faDatabase = faDatabase;
  public SkillCSS: number = 5;
  public SkillHTML: number = 5;
  public SkillJS: number = 5;
  public SkillAngular: number = 5;
  public SkillReact: number = 5;
  public SkillNodeJS: number = 5;
  public SkillPython: number = 5;
  public SkillJava: number = 5;

  public SkillDatabase: number = 5;

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
