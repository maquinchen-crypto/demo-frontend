// Muestra la tabla de libros. No llama al backend:
// recibe los datos y avisa al padre (App) cuando el usuario quiere editar o eliminar.
export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty">Aún no hay libros. Agrega el primero con el formulario.</p>;
  }

  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Título</th>
          <th>Autor</th>
          <th><span className="sr-only">Acciones</span></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td className="id">{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td className="actions">
              <button type="button" onClick={() => onEdit(book)}>Editar</button>
              <button type="button" className="danger" onClick={() => onDelete(book)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
