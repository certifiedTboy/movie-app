import { createSlice } from "@reduxjs/toolkit";

// const [firstNaame, setFirstName] = useState("")

/**
 * userSlice initial state data definition
 */
const initialState = {
  currentUser: null,
  isAuthenticated: false,
};

/**
 * Redux slice for user state management
 * This slice manages the current user and authentication status.
 * It provides actions to set and clear the current user.
 * The slice is exported for use in the Redux store configuration.
 * It uses Redux Toolkit's createSlice for easier state management.
 */
export const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },

    clearCurrentUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export default userSlice.reducer;

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
