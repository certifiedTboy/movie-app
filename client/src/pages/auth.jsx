import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = () => {
  const { currentUser, isAuthenticated } = useSelector(
    (state) => state.userState
  );
  const navigate = useNavigate();

  /**
   * useEffect hook to check if the user is already authenticated
   * if authenticated, it redirects user to the home page
   * this prevents authenticated users from accessing the auth page again
   */
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser]);

  return (
    <section className="my-[100px]">
      <Outlet />
    </section>
  );
};

export default Auth;
