import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const URL = import.meta.env.VITE_APP_URL

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true)

    try {
        const response = await axios({
            method: 'post',
            url: URL + '/api/auth/login',
            withCredentials: true,
            data: credentials
        })

        if (response.data.success) {
            navigate("/");
        }
    } catch (error) {
        alert(error.response.data.message);
        setLoading(false);
    }

  }

  function handleShowPassword() {
    const password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }

  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center px-5">
      <form
        onSubmit={(e) => handleLogin(e)}
        className="w-full md:w-1/2 lg:w-1/3 border border-slate-300 flex flex-col gap-5 p-6 rounded"
      >
        <h2 className="text-center font-bold text-zinc-700 text-3xl">
          Instagram Login
        </h2>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="border border-gray-500 outline-none px-2 py-2 rounded"
            type="text"
            name="username"
            id="username"
            required
            placeholder="Enter your username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <div className="w-full flex relative border items-center border-gray-500 rounded">
            <input
              className="w-[85%] outline-none px-2 py-2 rounded"
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            <p
              onClick={handleShowPassword}
              className="absolute right-2 cursor-pointer"
            >
              show
            </p>
          </div>
        </div>
        <button
          className="w-full bg-sky-500 text-white hover:bg-sky-600 px-5 py-2 rounded-md font-semibold"
          type="submit"
        >
          Log In{" "}
          {loading ? (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin ml-2"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          ) : null}
        </button>
      </form>

      <div className="w-full md:w-1/2 lg:w-1/3 rounded p-6 text-sm font-medium border border-slate-300 text-center text-gray-500">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-700 hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
};

export default Login;
