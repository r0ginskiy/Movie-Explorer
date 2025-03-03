import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import "./styles/App.css";

export const App = () => {
  const browserRouter = AppRouter();
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
};
