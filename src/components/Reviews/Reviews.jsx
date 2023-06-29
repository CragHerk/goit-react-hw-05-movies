import React, { useEffect, useState } from 'react';
import { fetchMovieReviews } from 'services/tmdbAPI';

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviewsData = async () => {
      try {
        const reviews = await fetchMovieReviews(movieId);
        setReviews(reviews);
      } catch (error) {
        console.log('Error fetching movie reviews:', error);
      }
    };

    fetchMovieReviewsData();
  }, [movieId]);

  if (reviews.length === 0) {
    return <div>There are no reviews yet.</div>;
  }

  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>Author: {review.author}</p>
            <p>Content: {review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
