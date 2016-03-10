import {
	getMarry,
	setMarry,
	heartBeat,
} from '../../utils/syncdata';
import { createAction, handleActions } from 'redux-actions';

export const LOAD_MARRY = 'app/marry/load_marry';
export const UPDATE_MARRY = 'app/marry/update_marry';
export const HEART_BEAT = 'app/marry/heart_beat';
const initialState = 'initial state'
const reducer = handleActions({
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

export const loadMarry = createAction(LOAD_MARRY);
export const updateMarry = createAction(UPDATE_MARRY);
export const hitMarry = createAction(HEART_BEAT);

//GET 
export function getMyMarry() {
	return async (dispatch) => {
		dispatch(loadMarry(await getMarry()));
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