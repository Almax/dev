import { combineReducers } from 'redux';
import session from './modules/session';
import task from './modules/task';
import marry from './modules/marry';
import story from './modules/story';
import money from './modules/money';
import message from './modules/message';
import friend from './modules/friend';
import chat from './modules/chat';
export default combineReducers({
	session,
  task,
  marry,
  story,
  money,
  message,
  friend,
  chat,
});