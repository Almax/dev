import { createAction, handleActions } from 'redux-actions';
import { listFriends } from '../../utils/chat';
export const initialState = 'initial state';
const LOAD_FRIENDS = 'app/friend/load_friends';
const UPDATE_FRIENDS = 'app/friend/update_friends';
const RESET_FRIENDS = 'app/friend/reset_friends';

const reducer = handleActions({
	[LOAD_FRIENDS]: (state, action) => {
		if(typeof action.payload === 'object') {
			return action.payload;
		} else {
			return state;
		}
	},
	[UPDATE_FRIENDS]: (state, action) => {
		let newState = [...state];
		const friend = action.payload;
		Object.keys(newState).map(key => {
			if(newState[key].uid === friend.uid) {
				newState[key] = friend;
			}
		});
		return newState;
	},
	[RESET_FRIENDS]: (state, action) => {
		let newState = [...state];
		Object.keys(newState).map(key => {
			newState[key].selected = false;
		});
		return newState;
	}
}, initialState);
export default reducer;

const load = createAction(LOAD_FRIENDS);
const update = createAction(UPDATE_FRIENDS);
const reset = createAction(RESET_FRIENDS);
export function loadFriends() {
	return async (dispatch) => {
		dispatch(load(await listFriends()));
	}
}

export function updateFriends(friend) {
	return (dispatch) => {
		dispatch(update(friend));
	}
}

export function resetContacts() {
	return (dispatch) => {
		dispatch(reset());
	}
}