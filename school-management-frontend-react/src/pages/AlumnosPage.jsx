import { useState } from "react";
import AlumnoForm from "../components/AlumnoForm";
import AlumnoTable from "../components/AlumnoTable";

export default function AlumnosPage() {
  const [alumnos, setAlumnos] = useState([]);
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleImage = (file) => {
    setFormData(prev => ({
      ...prev,
      imagenNombre: file.name,
      imagenPreview: URL.createObjectURL(file),
    }));
  };

  const handleGuardar = (nuevoAlumno) => {
    setAlumnos(prev => [...prev, nuevoAlumno]);
    setFormData({});
  };

  const handleEditar = (alumno) => {
    setFormData(alumno);
  };

  const handleEliminar = (id) => {
    setAlumnos(prev => prev.filter(a => a.id !== id));
  };

  const handleNuevo = () => {
    setFormData({});
  };

  return (
    <div style={{ padding: "30px 20px", minHeight: "100vh", backgroundColor: "#f4f8fb", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px", color: "#1a3a5c" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "12px" }}>
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "800", letterSpacing: "0.5px" }}>SISTEMA DE GESTIÓN DE PERSONAS</h1>
        </div>
        
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "nowrap" }}>
          <div style={{ flexShrink: 0 }}>
            <AlumnoForm
              formData={formData}
              onChange={handleChange}
              onImageChange={handleImage}
              onSubmit={handleGuardar}
              onClear={() => setFormData({})}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <AlumnoTable
              alumnos={alumnos}
              onEdit={handleEditar}
              onDelete={handleEliminar}
              onNuevo={handleNuevo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
