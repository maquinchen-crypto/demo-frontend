import { useEffect, useState } from 'react';

// Formulario para crear o editar.
// Si recibe "bookToEdit" está en modo edición; si es null, en modo creación.
export default function BookForm({ bookToEdit, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Cuando cambia el libro a editar, cargamos sus datos en los campos
  useEffect(() => {
    setTitle(bookToEdit?.title ?? '');
    setAuthor(bookToEdit?.author ?? '');
  }, [bookToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Este objeto es el JSON que viaja en el body.
    // Los nombres deben coincidir con los atributos de Book.java
    const ok = await onSave({ title: title.trim(), author: author.trim() });
    if (ok && !bookToEdit) {
      setTitle('');
      setAuthor('');
    }
  };

  const isEditing = Boolean(bookToEdit);

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? `Editar libro #${bookToEdit.id}` : 'Nuevo libro'}</h2>

      <label>
        Título
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <label>
        Autor
        <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </label>

      <div className="form-actions">
        <button type="submit" className="primary">
          {isEditing ? 'Guardar cambios' : 'Agregar libro'}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancel}>Cancelar</button>
        )}
      </div>
    </form>
  );
}
