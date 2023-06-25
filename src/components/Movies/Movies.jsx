import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Movies = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  }, [searchTerm]);

  const fetchMovies = async searchTerm => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=9c2047c90d98ec66c1e34a0e397d29c4&query=${encodeURIComponent(
        searchTerm
      )}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log('Error fetching movies:', error);
    }
  };

  const handleSearch = () => {
    navigate(`/movies?search=${encodeURIComponent(searchInput)}`);
    fetchMovies(searchInput);
  };

  const handleInputChange = e => {
    setSearchInput(e.target.value);
  };

  const handleMovieClick = movieId => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/movies" className="active">
          Movies
        </Link>
      </nav>
      <div>
        <div>
          <input
            type="text"
            placeholder="Wpisz słowo kluczowe"
            value={searchInput}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Szukaj</button>
        </div>
      </div>

      <ul>
        {movies.map(movie => (
          <li key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
