import React, {
	TouchableOpacity,
	View,
	Text,
	Image,
	Platform,
	NetInfo,
	Alert
} from 'react-native';

import Store from 'react-native-store';

import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from '../components/Form';
import CreatePartyDate from './CreatePartyDate';
import LogIn from './LogIn';
import Starter from './Starter';
import Navigator from './Navigator';
import asset from '../assets';
import styles from '../styles';
import { loadUser } from '../redux/modules/session';
import { load } from '../redux/modules/message';

class Splash extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			network: null,
			selected_date: null,
		}
	}

	componentDidMount() {
		this.props.loadSession();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.state !== 'initial state' && nextProps.state != null) {
			this.props.loadMessage();
		} else {
			this.props.navigator.popToTop();
		}
	}

	render() {
		const { state } = this.props;
		const { init } = this.props;

		if(this.state.network === false) {
			return (
				<View style={styles.centerLayout}>
					<Text>请检查你的网络环境</Text>
				</View>
			)
		}

		if(this.props.state === 'initial state') {
			return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Image source={asset.splash} />
				</View>
			)
		}else if(this.props.state === null) {
			return (
				<LogIn navigator={this.props.navigator} />
			)
		}else {
			return (
				<Navigator navigator={this.props.navigator} />
			)
		}

	}
}

export default connect(
	state => ({ state: state.session }), 
	dispatch => ({
		loadSession: () => dispatch(loadUser()),
		loadMessage: () => dispatch(load()),
	})
)(Splash);
