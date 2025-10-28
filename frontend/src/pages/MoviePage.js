import React, { useEffect, useState } from "react";
import { getMovie } from "../api/apiCalls";
import { useParams } from "react-router";
import { Play } from "lucide-react";

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
            className="relative h-[70vh] flex item-end "
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent bg-black/40"></div>

            <div className="relative z-10 flex items-end p-8 gap-8">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                className="rounded-lg shadow-lg w-48 hidden md:block"
                alt="movie_img"
              />

              <div>
                <div className="flex justify-between text-center ">
                  <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                </div>
                <p>
                  <span>Runtime: </span> <span>{movie.runtime} min </span>
                </p>
                <p>
                  <span>Rating: </span>{" "}
                  <span>⭐ {movie.vote_average?.toFixed(1)} </span>
                </p>
                <p>
                  <span>Release Date: </span>
                  <span>{movie.release_date}</span>
                </p>
                <div className="my-2">
                  {movie.genres?.map((genre) => (
                    <span className="bg-gray-800 px-2 mx-2 rounded-full text-sm py-1">
                      {genre.name}
                    </span>
                  ))}
                </div>
                <p className="max-w-2xl text-gray-100">{movie.overview}</p>
                <button className="flex justify-center items-center bg-[#c74b09f3] hover:bg-gray-700 text-white py-3 px-4 rounded-full  cursor-pointer text-sm md:text-base font-bold mt-2 md:mt-4">
                  {" "}
                  <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Watch Now
                </button>
              </div>
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
