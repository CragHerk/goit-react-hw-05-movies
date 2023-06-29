import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { fetchMovies } from 'services/tmdbAPI';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const movies = await fetchMovies();
        setMovies(movies);
      } catch (error) {
        console.log('Error fetching movies:', error);
      }
    };

    fetchMoviesData();
  }, []);

  const handleMovieClick = movieId => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.nav__namehome}>
          Home
        </Link>
        <Link to="/movies" className={styles.nav__name}>
          Movies
        </Link>
      </nav>
      <header>
        <h1 className={styles.h1}>Trending Movies</h1>
      </header>
      <div>
        <ul>
          {movies.map(movie => (
            <li
              className={styles.li}
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
