import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCurrentUser } from "../lib/redux/userSlice";
import { useLogoutMutation } from "../lib/authApis";

export const AuthContext = createContext({
  isAuthenticated: false,
  // currentUser: null,
  loginUser: () => {},
  logoutUser: () => {},
  checkIfUserIsAuthenticated: () => {},
});

// auth context provider component
const AuthContextProvider = ({ children }) => {
  // // Initialize state for authentication status and current user
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logout, { isSuccess }] = useLogoutMutation();

  const dispatch = useDispatch();

  // funtion to login a new user and store their information in localStorage
  const loginUser = (refreshToken) => {
    localStorage.setItem("refreshToken", refreshToken);
    // setIsAuthenticated(true);
    // setCurrentUserData(user);
    // dispatch(setCurrentUser(user));
  };

  // a function to check if a user is authenticated by looking for user data in localStorage
  // it updates the isAuthenticated state and sets the current user if it exists in the localStorage
  const checkIfUserIsAuthenticated = () => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (refreshToken) {
      setIsAuthenticated(true);
      // setCurrentUserData(JSON.parse(user));
      // dispatch(setCurrentUser(JSON.parse(user)));
    } else {
      // setIsAuthenticated(false);
      // setCurrentUserData(null);
      dispatch(clearCurrentUser());
    }
  };

  // logout user function
  // the function clears the localStorage and resets the authentication state
  const logoutUser = () => {
    logout();
    // localStorage.removeItem("refresh_token");
    // setIsAuthenticated(false);
    // setCurrentUserData(null);
    // dispatch(clearCurrentUser());
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("refresh_token");
      dispatch(clearCurrentUser());
    }
  }, [isSuccess]);

  // Context value that will be provided to components
  // it includes the authentication status, current user, and functions to manage authentication
  const value = {
    isAuthenticated,
    // currentUser,
    loginUser,
    logoutUser,
    checkIfUserIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
