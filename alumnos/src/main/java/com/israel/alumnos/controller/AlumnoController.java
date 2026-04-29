package com.israel.alumnos.controller;

import com.israel.alumnos.model.Alumno;
import com.israel.alumnos.repository.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumnos")
@CrossOrigin(origins = "http://localhost:5173")
public class AlumnoController {

    @Autowired
    private AlumnoRepository alumnoRepository;

    @GetMapping
    public List<Alumno> getAllAlumnos() {
        return alumnoRepository.findAll();
    }

    @PostMapping
    public Alumno createAlumno(@RequestBody Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alumno> getAlumnoById(@PathVariable Long id) {
        return alumnoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alumno> updateAlumno(@PathVariable Long id, @RequestBody Alumno alumnoDetails) {
        return alumnoRepository.findById(id)
                .map(alumno -> {
                    alumno.setNumeroControl(alumnoDetails.getNumeroControl());
                    alumno.setNombre(alumnoDetails.getNombre());
                    alumno.setApellido(alumnoDetails.getApellido());
                    alumno.setTelefono(alumnoDetails.getTelefono());
                    alumno.setCorreo(alumnoDetails.getCorreo());
                    Alumno updatedAlumno = alumnoRepository.save(alumno);
                    return ResponseEntity.ok(updatedAlumno);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlumno(@PathVariable Long id) {
        return alumnoRepository.findById(id)
                .map(alumno -> {
                    alumnoRepository.delete(alumno);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
