import React, {
	Component,
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import asset from '../assets';
import { setMyMarry } from '../redux/modules/marry';
import moment from 'moment';
import Swiper from 'react-native-swiper2';
import Story from './Story';
import AccountBook from './AccountBook';
import Todo from './Todo';
import OurWedding from './OurWedding';
import Add from './Add';
import { BackStep } from '../components/View';
import ActionButton from 'react-native-action-button';

class TodoList extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
					<BackStep navigator={this.props.navigator} />
					<Todo navigator={this.props.navigator} />
			</View>
		);
	}
}
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mock: null
		}
	}
	// componentDidMount() {
	// }
	// componentWillReceiveProps(nextProps) {
	// }
 	render() {
		const { state, navigator } = this.props;

		if(this.props.marry) {
			const { marry } = this.props;
			return (
				<View style={{ flex: 1 }}>
						<Swiper height={200} showsPagination={true} showsButtons={false}>
							<View style={styles.bannerWrapper}>
								<Image source={asset.homeBanner} style={styles.bannerImage} resizeMode={"contain"} />
							</View>
							<View style={styles.bannerWrapper}>
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}> 
									<Image source={asset.marryBanner} style={{ height: 100 }} resizeMode={"contain"} />
									<View style={{ marginLeft: 15 }}>
										<Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '300' }}>{moment(marry.marry_date).format("YYYY年MM月DD日")}</Text>
										<View style={{ height: 5 }} />
										<Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '300' }}>是你们俩大喜的日子哦~</Text>
									</View>
								</View>
							</View>
						</Swiper>
						<View style={{ justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap' }}>
							<TouchableOpacity
									onPress={ () => navigator.push({ component: AccountBook }) }
									style={styles.textIcon}>
								<Image source={asset.accountBook} style={styles.icon} />
								<Text style={styles.text}>账本</Text>
							</TouchableOpacity>
							<TouchableOpacity
									onPress={ () => navigator.push({ component: TodoList }) }
									style={styles.textIcon}>
								<Image source={asset.taskBook} style={styles.icon} />
								<Text style={styles.text}>待办</Text>
							</TouchableOpacity>
							<TouchableOpacity
									onPress={ () => navigator.push({ component: Story }) }
									style={styles.textIcon}>
								<Image source={asset.storyBook} style={styles.icon} />
								<Text style={styles.text}>故事</Text>
							</TouchableOpacity>
						</View>
						<View style={{ justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap' }}>
							<TouchableOpacity
									onPress={ () => navigator.push({ component: OurWedding }) }
									style={styles.textIcon}>
								<Image source={asset.marryBook} style={styles.icon} />
								<Text style={styles.text}>婚礼</Text>
							</TouchableOpacity>
							<TouchableOpacity
									activeOpacity={1}
									style={styles.emptyIcon}>
							</TouchableOpacity>
							<TouchableOpacity
									activeOpacity={1}
									style={styles.emptyIcon}>
							</TouchableOpacity>
						</View>

        <ActionButton onPress={() => this.props.navigator.push({ component: Add })} buttonColor="rgba(231,76,60,1)">
        </ActionButton>

				</View>
			);
		}else {
			return (
				<View />
			)
		}
	}
}

const styles = StyleSheet.create({
	bannerWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 200,
		backgroundColor: '#F06199'
	},
	bannerImage: {
		height: 100
	},

	textIcon: {
		height: 80,
		width: 80,
		borderRadius: 40,
		marginTop: 20,
		backgroundColor: '#FFFCE6',
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyIcon: {
		height: 80,
		width: 80,
		borderRadius: 40,
		marginTop: 20,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		width: 35,
		height: 35,
		resizeMode: 'contain',
		margin: 5,
	},
	text: {
		fontSize: 14,
		color: '#999999'
	},
	helperText: {
		fontSize: 12,
		color: '#CCCCCC',
	},
	title: {
		fontSize: 14,
		color: '#FFFFFF'
	}
})

export default connect(
	state => ({ marry: state.marry }),
	dispatch => ({
		updateMarry: (data) => dispatch(setMyMarry(data))
	})
)(Home)
