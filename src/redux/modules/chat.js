import { createAction, handleActions } from 'redux-actions';
import { newSession, loadSession, cleanSession } from '../../utils/chat';
const LOAD_CHAT = 'app/chat/load_chat';
const NEW_CHAT = 'app/chat/new';
const LOAD_MSG = 'app/chat/load_msg'
const REDUCE_MSG = 'app/chat/reduce_msg';
const initialState = { session: [], message: [] };

const reducer = handleActions({
	[LOAD_CHAT]: (state, action) => {
		let chats = [];
		Object.keys(action.payload).map((key) => {
			if(action.payload[key].uid) {
				chats.push(action.payload[key]);
			}
		})
		return { 
			...state,
			session: chats 
		};
	},
	[NEW_CHAT]: (state, action) => {
		let session = [ ...state.session];
		Object.keys(session).map((key) => {
			if(session[key].uid === action.payload.uid) {
				session.splice(key, 1);
			}
		});
		session.unshift(action.payload);
		return { 
			...state, 
			session 
		};
	},
	[LOAD_MSG]: (state, action) => {
		let message = [ ...state.message ];
		message.unshift(action.payload);
		return {
			...state,
			message
		}
	},
	[REDUCE_MSG]: (state, action) => {

	},
}, initialState);
export default reducer;

const loadChat = createAction(LOAD_CHAT);
const newChat = createAction(NEW_CHAT);
const loadMessage = createAction(LOAD_MSG);

export function newChatSession(friend) {
	return async (dispatch) => {
		dispatch(newChat(await newSession(friend)));
	}
}

export function loadChatSessions() {
	return async (dispatch) => {
		dispatch(loadChat(await loadSession()));
	}
}

export function cleanChatSession() {
	return async (dispatch) => {
		dispatch(loadChat(await cleanSession()));
	}
}

export function loadRemoteMsg(msg) {
	return (dispatch) => dispatch(loadMessage(msg));
}