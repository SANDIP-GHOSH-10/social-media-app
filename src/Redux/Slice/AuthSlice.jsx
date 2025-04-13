import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Api = "http://localhost:1000/auth";

// Registration
export const registerUser = createAsyncThunk('auth/registerUser', async (data) => {
  const res = await axios.post(Api, data);
  console.log("Axios response for Registration", res);
  return res?.data;
});

// Login
export const loginUser = createAsyncThunk('auth/loginUser', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get(Api); // Fetch all users
    const users = res.data;

    const user = users.find(
      (u) =>
        u.email === data.email &&
        u.password === data.password
    );

    if (!user) {
      return rejectWithValue("Invalid email or password");
    }

    return user; // Return the matched user
  } catch (error) {
    return rejectWithValue("An error occurred during login");
  }
});

const initialState = {
  isLoading: false,
  error: null,
  regValue: [],
  loginValue: [],
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Registration
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.regValue = action.payload;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loginValue = action.payload;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { logoutUser, setUser } = authSlice.actions;
export default authSlice.reducer;




