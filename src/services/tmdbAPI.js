import axios from 'axios';

const API_KEY = '9c2047c90d98ec66c1e34a0e397d29c4';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchCast = async movieId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    const data = response.data;
    return data.cast;
  } catch (error) {
    console.log('Error fetching cast:', error);
    return [];
  }
};

export const fetchMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    const data = response.data;
    return data.results;
  } catch (error) {
    console.log('Error fetching movies:', error);
    return [];
  }
};

export const fetchMovieDetails = async movieId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log('Error fetching movie details:', error);
    return null;
  }
};

export const fetchMoviesBySearchTerm = async searchTerm => {
  try {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      searchTerm
    )}`;
    const response = await axios.get(url);
    const data = response.data;
    return data.results;
  } catch (error) {
    console.log('Error fetching movies:', error);
    return [];
  }
};

export const fetchMovieReviews = async movieId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
    );
    const data = response.data;
    return data.results;
  } catch (error) {
    console.log('Error fetching movie reviews:', error);
    return [];
  }
};
