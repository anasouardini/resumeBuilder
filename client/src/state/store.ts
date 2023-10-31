import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './userPreferences/userPreferences';

export const store = configureStore({
    reducer: {
        theme: themeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type StateDispatch = typeof store.dispatch;