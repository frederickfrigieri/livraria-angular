import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assuntos } from './assuntos.component';

describe('Assuntos', () => {
  let component: Assuntos;
  let fixture: ComponentFixture<Assuntos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Assuntos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Assuntos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
