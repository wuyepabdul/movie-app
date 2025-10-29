import React, { useState } from "react";
import { Link } from "react-router";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/img2.jpg)",
      }}
    >
      <div className="max-w-[450px] w-full bg-black bg-opacity-75 rounded px-8 py-14 mx-auto mt-8">
        <h1 className="text-3xl font-medium text-white mb-7">Sign Up</h1>

        <form className="flex flex-col space-y-4">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Full Name"
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@email.com"
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="w-full bg-[#c74b09f3] text-white py-2 rounded text-base hover:opacity-90 cursor-pointer"
          >
            Sign Up
          </button>

          <div className="mt-10 text-[#737373] text-sm ">
            <p>
              Already have an account?{" "}
              <span className="text-white font-medium cursor-pointer ml-2 hover:underline">
                <Link to={"/signin"}>Sign In </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
