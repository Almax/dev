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
import { getMyMarry } from '../redux/modules/marry';
class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badge: 0,
    }
  }
  componentDidMount() {
    this.props.loadMarry();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.marry === null) {
      this.props.navigator.push({
        component: FindPartner
      })
    } else {
      if(nextProps.message && nextProps.invitation) {
        let { invitation, message } = nextProps;
        if(message && message.length && message[0].pass === false) {
          this.setState({
            badge: invitation.length+1
          });
        } else {
          this.setState({
            badge: invitation.length
          });
        }
      }
    }
  }

	render() {
		return (
			<Home navigator={this.props.navigator} unread={this.state.badge} />
		)
	}
}


export default connect(
  state => ({
    marry: state.marry,
    message: state.message,
    invitation: state.invitation,
  }),
  dispatch => ({
    loadMarry: () => dispatch(getMyMarry())
  })
)(Navigator)