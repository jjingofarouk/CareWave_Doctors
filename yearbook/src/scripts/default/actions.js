import { createActions } from 'redux-actions';

const types = {
  UPDATE_ITEM: 'UPDATE_ITEM'
};

const actions = createActions(...Object.keys(types).map(type => types[type]));

export default actions;
export { types };


