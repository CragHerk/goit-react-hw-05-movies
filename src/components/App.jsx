import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import dynamicznie ładowanych komponentów
const Home = React.lazy(() => import('../components/Home/Home'));
const Movies = React.lazy(() => import('../components/Movies/Movies'));
const MovieDetails = React.lazy(() =>
  import('../components/MovieDetails/MovieDetails')
);
const Cast = React.lazy(() => import('../components/Cast/Cast'));
const Reviews = React.lazy(() => import('../components/Reviews/Reviews'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route path="/movies/:movieId/cast" element={<Cast />} />
        <Route path="/movies/:movieId/reviews" element={<Reviews />} />
        <Route path="*" element={<Home />} />
        {/* Przekierowanie na stronę główną dla nieistniejących tras */}
      </Routes>
    </Suspense>
  );
};

export default App;
