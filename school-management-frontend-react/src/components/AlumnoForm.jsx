import { useRef } from "react";

export default function AlumnoForm({
  formData = {},
  onChange,
  onImageChange,
  onSubmit,
  onClear,
  isEditing = false,
  mensaje = {}
}) {
  const fileInputRef = useRef(null);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onImageChange?.(file);
  };

  const handleField = (field) => (e) => onChange?.(field, e.target.value);

  return (
    <div style={styles.card}>
      {/* ── Título ── */}
      <h2 style={styles.title}>
        {isEditing ? "EDITAR PERSONA" : "REGISTRAR PERSONA"}
      </h2>

      {/* ── ID Único ── */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>ID Único</label>
        <input
          type="number"
          value={formData.id ?? ""}
          onChange={handleField("id")}
          placeholder="Autogenerado"
          style={styles.input}
          disabled={true}
        />
      </div>

      {/* ── Número de Control ── */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Número de Control</label>
        <input
          type="text"
          value={formData.numeroControl ?? ""}
          onChange={handleField("numeroControl")}
          placeholder="Ej: 20230001"
          style={styles.input}
        />
      </div>

      {/* ── Nombre ── */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Nombre</label>
        <input
          type="text"
          value={formData.nombre ?? ""}
          onChange={handleField("nombre")}
          placeholder="Nombre"
          style={styles.input}
        />
      </div>

      {/* ── Apellido ── */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Apellido</label>
        <input
          type="text"
          value={formData.apellido ?? ""}
          onChange={handleField("apellido")}
          placeholder="Apellido"
          style={styles.input}
        />
      </div>

      {/* ── Teléfono ── */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Teléfono</label>
        <input
          type="tel"
          value={formData.telefono ?? ""}
          onChange={handleField("telefono")}
          placeholder="+34 123 456 789"
          style={styles.input}
        />
      </div>

      {/* ── Correo ── */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Correo Electrónico</label>
        <input
          type="email"
          value={formData.correo ?? ""}
          onChange={handleField("correo")}
          placeholder="usuario@email.com"
          style={styles.input}
        />
      </div>

      {/* ── Imagen de perfil ── */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Imagen de Perfil</label>
        <div style={styles.imageRow}>
          {/* Avatar preview */}
          <div style={styles.avatarWrapper}>
            {(formData.imagenPreview || formData.foto) ? (
              <img
                src={formData.imagenPreview || formData.foto}
                alt="preview"
                style={styles.avatarImg}
              />
            ) : (
              <span style={styles.avatarPlaceholder}>👤</span>
            )}
          </div>

          {/* Upload controls */}
          <div style={styles.uploadCol}>
            <button
              type="button"
              onClick={handleImageClick}
              style={styles.uploadBtn}
            >
              ⬆ Subir Imagen
            </button>
            <span style={styles.fileName}>
              {formData.imagenNombre ?? "Nombre Imagen"}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>

      {/* ── Acciones ── */}
      <div style={styles.actions}>
        <button type="button" onClick={onSubmit} style={styles.btnPrimary}>
          {isEditing ? "Actualizar Persona" : "Guardar Persona"}
        </button>
        <button type="button" onClick={onClear} style={styles.btnSecondary}>
          Limpiar
        </button>
      </div>

      {/* ── Mensaje ── */}
      {mensaje.texto && (
        <div style={{ 
          marginTop: "20px", padding: "12px", borderRadius: "8px", fontWeight: "600", fontSize: "13px", textAlign: "center",
          backgroundColor: mensaje.tipo === "error" ? "#ffebee" : "#e8f5e9",
          color: mensaje.tipo === "error" ? "#c62828" : "#2e7d32",
          border: `1px solid ${mensaje.tipo === "error" ? "#ffcdd2" : "#c8e6c9"}`
        }}>
          {mensaje.tipo === "error" ? "⚠️ " : "✅ "} {mensaje.texto}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Estilos inline (sin dependencia externa)
   Usar Tailwind si el proyecto lo tiene configurado.
───────────────────────────────────────── */
const COLOR = {
  primary: "#1a3a5c",
  primaryHover: "#14304d",
  border: "#c8d6e5",
  bg: "#f4f8fb",
  label: "#1a3a5c",
  placeholder: "#94a3b8",
  white: "#ffffff",
  danger: "#e74c3c",
};

const styles = {
  card: {
    background: COLOR.white,
    border: `4px solid ${COLOR.primary}`,
    borderRadius: 4,
    padding: "24px 28px",
    width: 300,
    fontFamily: "'Segoe UI', sans-serif",
    boxShadow: "0 4px 20px rgba(26,58,92,0.10)",
  },
  title: {
    color: COLOR.primary,
    fontSize: 17,
    fontWeight: 700,
    marginBottom: 18,
    borderBottom: `2px solid ${COLOR.border}`,
    paddingBottom: 10,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: COLOR.label,
    marginBottom: 4,
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    border: `1px solid ${COLOR.border}`,
    borderRadius: 6,
    fontSize: 14,
    color: "#334155",
    outline: "none",
    boxSizing: "border-box",
    background: COLOR.bg,
    transition: "border-color .2s",
  },
  imageRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  avatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    border: `2px solid ${COLOR.border}`,
    background: COLOR.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  avatarPlaceholder: {
    fontSize: 28,
  },
  uploadCol: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
  },
  uploadBtn: {
    background: COLOR.primary,
    color: COLOR.white,
    border: "none",
    borderRadius: 6,
    padding: "7px 12px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background .2s",
  },
  fileName: {
    fontSize: 12,
    color: COLOR.placeholder,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  actions: {
    display: "flex",
    gap: 10,
    marginTop: 20,
  },
  btnPrimary: {
    flex: 1,
    background: COLOR.primary,
    color: COLOR.white,
    border: "none",
    borderRadius: 6,
    padding: "10px 0",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background .2s",
  },
  btnSecondary: {
    flex: 1,
    background: COLOR.white,
    color: COLOR.primary,
    border: `2px solid ${COLOR.primary}`,
    borderRadius: 6,
    padding: "10px 0",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all .2s",
  },
};