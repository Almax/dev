import { combineReducers } from 'redux';
import sessionReducer from './modules/session';
import taskReducer from './modules/task';
import marryReducer from './modules/marry';
import storyReducer from './modules/story';
import moneyReducer from './modules/money';
import messageReducer from './modules/message';

export default combineReducers({
	session: sessionReducer,
  task: taskReducer,
  marry: marryReducer,
  story: storyReducer,
  money: moneyReducer,
  message: messageReducer,
});