import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

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
