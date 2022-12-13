import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDenuncioComponent } from './crear-denuncio.component';

describe('CrearDenuncioComponent', () => {
  let component: CrearDenuncioComponent;
  let fixture: ComponentFixture<CrearDenuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDenuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDenuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
