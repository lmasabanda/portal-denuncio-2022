import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMenuDenunciasComponent } from './card-menu-denuncias.component';

describe('CardMenuDenunciasComponent', () => {
  let component: CardMenuDenunciasComponent;
  let fixture: ComponentFixture<CardMenuDenunciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMenuDenunciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMenuDenunciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
