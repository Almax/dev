import { getStories } from '../../utils/syncdata';
import { createAction, handleActions } from 'redux-actions';

export const LOAD_STORIES = 'app/story/load_stories';
export const CLEAN_STORIES = 'app/story/clean_stories';
const initialState = 'initial state';

const reducer = handleActions({
	[LOAD_STORIES]: (state, action) => {
		return action.payload;
	},
	[CLEAN_STORIES]: (state, action) => {
		return initialState;
	}
}, initialState)
export default reducer;

const loadStories = createAction(LOAD_STORIES);
const cleanStoires = createAction(CLEAN_STORIES);

export function load(marry) {
	return async (dispatch) => {
		const stories = await getStories(marry);
		if(stories) {
			dispatch(loadStories(stories));
		}else {
			dispatch(loadStories([]));
		}
	}
}

export function reset() {
	return async (dispatch) => {
		dispatch(cleanStoires());
	}
}