import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/products${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ''}`);
  }

  return <form className="search-bar" onSubmit={handleSubmit}><label htmlFor="site-search">Search products</label><input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" /><button type="submit" aria-label="Submit search">→</button></form>;
}
