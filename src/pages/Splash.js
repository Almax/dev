import React, {
	TouchableOpacity,
	View,
	Text,
	Image,
	Platform,
	NetInfo,
	Alert,
} from 'react-native';

import Store from 'react-native-store';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from '../components/Form';
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
import Subscriber from './Subscriber';
class Splash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			network: null,
			selected_date: null,
		}
	}
	componentDidMount() {
		//this.props.loadSession();
	}
	componentWillReceiveProps(nextProps) {
		const { user } = nextProps
		if (user === 'initial state' || user === null) {
			this.props.navigator.popToTop();
		}
	}
	render() {
		const { user } = this.props;
		if (this.state.network === false) {
			return (
				<View style={styles.centerLayout}>
					<Text>请检查你的网络环境</Text>
				</View>
			);
		}
		if (user === 'initial state') {
			return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Image source={asset.splash} />
				</View>
			);
		} else if(user === null) {
			return (
				<LogIn navigator={this.props.navigator} />
			);
		} else {
			return (
			<View style={{ flex: 1 }}>
				<Navigator navigator={this.props.navigator} />
				<Subscriber />
			</View>
			);
		}

	}
}

export default connect(
	state => ({ 
		user: state.session, 
	}), 
	dispatch => ({
		
	})
)(Splash);
