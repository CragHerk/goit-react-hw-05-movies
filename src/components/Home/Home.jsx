import React, { useEffect, useState } from 'react';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=9c2047c90d98ec66c1e34a0e397d29c4`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <header>
        <h1>FilmHub</h1>
        <button>Wyszukaj swój ulubiony film</button>
      </header>
      <div>
        {movies.map(movie => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
      <footer>
        <button>Pokaż więcej</button>
      </footer>
    </div>
  );
};

export default Home;
