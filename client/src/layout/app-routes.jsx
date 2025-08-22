// import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/home";
import About from "../pages/about";
import Movies from "../pages/movies";
import Auth from "../pages/auth";
import Error404 from "../pages/error-404";
import MovieDetails from "../pages/movie-details";
import Dashboard from "../pages/dashboard";
import SignupForm from "../components/auth/SignupForm";
import SigninForm from "../components/auth/SigninForm";
import VerificationForm from "../components/auth/VerificationForm";
import ProtectedRoutes from "./protected-routes";
// import { AuthContext } from "../context/auth-context";

const AppRoutes = () => {
  /**
   * initialize auth context to access authentication methods and state
   * this allows us to check if the user is authenticated before accessing protected routes
   * it is used in the ProtectedRoutes component to conditionally render the dashboard
   * or redirect to the signin page if the user is not authenticated
   * This is essential for ensuring that only authenticated users can access certain parts of the application
   * and helps maintain the security and integrity of user data and actions within the app
   */
  // const authCtx = useContext(AuthContext);
  const { isAuthenticated } = useSelector((state) => state.userState);

  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth" element={<Auth />}>
        <Route path="signup" element={<SignupForm />} />
        <Route path="signin" element={<SigninForm />} />
        <Route path="verify" element={<VerificationForm />} />
      </Route>
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:movieId" element={<MovieDetails />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes
            children={<Dashboard />}
            isAuthenticated={isAuthenticated}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
