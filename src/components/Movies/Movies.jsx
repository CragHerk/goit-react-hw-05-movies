import { useCallback, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Movies.module.css';
import { fetchMoviesBySearchTerm } from 'services/tmdbAPI';

const Movies = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const fetchMoviesData = useCallback(async () => {
    if (searchTerm) {
      try {
        const movies = await fetchMoviesBySearchTerm(searchTerm);
        setMovies(movies);
      } catch (error) {
        console.log('Error fetching movies:', error);
      }
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchMoviesData();
  }, [fetchMoviesData]);

  const handleSearch = useCallback(
    e => {
      e.preventDefault();
      navigate(`/movies?search=${encodeURIComponent(searchInput)}`);
      setMovies([]); // Resetowanie listy filmów
      if (searchInput) {
        fetchMoviesData();
      }
    },
    [searchInput, fetchMoviesData, navigate]
  );

  const handleInputChange = e => {
    setSearchInput(e.target.value);
  };

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
      <form className={styles.search} onSubmit={handleSearch}>
        <input
          className={styles.input}
          type="text"
          placeholder="enter film name"
          value={searchInput}
          onChange={handleInputChange}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>

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
  );
};

export default Movies;
