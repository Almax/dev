import { 
	currentUser, 
	cleanUser, 
	userLogin, 
	storeUserSession, 
	updateName,
	updateBasicProfile
} from '../../utils/session';
import { init } from '../../utils/contact';
import { getMyMarry, resetMyMarry } from './marry';
import { load as loadTask, reset as resetTask } from './task';
import { load as loadMessage, reset as resetMessage } from './message';
import { loadFriends } from './friend';
import { loadChatSessions, cleanChatSession } from './chat';
import { createAction, handleActions } from 'redux-actions';
import { loadInvitation } from './invitation';
/* action type */
export const RELOAD_USER = 'app/session/reload_user';
export const LOAD_USER = 'app/session/load_user'
export const LOGOUT_USER = 'app/session/logout_user'

/* initial state */
const initialState = 'initial state'

/* state reduce */
const reducer = handleActions({
	[RELOAD_USER]: (state, action) => {
		return null;
	},
	[LOAD_USER]: (state, action) => {
		return action.payload;
	},
	[LOGOUT_USER]: (state, action) => {
		return null;
	}
}, initialState)

export default reducer

export const reloadSession = createAction(RELOAD_USER);
export const loadSession = createAction(LOAD_USER)
export const cleanSession = createAction(LOGOUT_USER)

/* 使用账号密码登陆 */
export function login(username, password) {
	return async (dispatch) => {
		const user = await userLogin(username, password);
		if(user) {
			await init();
			dispatch(loadSession(user));
			dispatch(getMyMarry());
			dispatch(loadTask());
			dispatch(loadMessage());
			dispatch(loadFriends());
			dispatch(loadChatSessions());
			dispatch(loadInvitation());
		}else {
			dispatch(reloadSession());
		}
	}
}

/* 从本地storage里取得登陆状态 */
export function loadUser() {
	return async (dispatch) => {
		var user =  await currentUser()
		if(user) {
			dispatch(loadSession(user));
			dispatch(getMyMarry());
			dispatch(loadTask());
			dispatch(loadMessage());
			dispatch(loadFriends());
			dispatch(loadChatSessions());
			dispatch(loadInvitation());
		}else {
			dispatch(cleanSession(await cleanUser()))
		}
	}
}

/* 清空登陆状态 */
export function logout() {
	return async (dispatch) => {
		dispatch(cleanSession(await cleanUser()));
		dispatch(resetMyMarry());
		dispatch(resetTask());
		dispatch(resetMessage());
		dispatch(cleanChatSession());
	}
}

/* 提供正确的session也能登陆成用户状态 */
export function store(session) {
	return async (dispatch) => {
			dispatch(loadSession(await storeUserSession(session)))
			dispatch(getMyMarry());
			dispatch(loadTask());
			dispatch(loadMessage());
			dispatch(loadFriends());
			dispatch(loadInvitation());
	}
}

/* 更新用户的个人资料 */
export function updateProfile(basic_profile) {
	return async (dispatch) => {
		var session = await updateBasicProfile(basic_profile);
		if(session == null) {
			dispatch(loadSession(session));
		}else {
			dispatch(loadSession(await storeUserSession(session)));
		}
	}
}

/* 只是更新婚礼相关的人的名字 */
export function update(my_name, partner_name, session) {
	return async (dispatch) => {
		dispatch(loadSession(await updateName(my_name, partner_name, session)));
	}
}