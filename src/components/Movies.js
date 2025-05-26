
import React, { useState } from 'react';
import './Movies.css';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const movies = [
    {
      id: 1,
      title: 'Mufasa The Lion King',
      description: 'Mufasa, a cub lost and alone, meets sympathetic lion, Taka.',
      image: 'https://www.themoviedb.org/t/p/w1280/lurEK87kukWNaHd0zYnsi3yzJrs.jpg',
    },
    {
      id: 2,
      title: 'Sonic the Hedgehog 3',
      description: 'Sonic, Knuckles, and Tails reunite for a new adventure',
      image: 'https://www.themoviedb.org/t/p/w1280/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg',
    },
    {
      id: 3,
      title: 'Wicked',
      description: 'In the land of Oz, misunderstood green-skinned Elphaba is forced to share room with a popular aristocrat.',
      image: 'https://www.themoviedb.org/t/p/w1280/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg',
    },
  ];

  // Filter movies based on the search term (case-insensitive)
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movies-container">
      <h1>Browse Movies</h1>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="movie-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img src={movie.image} alt={movie.title} className="movie-image" />
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;

