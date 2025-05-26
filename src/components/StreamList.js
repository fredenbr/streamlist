import React, { useState, useEffect } from 'react';
import './StreamList.css';

function Streamlist() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    try {
      const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
      setMovies(storedMovies);
    } catch (error) {
      console.error("Error loading movies from localStorage:", error);
      setMovies([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const handleAddMovie = () => {
    if (newMovie.trim()) {
      const movie = {
        id: Date.now(),
        text: newMovie.trim(),
        watched: false,
      };
      setMovies([...movies, movie]);
      setNewMovie('');
    }
  };

  const handleDeleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const handleToggleWatched = (id) => {
    setMovies(movies.map(movie =>
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    ));
  };

  const handleEditClick = (movie) => {
    setEditingId(movie.id);
    setEditingText(movie.text);
  };

  const handleSaveEdit = (id) => {
    if (editingText.trim()) {
      setMovies(movies.map(movie =>
        movie.id === id ? { ...movie, text: editingText.trim() } : movie
      ));
      setEditingId(null);
      setEditingText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (editingId !== null) {
        handleSaveEdit(editingId);
      } else {
        handleAddMovie();
      }
    }
  };

  return (
    <div className="streamlist-container">
      <h2>My Streamlist</h2>
      <div className="add-movie-form">
        <label htmlFor="new-movie-input" className="visually-hidden">Add new movie</label>
        <input
          id="new-movie-input"
          type="text"
          placeholder="Add a new movie"
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
          onKeyPress={handleKeyPress}
          className="movie-input"
        />
        <button onClick={handleAddMovie} className="add-button">Add Movie</button>
      </div>
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.id} className={`movie-item ${movie.watched ? 'watched' : ''}`}>
            {editingId === movie.id ? (
              <div className="edit-form">
                <label htmlFor={`edit-movie-input-${movie.id}`} className="visually-hidden">Edit movie title</label>
                <input
                  id={`edit-movie-input-${movie.id}`}
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="edit-input"
                />
                <button onClick={() => handleSaveEdit(movie.id)} className="save-button">Save</button>
                <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
              </div>
            ) : (
              <>
                <input
                  type="checkbox"
                  id={`movie-${movie.id}`}
                  checked={movie.watched}
                  onChange={() => handleToggleWatched(movie.id)}
                  className="watched-checkbox"
                />
                <label htmlFor={`movie-${movie.id}`} className="movie-text">
                  {movie.text}
                </label>
                <div className="movie-buttons">
                  <button
                    onClick={() => handleEditClick(movie)}
                    className="edit-button"
                    aria-label={`Edit ${movie.text}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMovie(movie.id)}
                    className="delete-button"
                    aria-label={`Delete ${movie.text}`}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Streamlist;
