import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { types } from './actions';

const defaultState = handleActions(
  {
    [types.UPDATE_ITEM](state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  },
  {
    item: null
  }
);

const reducers = combineReducers({
  defaultState
});

export default reducers;
