# books-frontend

Frontend React (Vite + axios) que hace el CRUD de libros contra el backend Spring Boot `demo` (`/api/books`).

## Ejecutar

1. Levanta el backend Spring Boot (puerto 8080).
2. En esta carpeta:

```bash
npm install
npm run dev
```

3. Abre http://localhost:3000

## Dónde está la conexión con el backend

| Pieza | Archivo | Qué hace |
|---|---|---|
| URL del backend | `.env` | `VITE_API_URL=http://localhost:8080` |
| Capa de servicio | `src/services/bookService.js` | Una función por endpoint del `BookController` |
| Permiso del backend | `SecurityConfig.java` (backend) | CORS para `http://localhost:3000` |

El panel "Peticiones al backend" muestra cada llamada (método, URL y código de respuesta),
igual que la pestaña Network de DevTools.

## Contrato con el backend

| Acción | Método | URL | Body | Respuesta |
|---|---|---|---|---|
| Listar | GET | /api/books | — | 200 + lista |
| Obtener | GET | /api/books/{id} | — | 200 + libro, 404 |
| Crear | POST | /api/books | `{ title, author }` | 201 + libro con id |
| Actualizar | PUT | /api/books/{id} | `{ title, author }` | 200 + libro, 404 |
| Eliminar | DELETE | /api/books/{id} | — | 204, 404 |

## Notas

- Vite usa el puerto 5173 por defecto; aquí se fijó en 3000 (`vite.config.js`) para calzar con el CORS de la guía 3.2.2.
- En desarrollo verás dos GET al cargar: es `StrictMode` de React montando los efectos dos veces. En build de producción ocurre una sola vez.
