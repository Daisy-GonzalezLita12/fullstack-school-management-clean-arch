
import { Routes } from '@angular/router';
import { AlumnoListComponent } from './features/alumnos/alumno-list/alumno-list.component';
import { AlumnoFormComponent } from './features/alumnos/alumno-form/alumno-form'

export const routes: Routes = [
  { path: 'alumnos', component: AlumnoListComponent },
  { path: 'alumnos/nuevo', component: AlumnoFormComponent },
  { path: 'alumnos/editar/:id', component: AlumnoFormComponent },
  { path: '', redirectTo: '/alumnos', pathMatch: 'full' }
];