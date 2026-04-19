import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private apiUrl = `${environment.baseUrl}/alumnos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.apiUrl}/traer-alumnos`);
  }

  getById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/traer-alumno/${id}`);
  }

  create(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.apiUrl}/insertar-alumnos`, alumno);
  }

  update(id: number, alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/editar-alumnos/${id}`, alumno);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar-alumnos/${id}`);
  }
}