import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your state
export interface AuthState {
  values: {
    token: string;
    email: string;
  };
}

// Define the initial state
const initialState: AuthState = {
  values: {
    token: "",
    email: "",
  },
};

// Define the slice
export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.values = {
        token: "",
        email: "",
      };
    },
    login: (state, action: PayloadAction<{ token: string; email: string }>) => {
      state.values = {
        token: action.payload.token,
        email: action.payload.email,
      };
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
