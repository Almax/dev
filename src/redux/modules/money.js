import { getMoney,createMoney } from '../../utils/syncdata';
import { createAction, handleActions } from 'redux-actions';

export const INITIAL_MONEY = 'app/money/initial_money';
export const LOAD_MONEY = 'app/money/load_money';

const initialState = 'initial state';
const reducer = handleActions({
	[INITIAL_MONEY]: (state, action) => {
		return action.payload;
	},
	[LOAD_MONEY]: (state, action) => {
		return action.payload;
	}
},initialState);

export default reducer;

export const initialMoney = createAction(INITIAL_MONEY);
export const loadMoney = createAction(LOAD_MONEY);

export function init() {
	return (dispatch) => dispatch(initialMoney(0.00))
}

export function load(marry) {
	return async (dispatch) => {
		dispatch(loadMoney(await getMoney(marry)))
	} 
}