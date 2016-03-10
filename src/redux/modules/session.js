import { 
	currentUser, 
	cleanUser, 
	userLogin, 
	storeUserSession, 
	updateName,
	updateBasicProfile
} from '../../utils/session'

import { createAction, handleActions } from 'redux-actions'
/* action type */
export const LOAD_USER = 'app/session/load_user'
export const LOGOUT_USER = 'app/session/logout_user'

/* initial state */
const initialState = 'initial state'

/* state reduce */
const reducer = handleActions({
	[LOAD_USER]: (state, action) => {
		return action.payload;
	},
	[LOGOUT_USER]: (state, action) => {
		return null;
	}
}, initialState)

export default reducer

export const loadSession = createAction(LOAD_USER)
export const cleanSession = createAction(LOGOUT_USER)

/* 使用账号密码登陆 */
export function login(username, password) {
	return async (dispatch) => {
		dispatch(loadSession(await userLogin(username, password)))
	}
}

/* 从本地storage里取得登陆状态 */
export function loadUser() {
	return async (dispatch) => {
		var user =  await currentUser()
		if(user) {
			dispatch(loadSession(user))
		}else {
			dispatch(cleanSession())
		}
	}
}

/* 清空登陆状态 */
export function logout() {
	return async (dispatch) => {
		dispatch(cleanSession(await cleanUser()));
	}
}

/* 提供正确的session也能登陆成用户状态 */
export function store(session) {
	return async (dispatch) => {
		dispatch(loadSession(await storeUserSession(session)))
	}
}

/* 更新用户的个人资料 */
export function updateProfile(basic_profile) {
	return async (dispatch) => {
		var session = await updateBasicProfile(basic_profile);
		console.warn('session:', session);
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