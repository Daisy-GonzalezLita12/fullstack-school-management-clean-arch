package com.israel.alumnos.dto;
import java.util.List;
import lombok.Data;

@Data
public class AlumnoDTO {
    private Long id;
    private String numeroControl;
    private String nombre;
    private String apellido;
    private String nombreCompleto; // Uniremos nombre y apellido 
    private String carrera;
    private String telefono;
    private String email;
    private String imagenurl;
    private List<MateriaDTO> materiasInscritas;
}
