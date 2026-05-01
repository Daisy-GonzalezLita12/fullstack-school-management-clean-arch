import { useState, useEffect } from "react";
import AlumnoForm from "../components/AlumnoForm";
import AlumnoTable from "../components/AlumnoTable";
import alumnoService from "../services/alumnoService";

export default function AlumnosPage() {
  const [alumnos, setAlumnos] = useState([]);
  const [formData, setFormData] = useState({});
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const cargarAlumnos = async () => {
    try {
      const data = await alumnoService.getAll();
      setAlumnos(data);
    } catch (error) {
      console.error("Error al cargar alumnos", error);
    }
  };

  useEffect(() => {
    cargarAlumnos();
  }, []);

  const handleChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 400; // Reducimos la imagen a 400px de ancho para que no pese casi nada
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Comprimimos a JPEG con 70% de calidad
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

        setFormData(prev => ({
          ...prev,
          imagenNombre: file.name,
          imagenPreview: compressedBase64,
          foto: compressedBase64
        }));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleGuardar = async () => {
    setMensaje({ tipo: "", texto: "" });
    if (!formData.nombre || !formData.apellido || !formData.numeroControl || !formData.telefono || !formData.correo) {
      setMensaje({ tipo: "error", texto: "Por favor, completa todos los campos requeridos." });
      return;
    }

    // Validar Número de Control: exactamente 8 números
    if (!/^\d{8}$/.test(formData.numeroControl)) {
      setMensaje({ tipo: "error", texto: "El Número de Control debe ser de exactamente 8 dígitos numéricos." });
      return;
    }

    // Validar Nombre y Apellido: Solo letras y espacios
    const letrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!letrasRegex.test(formData.nombre)) {
      setMensaje({ tipo: "error", texto: "El Nombre solo puede contener letras." });
      return;
    }
    if (!letrasRegex.test(formData.apellido)) {
      setMensaje({ tipo: "error", texto: "El Apellido solo puede contener letras." });
      return;
    }

    // Validar Teléfono: exactamente 10 números
    if (!/^\d{10}$/.test(formData.telefono)) {
      setMensaje({ tipo: "error", texto: "El Teléfono debe tener exactamente 10 dígitos numéricos." });
      return;
    }

    // Validar Correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      setMensaje({ tipo: "error", texto: "Por favor, ingresa un correo electrónico válido." });
      return;
    }

    try {
      if (formData.id) {
        await alumnoService.update(formData.id, formData);
        setMensaje({ tipo: "success", texto: "¡Persona actualizada correctamente!" });
      } else {
        await alumnoService.create(formData);
        setMensaje({ tipo: "success", texto: "¡Persona guardada correctamente!" });
      }
      setFormData({});
      cargarAlumnos();
      setTimeout(() => setMensaje({ tipo: "", texto: "" }), 3000);
    } catch (error) {
      console.error("Error al guardar alumno", error);
      setMensaje({ tipo: "error", texto: "Hubo un problema al comunicarse con el servidor." });
    }
  };

  const handleEditar = (alumno) => {
    setFormData(alumno);
  };

  const [alumnoAEliminar, setAlumnoAEliminar] = useState(null);

  const confirmarEliminar = (id) => {
    setAlumnoAEliminar(id);
  };

  const ejecutarEliminacion = async () => {
    if (!alumnoAEliminar) return;
    try {
      await alumnoService.delete(alumnoAEliminar);
      setMensaje({ tipo: "success", texto: "¡Persona eliminada correctamente!" });
      cargarAlumnos();
      setTimeout(() => setMensaje({ tipo: "", texto: "" }), 3000);
    } catch (error) {
      console.error("Error al eliminar alumno", error);
      setMensaje({ tipo: "error", texto: "No se pudo eliminar a la persona. Verifica la consola." });
    } finally {
      setAlumnoAEliminar(null);
    }
  };

  const handleNuevo = () => {
    setFormData({});
    setMensaje({ tipo: "", texto: "" });
  };

  return (
    <div style={{ padding: "30px 20px", minHeight: "100vh", backgroundColor: "#f4f8fb", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Encabezado */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30px", color: "#1a3a5c" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "12px" }}>
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "800", letterSpacing: "0.5px" }}>SISTEMA DE GESTIÓN DE PERSONAS</h1>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "nowrap" }}>
          <div style={{ flexShrink: 0 }}>
            <AlumnoForm
              formData={formData}
              onChange={handleChange}
              onImageChange={handleImage}
              onSubmit={handleGuardar}
              onClear={() => setFormData({})}
              isEditing={!!formData.id}
              mensaje={mensaje}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <AlumnoTable
              alumnos={alumnos}
              onEdit={handleEditar}
              onDelete={confirmarEliminar}
              onNuevo={handleNuevo}
            />
          </div>
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      {alumnoAEliminar && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999, backdropFilter: "blur(4px)"
        }}>
          <div style={{
            background: "white", padding: "32px", borderRadius: "16px", width: "420px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)", textAlign: "center",
            animation: "fadeIn 0.2s ease-out"
          }}>
            <div style={{ background: "#fee2e2", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </div>
            <h3 style={{ marginTop: 0, color: "#0f172a", fontSize: "20px", fontWeight: "700" }}>¿Eliminar persona?</h3>
            <p style={{ color: "#64748b", margin: "16px 0 24px", fontSize: "15px", lineHeight: "1.5" }}>
              ¿Estás seguro de que deseas eliminar a esta persona del sistema? Esta acción es definitiva y no podrás deshacerla.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <button 
                onClick={() => setAlumnoAEliminar(null)}
                style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "white", color: "#475569", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
              >
                Cancelar
              </button>
              <button 
                onClick={ejecutarEliminacion}
                style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "none", background: "#ef4444", color: "white", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
