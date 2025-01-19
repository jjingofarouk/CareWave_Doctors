import DefaultComponent from './default.component';
import { connect } from 'react-redux';
import actions from './actions';

const mapStateToProps = state => {

  return { };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const DefaultContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultComponent);

export default DefaultContainer;
