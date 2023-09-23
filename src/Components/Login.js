import React from "react";
import Header from "./Header";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
      </div>
      <form className="w-3/12 p-12 absolute my-36 mx-auto right-0 left-0 bg-black bg-opacity-90 rounded-lg">
        <h1 className="font-bold text-3xl text-white py-4">Sign In</h1>
        <input
          type="text"
          placeholder="Email or phone number"
          className="w-full p-4 my-4 bg-zinc-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 my-4 bg-zinc-700"
        />
        <button className="bg-red-600 text-white w-full p-4 my-6 rounded-md">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
