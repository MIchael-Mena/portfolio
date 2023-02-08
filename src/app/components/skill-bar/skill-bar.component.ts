import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-skill-bar',
  templateUrl: './skill-bar.component.html',
  styleUrls: ['./skill-bar.component.css']
})
export class SkillBarComponent implements OnChanges {
  @Input() skill: number = 0;
  @Input() skillName: string = 'Skill';
  @Input() iconSkill: any;

  public skillLevel: [boolean, boolean, boolean, boolean, boolean] = [false, false, false, false, false];

  constructor() {
    this.setSkill();
  }

  ngOnChanges() {
    this.setSkill();
  }

  public upSkillLevel() {
    if (this.skill < 6) {
      this.skill++;
      this.skillLevel[this.skill - 1] = true;
    }
  }

  private setSkill() {
    for (let i = 0; i < this.skill; i++) {
      this.skillLevel[i] = true;
    }
  }

}
