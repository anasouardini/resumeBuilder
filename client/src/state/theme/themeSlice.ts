import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Theme {
    color: "dark" | "light",
    edges: "sharp" | "soft"
}

const initialState: Theme = {
    color: 'dark',
    edges: 'soft'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        change: (state, action:PayloadAction<Theme>) => {
            state.color = action.payload.color;
            state.edges = action.payload.edges;

            // switch to next theme color
        }
    }
});

export const { change } = themeSlice.actions;
export default themeSlice.reducer;