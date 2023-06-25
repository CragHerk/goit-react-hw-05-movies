import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState('/');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=9c2047c90d98ec66c1e34a0e397d29c4`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.log('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();

    // Ustaw poprzednią ścieżkę przy wejściu do komponentu MovieDetails
    if (location.state && location.state.from) {
      setPreviousPath(location.state.from);
    }
  }, [movieId, location.state]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, overview, vote_average, genres, poster_path } = movieDetails;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const handleGoBack = () => {
    navigate(previousPath);
  };

  const handleShowCast = () => {
    setShowCast(!showCast); // Odwracamy wartość stanu showCast przy każdym kliknięciu
    setShowReviews(false); // Zamykamy listę z recenzjami
  };

  const handleShowReviews = () => {
    setShowReviews(!showReviews); // Odwracamy wartość stanu showReviews przy każdym kliknięciu
    setShowCast(false); // Zamykamy listę z obsadą
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
      </nav>

      <button onClick={handleGoBack}>Go Back</button>

      <h2>{title}</h2>
      <img src={imageUrl} alt={title} style={{ width: '200px' }} />
      <p>User Score: {vote_average}</p>
      <p>Overview: {overview}</p>
      <p>Genres: {genres.map(genre => genre.name).join(', ')}</p>

      <div>
        <h3>Additional Information</h3>
        <nav>
          <ul>
            <li>
              <button onClick={handleShowCast}>
                {showCast ? 'Hide Cast' : 'Show Cast'}
              </button>
            </li>
            <li>
              <button onClick={handleShowReviews}>
                {showReviews ? 'Hide Reviews' : 'Show Reviews'}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {showCast && <Cast movieId={movieId} />}
      {showReviews && <Reviews movieId={movieId} />}
    </div>
  );
};

export default MovieDetails;
