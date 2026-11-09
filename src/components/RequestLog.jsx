import { useEffect, useState } from 'react';
import { api } from '../services/bookService';

let nextId = 0;

// Panel didáctico: muestra cada petición HTTP que hace la app
// (método, URL completa y código de respuesta), igual que la pestaña Network.
export default function RequestLog() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const add = (config, status) => {
      const url = `${config.baseURL ?? ''}${config.url}`;
      setEntries((prev) => [
        { id: nextId++, method: config.method.toUpperCase(), url, status },
        ...prev,
      ].slice(0, 6));
    };

    // Los interceptores se ejecutan en cada respuesta de axios
    const interceptor = api.interceptors.response.use(
      (response) => { add(response.config, response.status); return response; },
      (error) => { add(error.config, error.response?.status ?? 'sin respuesta'); return Promise.reject(error); },
    );
    return () => api.interceptors.response.eject(interceptor);
  }, []);

  return (
    <aside className="request-log" aria-label="Peticiones HTTP recientes">
      <h2>Peticiones al backend</h2>
      {entries.length === 0 ? (
        <p className="muted">Todavía no hay peticiones.</p>
      ) : (
        <ol>
          {entries.map((e) => (
            <li key={e.id} className={typeof e.status === 'number' && e.status < 400 ? 'ok' : 'fail'}>
              <span className={`method m-${e.method.toLowerCase()}`}>{e.method}</span>
              <span className="url">{e.url}</span>
              <span className="status">{e.status}</span>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}
