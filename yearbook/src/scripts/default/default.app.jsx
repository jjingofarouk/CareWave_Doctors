import React from 'react';
import store from '../redux';
import { Provider } from 'react-redux';
import DefaultContainer from './default.container';
import '../../css/main.css';
class Account extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <DefaultContainer />
      </Provider>
    );
  }
}

export default Account;
