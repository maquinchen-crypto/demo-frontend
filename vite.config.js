import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Usamos el puerto 3000 para que coincida con el CORS de la guía 3.2.2
// (por defecto Vite usa el 5173).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
  },
});
