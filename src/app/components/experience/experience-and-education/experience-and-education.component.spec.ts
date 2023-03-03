import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceAndEducationComponent } from './experience-and-education.component';

describe('ExperienceAndEducationComponent', () => {
  let component: ExperienceAndEducationComponent;
  let fixture: ComponentFixture<ExperienceAndEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceAndEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceAndEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
