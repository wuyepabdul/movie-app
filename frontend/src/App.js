import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import "swiper/css";
import { Route, Routes } from "react-router";
import MoviePage from "./pages/MoviePage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/movie/:id"} element={<MoviePage />} />
      </Routes>
    </div>
  );
};

export default App;
