import React, { useState } from 'react';
import './StreamList.css';

function StreamList() {
  const [movie, setMovie] = useState('');
  const [movies, setMovies] = useState([]);

  const handleChange = (e) => {
    setMovie(e.target.value);
  };

  const handleAdd = () => {
    if (movie.trim() !== '') {
      setMovies([
        ...movies,
        { id: Date.now(), title: movie, completed: false },
      ]);
      setMovie('');
    }
  };

  const handleToggle = (id) => {
    setMovies(
      movies.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
  };

  const handleDelete = (id) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

  const handleEdit = (id) => {
    const newTitle = prompt('Edit the movie title:');
    if (newTitle && newTitle.trim() !== '') {
      setMovies(
        movies.map((m) =>
          m.id === id ? { ...m, title: newTitle } : m
        )
      );
    }
  };

  return (
    <div className="streamlist-container">
      <h1 className="streamlist-title">StreamList</h1>
      <div className="form-container">
        <input
          type="text"
          value={movie}
          onChange={handleChange}
          placeholder="Add a movie"
          className="movie-input"
        />
        <button onClick={handleAdd} className="add-button">Add</button>
      </div>
      <ul className="movie-list">
        {movies.map((m) => (
          <li key={m.id} className="movie-item">
            <span className={m.completed ? 'completed' : ''}>
              {m.title}
            </span>
            <div className="movie-buttons">
              <button className="complete" onClick={() => handleToggle(m.id)}>Complete</button>
              <button className="edit" onClick={() => handleEdit(m.id)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(m.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
