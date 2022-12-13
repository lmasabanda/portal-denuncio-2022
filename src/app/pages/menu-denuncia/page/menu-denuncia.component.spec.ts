import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDenunciaComponent } from './menu-denuncia.component';

describe('MenuDenunciaComponent', () => {
  let component: MenuDenunciaComponent;
  let fixture: ComponentFixture<MenuDenunciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDenunciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
