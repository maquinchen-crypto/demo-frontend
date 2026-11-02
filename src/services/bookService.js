import axios from 'axios';

// ─────────────────────────────────────────────────────────────
// ESTE ARCHIVO ES LA CONEXIÓN ENTRE EL FRONTEND Y EL BACKEND.
// Todas las llamadas HTTP de la app pasan por aquí.
// ─────────────────────────────────────────────────────────────

// 1. ¿Dónde está el backend? Lo leemos del archivo .env
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
});

// 2. ¿Qué recurso consumimos? El @RequestMapping del BookController
const RESOURCE = '/api/books';

// 3. Una función por cada endpoint del controller
const BookService = {
  // GET /api/books          → 200 + lista de libros
  getAll: () => api.get(RESOURCE),

  // GET /api/books/{id}     → 200 + libro | 404
  getById: (id) => api.get(`${RESOURCE}/${id}`),

  // POST /api/books         → 201 + libro creado (con su id)
  create: (book) => api.post(RESOURCE, book),

  // PUT /api/books/{id}     → 200 + libro actualizado | 404
  update: (id, book) => api.put(`${RESOURCE}/${id}`, book),

  // DELETE /api/books/{id}  → 204 sin contenido | 404
  remove: (id) => api.delete(`${RESOURCE}/${id}`),
};

export default BookService;

// Traduce un error de axios a un mensaje entendible.
export function describeError(error) {
  if (error.response) {
    // El backend respondió, pero con un código de error (4xx / 5xx)
    const { status, data } = error.response;
    return `El backend respondió ${status}: ${data?.error ?? 'error sin detalle'}`;
  }
  if (error.request) {
    // La petición salió, pero no llegó ninguna respuesta legible.
    // Las dos causas típicas: backend apagado o CORS no configurado.
    return 'No hubo respuesta del backend. Revisa que Spring Boot esté corriendo en el puerto 8080 y que CORS permita http://localhost:3000 (detalle en DevTools → Console).';
  }
  return `Error inesperado: ${error.message}`;
}
