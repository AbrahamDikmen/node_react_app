import {configureStore} from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import chatReducer from "../features/chatSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    chats: chatReducer,
  },
});
