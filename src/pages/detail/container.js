import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../dashboard/actions';
import View from './view';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
};

let container = connect(mapStateToProps, mapDispatchToProps)(View);

export default container;
