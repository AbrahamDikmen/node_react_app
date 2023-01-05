import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  forgottenPasswordStatus: "",
  forgottenPasswordError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, {rejectWithValue}) => {
    try {
      const token = await axios.post(`/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
        repeat_password: user.repeat_password,
      });
      localStorage.setItem("token", token.data);

      return token.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, {rejectWithValue}) => {
    try {
      const token = await axios.post(`/login`, {
        name: user.name,
        password: user.password,
      });
      localStorage.setItem("token", token.data);

      return token.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const passwordResetUser = createAsyncThunk(
  "auth/passwordResetUser",
  async (user, {rejectWithValue}) => {
    try {
      const token = await axios.post(`/password-reset"`, {
        email: user.email,
      });
      localStorage.setItem("token", token.data);

      return token.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;

      if (token) {
        const user = jwtDecode(token);

        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          userLoaded: true,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder.addCase(registerUser.pending, (state, action) => {
      return {...state, registerStatus: "pending"};
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });

    // Login user
    builder.addCase(loginUser.pending, (state, action) => {
      return {...state, loginStatus: "pending"};
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });

    // forgotten password
    builder.addCase(passwordResetUser.pending, (state, action) => {
      return {...state, forgottenPasswordStatus: "pending"};
    });
    builder.addCase(passwordResetUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          email: user.email,
          _id: user._id,
          forgottenPasswordStatus: "success",
        };
      } else return state;
    });
    builder.addCase(passwordResetUser.rejected, (state, action) => {
      return {
        ...state,
        forgottenPasswordStatus: "rejected",
        forgottenPasswordError: action.payload,
      };
    });
  },
});

export const {loadUser, logoutUser} = authSlice.actions;
export default authSlice.reducer;