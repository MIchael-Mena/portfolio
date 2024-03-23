import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModalComponent } from './button-modal.component';

describe('ButtonModalComponent', () => {
  let component: ButtonModalComponent;
  let fixture: ComponentFixture<ButtonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
