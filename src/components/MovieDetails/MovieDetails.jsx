import React, { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { useParams, Link, useLocation } from 'react-router-dom';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import styles from './MovieDetails.module.css';
import { fetchMovieDetails } from 'services/tmdbAPI';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetailsData = async () => {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        setMovieDetails(movieDetails);

        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } catch (error) {
        console.log('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    fetchMovieDetailsData();
  }, [movieId, location.state]);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleShowCast = () => {
    setShowCast(!showCast);
    setShowReviews(false);
  };

  const handleShowReviews = () => {
    setShowReviews(!showReviews);
    setShowCast(false);
  };

  if (
    isLoading &&
    (location.pathname === '/' || location.pathname.startsWith('/movies'))
  ) {
    return (
      <div className={styles.loader}>
        <MoonLoader color="black" loading={isLoading} size={100} />
      </div>
    );
  }

  if (!movieDetails) {
    return <div>Movie details not found.</div>;
  }

  const { title, overview, vote_average, genres, poster_path } = movieDetails;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

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

      <button onClick={handleGoBack} className={styles.goback}>
        Go Back
      </button>
      <div className={styles.posterContainer}>
        <img src={imageUrl} alt={title} className={styles.poster} />
        <div className={styles.movieInfo}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.score}>User Score {vote_average}</p>
          <span className={styles.overview}>Overview</span>
          <p> {overview}</p>
          <span className={styles.genres}> Genres </span>
          <p> {genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      <div className={styles.additional}>
        <h3 className={styles.info}>Additional Information</h3>
        <nav>
          <ul>
            <li>
              <button
                className={styles.additional__button}
                onClick={handleShowCast}
              >
                {showCast ? ' Cast' : ' Cast'}
              </button>
            </li>
            <li>
              <button
                className={styles.additional__button}
                onClick={handleShowReviews}
              >
                {showReviews ? ' Reviews' : ' Reviews'}
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
