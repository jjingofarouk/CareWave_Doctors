import { all } from 'redux-saga/effects';

import defaultSagas from '../default/sagas';

function* sagas() {
  yield all([defaultSagas()]);
}

export default sagas;
