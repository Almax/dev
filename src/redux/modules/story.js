import { getStories } from '../../utils/syncdata';
import { createAction, handleActions } from 'redux-actions';

export const LOAD_STORIES = 'app/story/load_stories';

const initialState = 'initial state';

const reducer = handleActions({
	[LOAD_STORIES]: (state, action) => {
		return action.payload;
	},
}, initialState)
export default reducer;

const loadStories = createAction(LOAD_STORIES);

export function load(marry) {
	return async (dispatch) => {
		dispatch(loadStories(await getStories(marry)));
	}
}