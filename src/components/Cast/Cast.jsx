import React, { useEffect, useState } from 'react';
import { fetchCast } from 'services/tmdbAPI';

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const cast = await fetchCast(movieId);
        setCast(cast);
      } catch (error) {
        console.log('Error fetching cast:', error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      {cast.map(actor => (
        <div key={actor.id}>
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
          {actor.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Cast;
