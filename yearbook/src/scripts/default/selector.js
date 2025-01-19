import { createSelector } from 'reselect';

const getState = state => state || {};

const getDefaultState = createSelector(
  [getState],
  defaultState => defaultState.item || {}
);

export { getDefaultState };
