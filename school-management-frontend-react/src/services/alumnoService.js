const API_URL = "http://localhost:8081/api/alumnos";

export const alumnoService = {
  getAll: async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error fetching alumnos");
    return res.json();
  },
  create: async (alumno) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alumno),
    });
    if (!res.ok) throw new Error("Error creating alumno");
    return res.json();
  },
  update: async (id, alumno) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alumno),
    });
    if (!res.ok) throw new Error("Error updating alumno");
    return res.json();
  },
  delete: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error deleting alumno");
  },
};

export default alumnoService;
