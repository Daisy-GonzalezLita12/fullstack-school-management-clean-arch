import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoFormComponent } from './alumno-form';

describe('AlumnoFormComponent', () => {
  let component: AlumnoFormComponent;
  let fixture: ComponentFixture<AlumnoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlumnoFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
