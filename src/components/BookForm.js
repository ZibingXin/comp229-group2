import React from 'react';

const BookForm = ({
  form,
  setForm,
  selectedBook,
  handleAddOrEditBook,
  cancelEdit,
}) => (
  <div>
    <h2>{selectedBook ? 'Edit Book' : 'Add Book'}</h2>
    <input
      type="text"
      placeholder="Title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
    />
    <input
      type="text"
      placeholder="Author"
      value={form.author}
      onChange={(e) => setForm({ ...form, author: e.target.value })}
    />
    <input
      type="text"
      placeholder="ISBN"
      value={form.isbn}
      onChange={(e) => setForm({ ...form, isbn: e.target.value })}
    />
    <input
      type="text"
      placeholder="Publisher"
      value={form.publisher}
      onChange={(e) => setForm({ ...form, publisher: e.target.value })}
    />
    <input
      type="number"
      placeholder="Year Published"
      value={form.year_published}
      onChange={(e) => setForm({ ...form, year_published: e.target.value })}
    />
    <input
      type="text"
      placeholder="Category"
      value={form.category}
      onChange={(e) => setForm({ ...form, category: e.target.value })}
    />
    <input
      type="number"
      placeholder="Quantity"
      value={form.quantity}
      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
    />
    <button onClick={handleAddOrEditBook}>
      {selectedBook ? 'Update Book' : 'Add Book'}
    </button>
    {selectedBook && <button onClick={cancelEdit}>Cancel Edit</button>}
  </div>
);

export default BookForm;
