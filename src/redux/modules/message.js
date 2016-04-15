import { loadInvitation, passInvitation } from '../../utils/syncdata';
import { createAction, handleActions } from 'redux-actions';
import { loadUser } from './session';
export const RESET_MESSAGE = 'app/message/reset_message';
export const INITIAL_MESSAGE = 'app/message/initial_message';
export const PASS_MESSAGE = 'app/message/pass_message';
const initialState = [];
const reducer = handleActions({
	[RESET_MESSAGE]: (state, action) => {
		return initialState;
	},
	[INITIAL_MESSAGE]: (state, action) => {
		return action.payload
	},
	[PASS_MESSAGE]: (state, action) => {
		return state;
	}
}, initialState);

export default reducer;

export const resetMessage = createAction(RESET_MESSAGE);
export const initialMessage = createAction(INITIAL_MESSAGE);
export const passMessage = createAction(PASS_MESSAGE);

export function reset() {
	return (dispatch) => {
		dispatch(resetMessage());
	}
}

export function load() {
	return async(dispatch) => {
		var messages = await loadInvitation();
		dispatch(initialMessage(messages));
	}
}

export function pass(id) {
	return async(dispatch) => {
		dispatch(passMessage(await passInvitation(id)));
		dispatch(initialMessage(await loadInvitation()));
		dispatch(loadUser());
	}
}