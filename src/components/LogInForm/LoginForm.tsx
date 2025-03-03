import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useState } from "react";
import {
  getAllMetadataAsync,

  getFilteredFilmesAsync,
  getUserByIdAsync,
  loginUserAsync,
} from "../../store/slices/userSlice";
import { UserLogin } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CircularProgress } from "@mui/material";

const LoginForm = () => {
  const [credentials, setCredentials] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((store) => store.user.token);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogInClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await dispatch(loginUserAsync(credentials)).unwrap();

      if (response) {
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

  const handleSignUpClick = () => {
    navigate(routes.REGISTER);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
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
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
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
              type="button"
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
              onClick={handleLogInClick}
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => handleSignUpClick()}
            >
              Sign Up
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
