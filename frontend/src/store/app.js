import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import studyReducer from "../features/study/studySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    study: studyReducer,
  },
});
