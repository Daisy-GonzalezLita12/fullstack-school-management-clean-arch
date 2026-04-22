package com.israel.alumnos.mapper;
import com.israel.alumnos.dto.AlumnoDTO;
import com.israel.alumnos.dto.MateriaDTO;
import com.israel.alumnos.model.Alumno;
import com.israel.alumnos.model.Materia;

import java.util.ArrayList;
import java.util.List;
public class AlumnoMapper {
    public static AlumnoDTO mapearADTO(Alumno alumno) {
        AlumnoDTO dto = new AlumnoDTO();
        dto.setId(alumno.getId());
        dto.setNumeroControl(alumno.getNumeroControl());
        dto.setNombre(alumno.getNombre());
        dto.setApellido(alumno.getApellido());
        dto.setCarrera(alumno.getCarrera());
        dto.setTelefono(alumno.getTelefono());
        dto.setEmail(alumno.getEmail());
        dto.setImagenurl(alumno.getImagenURL());

        // Transformamos la lista de Materias a lista de MateriaDTOs
        List<MateriaDTO> materiasDTO = new ArrayList<>();
        if (alumno.getMaterias() != null) {
            for (Materia materia : alumno.getMaterias()) {
                MateriaDTO matDTO = new MateriaDTO();
                matDTO.setId(materia.getId());
                matDTO.setNombre(materia.getNombre());
                matDTO.setCreditos(materia.getCreditos());
                materiasDTO.add(matDTO);
            }
        }
        dto.setMateriasInscritas(materiasDTO);
        return dto;
    }
}
