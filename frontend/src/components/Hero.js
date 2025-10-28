import { useEffect, useState } from "react";
import { Bookmark, Play } from "lucide-react";
import { getUpcomingMovies } from "../api/apiCalls";
import { Link } from "react-router";

const Hero = () => {
  const [movie, setMovie] = useState(null);

  const fetchAndSetHeroMovie = async () => {
    const data = await getUpcomingMovies();
    if (data && data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setMovie(data.results[randomIndex]);
    }
  };

  useEffect(() => {
    fetchAndSetHeroMovie();
  }, []);

  return (
    <>
      {movie ? (
        <div className="text-white relative">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="bg-img"
            className="w-full rounded-2xl h-[480px] object-center object-cover"
          />

          <div className="flex space-x-2 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10 font-medium">
            <button className="flex justify-center items-center bg-white hover:bg-gray-300 text-[#c74b09f3] py-3 px-4 rounded-full  cursor-pointer text-sm md:text-base font-bold">
              <Bookmark className="mr-2 w-4 h-5 md:w-5 md:h-5" />
              Save for later{" "}
            </button>
            <Link to={`/movie/${movie.id}`}>
              <button className="flex justify-center items-center bg-[#c74b09f3] hover:bg-gray-700 text-white py-3 px-4 rounded-full  cursor-pointer text-sm md:text-base font-bold">
                {" "}
                <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Watch Now
              </button>
            </Link>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
};

export default Hero;
