import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalSocialNetworkComponent} from './modal-social-network.component';

describe('ModalSocialMediaComponent', () => {
  let component: ModalSocialNetworkComponent;
  let fixture: ComponentFixture<ModalSocialNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSocialNetworkComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalSocialNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
