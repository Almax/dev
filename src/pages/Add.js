import React, {
	Component,
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Platform,
} from 'react-native';

import TodoNew from './TodoNew';
import AccountStore from './AccountStore';
const { width, height } = Dimensions.get('window')
import asset from '../assets'
export default class Add extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		// this.props.navigator.push({
		// 	component: AccountStore
		// });
	}
	render() {
		const { navigator } = this.props;

		let styles = null;
		if (Platform.OS === 'android') {
			styles = androidStyle;
		} else if (Platform.OS === 'ios') {
			styles = iosStyle;
		}

		return (
			<View style={styles.container}>

				<View style={styles.imageWrapper}>
					<Image source={asset.createBanner} style={{  width: width - 20 }} resizeMode={"contain"} />
				</View>

				<View style={styles.buttonGroup}>
					<TouchableOpacity style={styles.button} onPress={() => navigator.push({ component: TodoNew }) }>
						<Text style={styles.buttonText}>添加任务</Text>
					</TouchableOpacity>

					<View style={styles.divider} />
					
					<TouchableOpacity style={styles.button} onPress={() => navigator.push({ component: AccountStore })}>
						<Text style={styles.buttonText}>记一笔</Text>
					</TouchableOpacity>
				</View>

			</View>
		);
	}
}

const iosStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F06199',
		paddingBottom: 40,
	},
	imageWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonGroup: {
		flexDirection: 'row',
		backgroundColor: '#F47AAA',
		width,
		height: 150,
	},
	button: {
		flex: 1,
		height: 150,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 18,
	},
	divider: {
		height: 150,
		width: 1,
		backgroundColor: '#F06199',
	}
});

const androidStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F06199',
	},
	imageWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonGroup: {
		flexDirection: 'row',
		backgroundColor: '#F47AAA',
		width,
		height: 150,
	},
	button: {
		flex: 1,
		height: 150,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 18,
	},
	divider: {
		height: 150,
		width: 1,
		backgroundColor: '#F06199',
	}
});