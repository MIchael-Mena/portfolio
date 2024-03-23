import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditImgComponent } from './modal-edit-img.component';

describe('ModalEditImgComponent', () => {
  let component: ModalEditImgComponent;
  let fixture: ComponentFixture<ModalEditImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
