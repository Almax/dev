import { createAction, handleActions } from 'redux-actions';
import { listFriends } from '../../utils/chat';
export const initialState = 'initial state';
const LOAD_FRIENDS = 'app/friend/load_friends';


const reducer = handleActions({
	[LOAD_FRIENDS]: (state, action) => {
		if(typeof action.payload === 'object') {
			return action.payload;
		} else {
			return state;
		}
	}
}, initialState);
export default reducer;

const load = createAction(LOAD_FRIENDS);

export function loadFriends() {
	return async (dispatch) => {
		dispatch(load(await listFriends()));
	}
}