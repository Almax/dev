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
import globalStyles from '../styles';
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
import Schedule from './Schedule';
import Chat from './Chat';
import More from './More';
import FindPartner from './FindPartner';
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mock: null
		}
	}
	_invite() {
		this.props.navigator.push({
			component: FindPartner
		});
	}
 	render() {
		const { marry, navigator } = this.props;
		if(typeof marry === 'object') {
			return (
				<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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

						<View style={{ flex: 1 }}>
							<View style={{ justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap' }}>
								<TouchableOpacity
										onPress={ () => navigator.push({ component: AccountBook }) }
										style={styles.textIcon}>
									<Image source={asset.accountBook} style={styles.icon} />
									<Text style={styles.text}>账本</Text>
								</TouchableOpacity>
								<TouchableOpacity
										onPress={ () => navigator.push({ component: Schedule }) }
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
										onPress={ () => navigator.push({ component: Chat }) }
										style={styles.textIcon}>
									<Image source={asset.msg} style={styles.icon} />
									<Text style={styles.text}>聊天</Text>
								</TouchableOpacity>
								<TouchableOpacity
										onPress={ () => navigator.push({ component: More }) }
										style={styles.textIcon}>
									<Image source={asset.configure} style={styles.icon} />
									<Text style={styles.text}>设置</Text>
								</TouchableOpacity>
							</View>
						</View>

						{
							marry.users.length == 1 ? 
							<View style={[{ flexDirection: 'row', height: 80, alignItems: 'center', marginBottom: 100 }, globalStyles.yellow_box]}>
								<Image source={asset.couple} style={{ height: 40 }} resizeMode={"contain"} />
								<View style={{ flex: 1, paddingHorizontal: 10 }}>
									<TouchableOpacity onPress={this._invite.bind(this)}><Text style={{ fontSize: 14, color: '#666666' }}>
										你现在是单人模式, 邀请另一半加入婚礼, 双人模式 筹备婚礼更简单哦~ <Text style={{ fontWeight: '500' }}>点我邀请</Text></Text>
									</TouchableOpacity>
								</View>
							</View>
							: 
							null
						}

        <ActionButton onPress={() => this.props.navigator.push({ component: Add })} buttonColor="#F06199">
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
		height: 70,
		width: 70,
		borderRadius: 35,
		marginTop: 20,
		backgroundColor: '#FFFCE6',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#E0DBC0',
	},
	emptyIcon: {
		height: 70,
		width: 70,
		borderRadius: 35,
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
