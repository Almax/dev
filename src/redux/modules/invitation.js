import { createAction, handleActions } from 'redux-actions';
import { getInvitedMessages, passInviteRequest } from '../../utils/chat';

export const LOAD_INVITATIONS = 'app/invitation/load_invitation';
export const PASS_INVITATIONS = 'app/invitation/pass_invitation';

const initialState = [];

export default reducer = handleActions({
	[LOAD_INVITATIONS]: (state, action) => {
		return action.payload;
	},
	[PASS_INVITATIONS]: (state, action) => {
		let removeItem = action.payload;
		let nextState = [...state];
		for(key in nextState) {
			if(nextState[key].uid === removeItem.uid) {
				nextState.splice(key, 1);
			}
		}
		return nextState;
	},
}, initialState);


const load = createAction(LOAD_INVITATIONS);
const pass = createAction(PASS_INVITATIONS);

export function loadInvitation() {
	return async (dispatch) => {
		dispatch(load( await getInvitedMessages()));
	}
}

export function passInvitation(user) {
	return async (dispatch) => {
		await passInviteRequest(user.uid)
		dispatch(pass(user));
	}
}