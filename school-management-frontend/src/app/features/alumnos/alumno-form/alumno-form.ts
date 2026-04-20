import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from '../../../core/services/alumno';
import { Alumno } from '../../../core/models/alumno.model';

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alumno-form.html',
  styleUrl: './alumno-form.scss'
})
export class AlumnoFormComponent implements OnInit {

  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    edad: new FormControl<number | null>(null, [Validators.required, Validators.min(1)])
  });

  modoEdicion = false;
  alumnoId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alumnoService: AlumnoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEdicion = true;
      this.alumnoId = +id;
      this.alumnoService.getById(this.alumnoId).subscribe(alumno => {
        this.form.patchValue(alumno);
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;
    const alumno = this.form.value as Alumno;
    if (this.modoEdicion && this.alumnoId) {
      this.alumnoService.update(this.alumnoId, alumno).subscribe(() => {
        this.router.navigate(['/alumnos']);
      });
    } else {
      this.alumnoService.create(alumno).subscribe(() => {
        this.router.navigate(['/alumnos']);
      });
    }
  }
}