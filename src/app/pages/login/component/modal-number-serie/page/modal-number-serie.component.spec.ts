import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNumberSerieComponent } from './modal-number-serie.component';

describe('ModalNumberSerieComponent', () => {
  let component: ModalNumberSerieComponent;
  let fixture: ComponentFixture<ModalNumberSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNumberSerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNumberSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
