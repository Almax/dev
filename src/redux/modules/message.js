import { loadInvitation, passInvitation } from '../../utils/syncdata';
import { createAction, handleActions } from 'redux-actions';

export const INITIAL_MESSAGE = 'app/message/initial_message';
export const PASS_MESSAGE = 'app/message/pass_message';
const initialState = 'initial state';
const reducer = handleActions({
	[INITIAL_MESSAGE]: (state, action) => {
		return action.payload
	},
	[PASS_MESSAGE]: (state, action) => {
		return state;
	}
}, initialState);

export default reducer;

export const initialMessage = createAction(INITIAL_MESSAGE);
export const passMessage = createAction(PASS_MESSAGE);

export function load() {
	return async(dispatch) => {
		var messages = await loadInvitation();
		dispatch(initialMessage(messages));
	}
}

export function pass(id) {
	return async(dispatch) => {
		dispatch(passMessage(await passInvitation(id)));
	}
}