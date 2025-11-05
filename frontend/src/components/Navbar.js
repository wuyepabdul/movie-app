import { HelpCircle, LogOut, Search, Settings } from "lucide-react";
import { Link } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const avatarUrl = user
    ? `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(
        user.userName
      )}`
    : "";

  const handleLogOut = async () => {
    const message = await logOut();
    toast.success(message);
    setShowMenu(false);
  };

  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
      <label className="text-[#c74b09f3] text-[25px] font-bold">
        <Link to={"/"}>Moviezzz</Link>
      </label>
      <ul className="hidden xl:flex space-x-6">
        <li className="cursor-pointer hover:text-[#c74b09f3]">Home</li>
        <li className="cursor-pointer hover:text-[#c74b09f3]">TV Shows</li>
        <li className="cursor-pointer hover:text-[#c74b09f3]">Movies</li>
        <li className="cursor-pointer hover:text-[#c74b09f3]">Anime</li>
        <li className="cursor-pointer hover:text-[#c74b09f3]">Games</li>
        <li className="cursor-pointer hover:text-[#c74b09f3]">New & Popular</li>
        <li className="cursor-pointer hover:text-[#c74b09f3]">Upcoming</li>
      </ul>
      <div className="flex items-center space-x-4 relative">
        <div className="relative hidden md:inline-flex">
          <input
            type="text"
            className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none"
            placeholder="Search"
          />
          <Search className="absolute top-2 right-4 w-5 h-5" />
        </div>
        <button className="bg-[#c74b09f3] px-5 py-2 text-white cursor-pointer">
          {" "}
          Get AI Movie Picks
        </button>
        {!user ? (
          <Link to={"/signin"}>
            <button className="bg-[#333333] py-2 px-4 cursor-pointer">
              {" "}
              Sign In{" "}
            </button>
          </Link>
        ) : (
          <div>
            <img
              src={avatarUrl}
              onClick={() => setShowMenu(!showMenu)}
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border[#c74b09f3] cursor-pointer"
            />

            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-2 border border-[#333333">
                <div className="flex flex-col items-center mb-2">
                  <span className="text-white font-semibold text-base">
                    {" "}
                    {user.userName}{" "}
                  </span>
                  <span className="text-xs text-gray-400"> {user.email} </span>
                </div>

                <button className="flex items-center px-4  py-3 rounded-lg text-white bg-[#181818] hover:bg-#[#1d1c1c] gap-3 cursor-pointer ">
                  {" "}
                  <HelpCircle className="w-5 h-5 " /> Help Center{" "}
                </button>

                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-#[#1d1c1c] gap-3 cursor-pointer ">
                  {" "}
                  <Settings className="w-5 h-5 " /> Settings{" "}
                </button>

                <button
                  onClick={handleLogOut}
                  className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-#[#1d1c1c] gap-3 cursor-pointer "
                >
                  {" "}
                  <LogOut className="w-5 h-5 " /> Log Out{" "}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
