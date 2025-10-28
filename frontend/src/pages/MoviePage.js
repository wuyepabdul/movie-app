import { useCallback, useEffect, useState } from "react";
import { getMovie, getRecommendedMovies } from "../api/apiCalls";
import { useParams } from "react-router";
import { Play } from "lucide-react";

const MoviePage = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const fetchMovie = useCallback(async (id) => {
    const data = await getMovie(id);
    setMovie(data);
  }, []);

  const fetchRecommendedMovies = useCallback(async (id) => {
    const data = await getRecommendedMovies(id);
    console.log("recommended moveis", data);
    setRecommendedMovies(data);
  }, []);

  useEffect(() => {
    fetchMovie(movieId);
    fetchRecommendedMovies(movieId);
  }, [movieId, fetchMovie, fetchRecommendedMovies]);
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
                  <span className="mx-3">
                    ⭐ {movie.vote_average?.toFixed(1)}{" "}
                  </span>

                  <span className="mx-3">{movie.release_date}</span>
                  <span className="mx-3">{movie.runtime} min </span>
                </p>

                <div className="my-2">
                  {movie.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-gray-800 px-2 mx-2 rounded-full text-sm py-1"
                    >
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
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4 ">Details</h2>
            <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <ul className="text-gray-300 space-y-3">
                  <li>
                    <span className="font-semibold text-white">Status: </span>
                    <span className="ml-2">{movie.status} </span>
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Release Date:{" "}
                    </span>
                    <span className="ml-2">{movie.release_date} </span>
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Original Language:{" "}
                    </span>
                    <span className="ml-2">
                      {movie.original_language?.toUpperCase()}{" "}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold text-white">Budget: </span>
                    <span className="ml-2">
                      {movie.budget
                        ? `$${movie.budget.toLocaleString()}`
                        : "N/A"}{" "}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold text-white">Revenue: </span>
                    <span className="ml-2">
                      {movie.revenue.toLocaleString()}{" "}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Production Companies:{" "}
                    </span>
                    <span className="ml-2">
                      {console.log(movie.production_companies)}
                      {movie.production_companies &&
                      movie.production_companies.length > 0
                        ? movie.production_companies.map((company, index) => (
                            <span key={company.id || index}>
                              {company.name}
                              {index <
                                movie.production_companies.length - 1 && (
                                <>, </>
                              )}
                            </span>
                          ))
                        : "N/A"}{" "}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Production Countries:{" "}
                    </span>
                    <span className="ml-2">
                      {movie.production_countries &&
                      movie.production_countries.length > 0
                        ? movie.production_countries.map((country, index) => (
                            <span key={country.id || index}>
                              {country.name}
                              {index <
                                movie.production_countries.length - 1 && (
                                <>, </>
                              )}
                            </span>
                          ))
                        : "N/A"}{" "}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Spoken Languages:{" "}
                    </span>
                    <span className="ml-2">
                      {movie.spoken_languages &&
                      movie.spoken_languages.length > 0
                        ? movie.spoken_languages.map((lang, index) => (
                            <span key={lang.id || index}>
                              {lang.english_name}
                              {index < movie.spoken_languages.length - 1 && (
                                <>, </>
                              )}
                            </span>
                          ))
                        : "N/A"}{" "}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">Tagline</h3>
                <p className="italic text-gray-400 mb-6">
                  {movie.tagline || "No tagline available"}
                </p>
                <h3 className="font-semibold text-white mb-2">Overview</h3>
                <p className="text-gray-200">{movie.overview}</p>
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
