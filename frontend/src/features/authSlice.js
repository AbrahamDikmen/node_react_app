import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import jwtDecode from "jwt-decode";

const initialState = {
  _id: "",
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  isAdmin: "",
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
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.post(
        "/api/user/register",
        {
          name: user.name,
          email: user.email,
          password: user.password,
          repeat_password: user.repeat_password,
          isAdmin: user.isAdmin,
        },
        config
      );
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
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const token = await axios.post(
        `/api/user/login`,
        {
          name: user.name,
          password: user.password,
        },
        config
      );

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
      const token = await axios.post(`/api/password-reset`, {
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
    async logoutUser(state, action) {
      localStorage.removeItem("token");

      await axios.post("/api/user/logOut").then((response) => {
        return {
          response,
          ...state,
          _id: "",
          token: "",
          name: "",
          email: "",
          isAdmin: "",
          registerStatus: "",
          registerError: "",
          loginStatus: "",
          loginError: "",
          userLoaded: false,
        };
      });
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder.addCase(registerUser.pending, (state, action) => {
      return {...state, registerStatus: "pending"};
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {...state, userLoaded: false, registerStatus: "success"};
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          registerStatus: "rejected",
          registerError: action.payload,
        };
      } else return state;
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
          _id: user._id,
          token: action.payload,
          name: user.name,
          email: user.email,
          isAdmin: "",
          loginStatus: "success",
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
