import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import { routes } from "../routes/routes";
import CardDetails from "../components/DetailsCard/CardDetails";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export const AppRouter = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Navigate to={routes.LOGIN} />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.HOME} element={<HomePage />} />
        <Route path={routes.DETAILS_INFO} element={<CardDetails />} />
        <Route path={routes.REGISTER} element={<SignUp />} />
      </Route>
    )
  );
