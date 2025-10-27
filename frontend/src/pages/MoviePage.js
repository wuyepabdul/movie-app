import React, { useEffect, useState } from "react";
import { getMovie } from "../api/apiCalls";
import { useParams } from "react-router";

const MoviePage = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async (id) => {
    const data = await getMovie(id);
    console.log("movieId", movieId);
    setMovie(data);
  };
  useEffect(() => {
    fetchMovie(movieId);
  }, [movieId]);
  return (
    <div>
      {movie ? (
        <div className="min-h-screen bg-[#181818] text-white">
          <div
            className="relative h-[60vh] flex item-end "
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>

            <div>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt="movie_img"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <span className="text-xl text-[#c74b09f3]">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
