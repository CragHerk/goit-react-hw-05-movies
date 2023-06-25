import React, { useEffect, useState } from 'react';

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=9c2047c90d98ec66c1e34a0e397d29c4`
        );
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.log('Error fetching cast:', error);
      }
    };

    fetchCast();
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
