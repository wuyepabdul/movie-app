import axios from "axios";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
});

export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_MOVIE_API_URL}/upcoming?language=en-US&page=1`,
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
      `${process.env.REACT_APP_MOVIE_API_URL}/${category}?language=en-US&page=1`,
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
      `${process.env.REACT_APP_MOVIE_API_URL}/${movie_id}?language=en-US`,
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
      `${process.env.REACT_APP_MOVIE_API_URL}/${movie_id}/recommendations?language=en-US&page=1`,
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
      `${process.env.REACT_APP_MOVIE_API_URL}/${movie_id}/videos?language=en-US`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
