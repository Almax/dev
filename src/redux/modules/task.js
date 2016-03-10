import {
	loadTask,
	createTask,
  updateTask
} from '../../utils/syncdata'

import { createAction, handleActions } from 'redux-actions';

export const INITIAL = 'app/task/initial'
export const INITIAL_TASK = 'app/task/initial_task'
export const FETCH_TASK = 'app/task/fetch_task'
export const CREATE_TASK = 'app/task/create_task'
export const UPDATE_TASK = 'app/task/update_task'


const initialState = "initial state"

const reducer = handleActions({
  [INITIAL_TASK]: (state, action) => {
    return action.payload;
  },
  [CREATE_TASK]: (state, action) => {
  	return state;
  },
  [FETCH_TASK]: (state, action) => {
    return action.payload;
  },
  [UPDATE_TASK]: (state, action) => {
    var newState = [...state];
    const { payload } = action;   
    Object.keys(state).map((key) => {
      if(state[key].id == payload.id) {
        newState[key] = payload;
      }
    });
    return newState;
  }
}, initialState);

export default reducer;

export const initialTask = createAction(INITIAL_TASK)
export const fetchTask = createAction(FETCH_TASK)
export const createNewTask = createAction(CREATE_TASK)
export const updateTheTask = createAction(UPDATE_TASK)

export function init() {
  return async (dispatch) => {
    dispatch(initialTask(await loadTask()));
  };
}

export function load() {
	return async (dispatch) => {
    dispatch(fetchTask(await loadTask()));
	}
}

export function create(data) {
	return async (dispatch) => {
		dispatch(createNewTask(await createTask(data)))
	}
}

export function update(data) {
  return async (dispatch) => {
    dispatch(updateTheTask(await updateTask(data)))
  }
}