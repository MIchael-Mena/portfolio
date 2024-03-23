import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';

import {ButtonConfirmComponent} from './button-confirm.component';

describe('ButtonConfirmComponent', () => {
  let component: ButtonConfirmComponent;
  let fixture: ComponentFixture<ButtonConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonConfirmComponent],
      imports: [MatButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
