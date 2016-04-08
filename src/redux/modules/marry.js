import {
	getMarry,
	setMarry,
	heartBeat,
} from '../../utils/syncdata';
import { createAction, handleActions } from 'redux-actions';
import { load as loadMoney } from './money';
import { load as loadStory, reset as resetStory } from './story';

export const RESET_MARRY = 'app/marry/reset_marry';
export const LOAD_MARRY = 'app/marry/load_marry';
export const UPDATE_MARRY = 'app/marry/update_marry';
export const HEART_BEAT = 'app/marry/heart_beat';
const initialState = 'initial state'
const reducer = handleActions({
	[RESET_MARRY]: (state, action) => {
		return initialState;
	},
	[LOAD_MARRY]: (state, action) => {
		return action.payload;
	},
	[UPDATE_MARRY]: (state, action) => {
		return action.payload;
	},
	[HEART_BEAT]: (state, action) => {
		return action.payload;
	}
}, initialState);
export default reducer;

export const resetMarry = createAction(RESET_MARRY);
export const loadMarry = createAction(LOAD_MARRY);
export const updateMarry = createAction(UPDATE_MARRY);
export const hitMarry = createAction(HEART_BEAT);

export function resetMyMarry() {
	return async (dispatch) => {
		dispatch(resetMarry());
		dispatch(resetStory());
	}
}
//GET 
export function getMyMarry() {
	return async (dispatch) => {
		var marry = await getMarry();
		dispatch(loadMarry(marry));
		dispatch(loadMoney(marry));
		dispatch(loadStory(marry));
	}
}

//UPDATE
export function setMyMarry(data) {
	return async (dispatch) => {
		dispatch(updateMarry(await setMarry(data)));
	}
}

export function hitMyMarry() {
	return async (dispatch) => {
		dispatch(hitMarry(await heartBeat()));
	}
}