import React, {
	View,
	Text,
	ToolbarAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { IconButton } from '../components/Form';
import asset from '../assets';
import Home from './Home';
import TodoNew from './TodoNew';
import ActionButton from 'react-native-action-button';
import FindPartner from './FindPartner';
import { getMyMarry } from '../redux/modules/marry'

class Navigator extends React.Component {

  componentDidMount() {
    this.props.loadMarry();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.marry === null) {
      this.props.navigator.push({
        component: FindPartner
      })
    }
  }

	render() {
		return (
			<Home navigator={this.props.navigator} />
		)
	}
}


export default connect(
  state => ({ marry: state.marry }),
  dispatch => ({
    loadMarry: () => dispatch(getMyMarry())
  })
)(Navigator)