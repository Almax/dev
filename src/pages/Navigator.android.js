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

	onActionSelected(action) {
		if(action === 1) {
			this.props.navigator.push({ component: TodoTimeline });
		}else if(action === 2) {
			this.props.navigator.push({ component: TodoCate });
		}else if(action === 3) {
			this.props.navigator.push({ component: More });
		}else if(action === 0) {
			this.props.navigator.push({ component: TodoNew });
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