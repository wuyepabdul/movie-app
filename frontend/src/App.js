import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import "swiper/css";
import { Route, Routes } from "react-router";
import MoviePage from "./pages/MoviePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useCallback, useEffect } from "react";
const App = () => {
  const { fetchUser, fetchingUser } = useAuthStore();

  const loggedInUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    loggedInUser();
  }, [loggedInUser]);

  if (fetchingUser) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/movie/:id"} element={<MoviePage />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
