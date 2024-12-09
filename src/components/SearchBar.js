import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/BookList.css";

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate('/searchBooks', { state: { query } }); 
    }
  };

  return (
    <div className='search'>
      <input
        type="text"
        placeholder="Enter book title or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
