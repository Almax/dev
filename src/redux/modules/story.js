import { getStories, updateStory as updateStoryParams, deleteStory as deleteStoryData } from '../../utils/syncdata';
import { createAction, handleActions } from 'redux-actions';

export const LOAD_STORIES = 'app/story/load_stories';
export const CLEAN_STORIES = 'app/story/clean_stories';
export const UPDATE_STORY = 'app/story/update_story';
export const DELETE_STORY = 'app/story/delete_story';
const initialState = 'initial state';

const reducer = handleActions({
	[LOAD_STORIES]: (state, action) => {
		return action.payload;
	},
	[CLEAN_STORIES]: (state, action) => {
		return initialState;
	},
	[UPDATE_STORY]: (state, action) => {
		let nextState = [...state];
		let story = action.payload;	
		for(key in nextState) {
			if(nextState[key].id === story.id) {
				nextState[key] = story;
				break;
			}
		}
		return nextState;
	},
	[DELETE_STORY]: (state, action) => {
		let nextState = [...state];
		let story = action.payload;
		for(key in nextState) {
			if(nextState[key].id === story.id) {
				nextState.splice(key, 1);
				break;
			}
		}
		return nextState;
	}
}, initialState)
export default reducer;

const loadStories = createAction(LOAD_STORIES);
const cleanStoires = createAction(CLEAN_STORIES);
const updateStory = createAction(UPDATE_STORY);
const deleteStory = createAction(DELETE_STORY);

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

export function update(marry, story) {
	return async (dispatch) => {
		dispatch(updateStory(await updateStoryParams(marry, story)));
	}
}

export function deleteIt(marry, story) {
	return async (dispatch) => {
		await deleteStoryData(marry, story);
		dispatch(deleteStory(story));
	}
}