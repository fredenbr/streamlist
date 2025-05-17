import React, { useState } from 'react';
import './StreamList.css';  // Reuse the same CSS for consistency

function TMDBSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => setQuery(e.target.value);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const apiKey = '4a669eca996a0a8507d551d96eeffb0f'; // Your API key
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    const data = await response.json();
    setResults(data.results || []);
  };

  return (
    <div className="streamlist-container">
      <h1 className="streamlist-title">Search Movies</h1>
      <div className="form-container">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter movie name"
          className="movie-input"
        />
        <button onClick={handleSearch} className="add-button">Search</button>
      </div>
      <ul className="movie-list">
        {results.map(movie => (
          <li key={movie.id} className="movie-item">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}
                className="movie-poster"
              />
            )}
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p><strong>Release Date:</strong> {movie.release_date || 'N/A'}</p>
              <p className="overview">{movie.overview || 'No description available.'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TMDBSearch;
