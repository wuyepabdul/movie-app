import axios from "axios";

const getAuthHeaders = () => ({
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTJkNzQ2M2FiNDllYmNiY2Y1M2NhYjAyMzUzNTI1YSIsIm5iZiI6MTc2MTIxNjE5Ny43NjYsInN1YiI6IjY4ZmEwNmM1NzExZDBlNGY5ZGRkOTMzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JiotyQlMu6MXlFF5aGjOBTN3E0QdsbSTY99YA_YE2UM",
    "Content-Type": "application/json",
  },
});

export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.log("error in upcoming movies", error);
    return error;
  }
};

export const getTopRatedMovies = async (category) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      getAuthHeaders()
    );

    return response.data;
  } catch (error) {
    console.log("error from top rated", error);
    return error;
  }
};

export const getMovie = async (movie_id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.log("error in movie", error);
    return error;
  }
};

export const getRecommendedMovies = async (movie_id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?language=en-US&page=1`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.log("error in recommended", error);
    return error;
  }
};

export const getMovieVideo = async (movie_id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
