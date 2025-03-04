import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAllMetadataAsync,
  getFilteredFilmesAsync,
  getUserByIdAsync,
  loginUserAsync,
  signUpAsync,
} from "../../store/slices/userSlice";
import { CircularProgress } from "@mui/material";

const SignUpForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((store) => store.user.token);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRegisterClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const userAccount = {
      _id: credentials.email,
      name: credentials.name,
      password: credentials.password,
      expiration: 1735689600000,
      blocked: false,
      role: "USER",
    };
    setIsLoading(true);
    try {
      const response = await dispatch(signUpAsync(userAccount)).unwrap();
      if (response) {
        await dispatch(loginUserAsync(credentials)).unwrap();
        await dispatch(getUserByIdAsync(credentials.email));
        dispatch(
          getFilteredFilmesAsync({
            token: token,
            filters: {
              year: undefined,
              genres: undefined,
              language: undefined,
              title: undefined,
              page: 1,
            },
          })
        );
        await dispatch(getAllMetadataAsync(token));
        navigate(routes.HOME);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInClick = () => {
    navigate(routes.LOGIN);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h2>
          <form className="space-y-4" onSubmit={handleRegisterClick}>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={credentials.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
