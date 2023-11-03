import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './userPreferences/userPreferences';
import resumesReducer from './resumes/resumes';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    resumes: resumesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type StateDispatch = typeof store.dispatch;
