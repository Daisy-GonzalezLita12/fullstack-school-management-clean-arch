import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlumnoService } from '../../../core/services/alumno';
import { Alumno } from '../../../core/models/alumno.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './alumno-list.html',
  styleUrls: ['./alumno-list.scss']
})
export class AlumnoListComponent implements OnInit {
  alumnos: Alumno[] = [];
  alumnosFiltrados: Alumno[] = [];
  isLoading: boolean = true;
  editando: boolean = false;
  alumnoSeleccionado: Alumno = this.initAlumno();

  // Búsqueda
  searchTerm: string = '';

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  paginationPages: number[] = [];
  mostrarMasPaginacion: boolean = false;

  // Imagen
  imagenNombre: string = '';

  constructor(
    private readonly alumnoService: AlumnoService
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  // Inicializar alumno vacío
  private initAlumno(): Alumno {
    return {
      id: '',
      nombre: '',
      apellido: '',
      numeroControl: '',
      carrera: '',
      telefono: '',
      email: '',
      imagenurl: ''
    };
  }

  // Cargar todos los alumnos
  cargarAlumnos(): void {
    this.isLoading = true;
    this.alumnoService.getAll().subscribe({
      next: (data) => {
        this.alumnos = data;
        this.alumnosFiltrados = [...this.alumnos];
        this.actualizarPaginacion();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar alumnos', err);
        this.isLoading = false;
      }
    });
  }

  // Filtrar alumnos según búsqueda
  filtrarAlumnos(): void {
    const termino = this.searchTerm.toLowerCase().trim();

    if (!termino) {
      this.alumnosFiltrados = [...this.alumnos];
    } else {
      this.alumnosFiltrados = this.alumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(termino) ||
        alumno.apellido.toLowerCase().includes(termino) ||
        (alumno.id && alumno.id.toString().includes(termino)) ||
        alumno.email.toLowerCase().includes(termino)
      );
    }

    this.currentPage = 1;
    this.actualizarPaginacion();
  }

  // Actualizar lógica de paginación
  actualizarPaginacion(): void {
    this.totalPages = Math.ceil(this.alumnosFiltrados.length / this.itemsPerPage);
    this.totalPages = this.totalPages === 0 ? 1 : this.totalPages;

    // Generar números de página a mostrar
    this.paginationPages = [];
    const maxPaginas = 3;
    let inicio = Math.max(1, this.currentPage - 1);
    let fin = Math.min(this.totalPages, inicio + maxPaginas - 1);

    // Ajustar si no hay suficientes páginas
    if (fin - inicio + 1 < maxPaginas) {
      inicio = Math.max(1, fin - maxPaginas + 1);
    }

    for (let i = inicio; i <= fin; i++) {
      this.paginationPages.push(i);
    }

    this.mostrarMasPaginacion = fin < this.totalPages;
  }

  // Getter para obtener los alumnos de la página actual
  get alumnosEnPagina(): Alumno[] {
    const inicio = (this.currentPage - 1) * this.itemsPerPage;
    const fin = inicio + this.itemsPerPage;
    return this.alumnosFiltrados.slice(inicio, fin);
  }

  // Actualizar la vista con los alumnos filtrados y paginados
  ngDoCheck(): void {
    if (this.alumnosFiltrados.length > 0) {
      const pageAlumnos = this.alumnosEnPagina;
      // Esto asegura que la tabla se actualiza con los cambios de página
    }
  }

  // Funciones de paginación
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.actualizarPaginacion();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.actualizarPaginacion();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.actualizarPaginacion();
  }

  // Nuevo alumno
  nuevoAlumno(): void {
    this.editando = false;
    this.alumnoSeleccionado = this.initAlumno();
    this.imagenNombre = '';
  }

  // Editar alumno
  editarAlumno(alumno: Alumno): void {
    this.editando = true;
    this.alumnoSeleccionado = { ...alumno };
    this.imagenNombre = alumno.imagenurl ? alumno.imagenurl.split('/').pop() || '' : '';
  }

  // Guardar alumno
  guardar(): void {
    if (!this.validarFormulario()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    if (this.editando) {
      const id = typeof this.alumnoSeleccionado.id === 'string' 
        ? parseInt(this.alumnoSeleccionado.id, 10) 
        : (typeof this.alumnoSeleccionado.id === 'number' ? this.alumnoSeleccionado.id : 0);
      if (id === 0) {
        alert('ID inválido');
        return;
      }
      this.alumnoService.update(id, this.alumnoSeleccionado).subscribe({
        next: () => {
          alert('Alumno actualizado exitosamente');
          this.cargarAlumnos();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al actualizar', err);
          alert('Error al actualizar el alumno');
        }
      });
    } else {
      this.alumnoService.create(this.alumnoSeleccionado).subscribe({
        next: () => {
          alert('Alumno guardado exitosamente');
          this.cargarAlumnos();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al crear', err);
          alert('Error al guardar el alumno');
        }
      });
    }
  }

  // Validar formulario
  private validarFormulario(): boolean {
    return (
      this.alumnoSeleccionado.nombre.trim() !== '' &&
      this.alumnoSeleccionado.apellido.trim() !== '' &&
      this.alumnoSeleccionado.email.trim() !== '' &&
      this.alumnoSeleccionado.telefono.trim() !== ''
    );
  }

  // Limpiar formulario
  limpiarFormulario(): void {
    this.alumnoSeleccionado = this.initAlumno();
    this.imagenNombre = '';
    this.editando = false;
  }

  // Manejar carga de imagen
  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Mostrar nombre del archivo
      this.imagenNombre = file.name;

      // Leer archivo como base64 o URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.alumnoSeleccionado.imagenurl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Eliminar alumno
  eliminarAlumno(id: any): void {
    if (id !== undefined && confirm('¿Estás seguro de eliminar este alumno?')) {
      const idNumerico = typeof id === 'string' ? +id : id;

      this.alumnoService.delete(idNumerico).subscribe({
        next: () => {
          alert('Alumno eliminado exitosamente');
          this.cargarAlumnos();
        },
        error: (err) => {
          console.error('Error al borrar', err);
          alert('Error al eliminar el alumno');
        }
      });
    }
  }
}