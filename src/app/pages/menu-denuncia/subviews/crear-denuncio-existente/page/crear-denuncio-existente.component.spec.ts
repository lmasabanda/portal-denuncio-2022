import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDenuncioExistenteComponent } from './crear-denuncio-existente.component';

describe('CrearDenuncioExistenteComponent', () => {
  let component: CrearDenuncioExistenteComponent;
  let fixture: ComponentFixture<CrearDenuncioExistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDenuncioExistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDenuncioExistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
