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
import { load as loadMessage } from '../redux/modules/message';
import { load as LoadMoney } from '../redux/modules/money';
import { init as loadTodos } from '../redux/modules/task';
import { load as loadStories } from '../redux/modules/story';
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
		const { session } = nextProps
		if (session === 'initial state' || session === null) {
			this.props.navigator.popToTop();
		}
	}
	render() {
		const { session } = this.props;
		if (this.state.network === false) {
			return (
				<View style={styles.centerLayout}>
					<Text>请检查你的网络环境</Text>
				</View>
			);
		}
		if (session === 'initial state') {
			return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Image source={asset.splash} />
				</View>
			);
		} else if(session === null) {
			return (
				<LogIn navigator={this.props.navigator} />
			);
		} else {
			return (
				<Navigator navigator={this.props.navigator} />
			);
		}

	}
}

export default connect(
	state => ({ 
		session: state.session, 
		money: state.money, 
		marry: state.marry,
		task: state.task,
		story: state.story,
		message: state.message
	}), 
	dispatch => ({
		loadSession: () => dispatch(loadUser()),
		loadMessage: () => dispatch(loadMessage()),
		loadTodos: () => dispatch(loadTodos()),
		loadMarry: () => dispatch(loadMarry()),
		loadStories: (marry) => dispatch(loadStories(marry))
	})
)(Splash);
