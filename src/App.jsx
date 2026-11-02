import { useEffect, useState } from 'react';
import BookService, { describeError } from './services/bookService';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import RequestLog from './components/RequestLog';

export default function App() {
  const [books, setBooks] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [message, setMessage] = useState(null); // { type: 'ok' | 'error', text }

  // READ: carga la lista desde el backend
  const loadBooks = async () => {
    try {
      const response = await BookService.getAll();
      setBooks(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: describeError(error) });
    }
  };

  // Se ejecuta una sola vez, al montar el componente
  useEffect(() => {
    loadBooks();
  }, []);

  // CREATE o UPDATE según si estamos editando
  const handleSave = async (book) => {
    try {
      if (bookToEdit) {
        await BookService.update(bookToEdit.id, book);
        setMessage({ type: 'ok', text: `Libro #${bookToEdit.id} actualizado.` });
        setBookToEdit(null);
      } else {
        const response = await BookService.create(book);
        setMessage({ type: 'ok', text: `Libro creado con id ${response.data.id}.` });
      }
      await loadBooks();
      return true;
    } catch (error) {
      setMessage({ type: 'error', text: describeError(error) });
      return false;
    }
  };

  // DELETE
  const handleDelete = async (book) => {
    if (!window.confirm(`¿Eliminar "${book.title}"?`)) return;
    try {
      await BookService.remove(book.id);
      setMessage({ type: 'ok', text: `Libro "${book.title}" eliminado.` });
      if (bookToEdit?.id === book.id) setBookToEdit(null);
      await loadBooks();
    } catch (error) {
      setMessage({ type: 'error', text: describeError(error) });
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Libros</h1>
        <p className="muted">React en :3000 consumiendo la API de Spring Boot en :8080</p>
      </header>

      {message && (
        <div className={`message ${message.type}`} role="status">
          <span>{message.text}</span>
          <button type="button" onClick={() => setMessage(null)} aria-label="Cerrar mensaje">×</button>
        </div>
      )}

      <main className="layout">
        <section>
          <BookForm
            bookToEdit={bookToEdit}
            onSave={handleSave}
            onCancel={() => setBookToEdit(null)}
          />
          <BookList books={books} onEdit={setBookToEdit} onDelete={handleDelete} />
        </section>
        <RequestLog />
      </main>
    </div>
  );
}
