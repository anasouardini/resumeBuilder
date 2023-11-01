import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListItem {
	name: string,
	type: 'text',
	order: number,
	color: string,
	value: string,
}
interface Resume {
	id: string,
	title: string,
	components: ({
		name: string,
		type: 'text' | 'heading',
		order: number,
		color: string,
		value: string,
	} | {
		name: string,
		type: 'list',
		order: number,
		color: string,
		value: ListItem[],
	})[]
}
const initialState: { data: Resume[], loaded: boolean } = { loaded: false, data: [] };

const UserPreferences = createSlice({
	name: 'user preferences',
	initialState,
	reducers: {
		setResumes: (state, action) => {
			state.data = action.payload;
			if (action.payload.length) {
				state.loaded = true;
			}
			return state;
		},
		mutateResume: (state, action) => {
			// todo: request update from the server.
			// todo: mutate the state when successful.
		}
	}
});

export const actions = UserPreferences.actions;
export default UserPreferences.reducer;