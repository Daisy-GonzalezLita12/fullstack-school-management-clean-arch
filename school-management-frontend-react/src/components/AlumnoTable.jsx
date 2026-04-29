import { useState } from "react";

/**
 * SCH-12 — AlumnoTable
 * Tabla de personas registradas con búsqueda, edición, eliminación y paginación.
 *
 * Props:
 *  - alumnos     : Array<{ id, nombre, apellido, telefono, correo, foto }>
 *  - onEdit      : (alumno) => voiad
 *  - onDelete    : (id) => void
 *  - onNuevo     : () => void
 */
export default function AlumnoTable({
  alumnos = [],
  onEdit,
  onDelete,
  onNuevo,
}) {
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 5;

  // ── Filtrado ──
  const filtrados = alumnos.filter((a) => {
    const q = busqueda.toLowerCase();
    return (
      String(a.id).includes(q) ||
      a.numeroControl?.toLowerCase().includes(q) ||
      a.nombre?.toLowerCase().includes(q) ||
      a.correo?.toLowerCase().includes(q)
    );
  });

  // ── Paginación ──
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const inicio = (paginaActual - 1) * porPagina;
  const paginados = filtrados.slice(inicio, inicio + porPagina);

  const irPagina = (n) => {
    if (n >= 1 && n <= totalPaginas) setPaginaActual(n);
  };

  return (
    <div style={s.card}>

      {/* ── Encabezado ── */}
      <div style={s.header}>
        <h2 style={s.title}>LISTA DE PERSONAS REGISTRADAS</h2>
      </div>

      {/* ── Barra de búsqueda + botón ── */}
      <div style={s.toolbar}>
        <input
          type="text"
          placeholder="🔍 Buscar por Nombre, ID, Correo..."
          value={busqueda}
          onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
          style={s.searchInput}
        />
        <button onClick={onNuevo} style={s.btnNuevo}>
          Nueva Persona
        </button>
      </div>

      {/* ── Tabla ── */}
      <div style={s.tableWrapper}>
        <table style={s.table}>
          <thead>
            <tr>
              {["Foto", "ID", "No. Control", "Nombre", "Apellido", "Teléfono", "Correo", "Acciones"].map((col) => (
                <th key={col} style={s.th}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginados.length === 0 ? (
              <tr>
                <td colSpan={8} style={s.empty}>No hay personas registradas</td>
              </tr>
            ) : (
              paginados.map((alumno, i) => (
                <tr
                  key={alumno.id}
                  style={{ background: i % 2 === 0 ? "#ffffff" : "#f8fafc" }}
                >
                  {/* Foto */}
                  <td style={s.td}>
                    <div style={s.avatarWrapper}>
                      {alumno.foto ? (
                        <img src={alumno.foto} alt={alumno.nombre} style={s.avatarImg} />
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={1.5}>
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                      )}
                    </div>
                  </td>
                  <td style={s.td}>{alumno.id}</td>
                  <td style={s.td}>{alumno.numeroControl}</td>
                  <td style={s.td}>{alumno.nombre}</td>
                  <td style={s.td}>{alumno.apellido}</td>
                  <td style={s.td}>{alumno.telefono}</td>
                  <td style={s.td}>{alumno.correo}</td>

                  {/* Acciones */}
                  <td style={s.td}>
                    <div style={s.acciones}>
                      <button onClick={() => onEdit?.(alumno)} style={s.btnEditar} title="Editar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: '0 auto' }}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                      </button>
                      <button onClick={() => onDelete?.(alumno.id)} style={s.btnEliminar} title="Eliminar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: '0 auto', marginBottom: '2px' }}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        <span style={{ fontSize: '10px', display: 'block' }}>Eliminar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Paginación ── */}
      <div style={s.pagination}>
        <button onClick={() => irPagina(paginaActual - 1)} disabled={paginaActual === 1} style={s.pageBtn}>
          ‹
        </button>
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => irPagina(n)}
            style={n === paginaActual ? s.pageBtnActive : s.pageBtn}
          >
            {n}
          </button>
        ))}
        <button onClick={() => irPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} style={s.pageBtn}>
          ›
        </button>
      </div>

    </div>
  );
}

/* ── Estilos ── */
const C = {
  primary: "#1a3a5c",
  border: "#c8d6e5",
  bg: "#f4f8fb",
  danger: "#e74c3c",
  dangerHover: "#c0392b",
  white: "#ffffff",
};

const s = {
  card: {
    background: C.white,
    border: `1.5px solid ${C.border}`,
    borderRadius: 12,
    padding: "20px 24px",
    fontFamily: "'Segoe UI', sans-serif",
    boxShadow: "0 4px 20px rgba(26,58,92,0.08)",
    width: "100%",
    boxSizing: "border-box",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    color: C.primary,
    fontSize: 17,
    fontWeight: 700,
    margin: 0,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    padding: "8px 14px",
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    fontSize: 13,
    background: C.bg,
    outline: "none",
    color: "#334155",
  },
  btnNuevo: {
    background: C.primary,
    color: C.white,
    border: "none",
    borderRadius: 8,
    padding: "9px 18px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },
  th: {
    background: "#64748b",
    color: C.white,
    padding: "10px 14px",
    textAlign: "left",
    fontWeight: 600,
    fontSize: 12,
    whiteSpace: "nowrap",
  },
  td: {
    padding: "10px 14px",
    borderBottom: `1px solid ${C.border}`,
    color: "#334155",
    verticalAlign: "middle",
  },
  empty: {
    textAlign: "center",
    padding: "32px",
    color: "#94a3b8",
    fontSize: 14,
  },
  avatarWrapper: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: `2px solid ${C.border}`,
    background: C.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  acciones: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  btnEditar: {
    background: "transparent",
    color: "#334155",
    border: "none",
    padding: "4px",
    cursor: "pointer",
  },
  btnEliminar: {
    background: "transparent",
    color: "#334155",
    border: "none",
    padding: "4px",
    cursor: "pointer",
    textAlign: "center",
  },
  pagination: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
  },
  pageBtn: {
    background: C.white,
    color: C.primary,
    border: `1.5px solid ${C.border}`,
    borderRadius: 6,
    padding: "5px 11px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  pageBtnActive: {
    background: C.primary,
    color: C.white,
    border: `1.5px solid ${C.primary}`,
    borderRadius: 6,
    padding: "5px 11px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
};