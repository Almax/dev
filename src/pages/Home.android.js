import React, {
	ScrollView,
	RefreshControl,
	View,
	Text,
	Image,
	Linking,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import asset from '../assets';
import globalStyles from '../styles';
import { setMyMarry } from '../redux/modules/marry';
import { loadUser } from '../redux/modules/session';
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
import FeedBack from './FeedBack';
import WebPage from './WebPage';
import SocialWedding from './SocialWedding';
import MyWedding from './MyWedding';
class Badge extends React.Component {
	render() {
		const { value } = this.props;
		return (
			<View style={styles.badge}>
				<Text style={{ color: '#FFFFFF', fontSize: 14 }}>{value}</Text>
			</View>
		);
	}
}

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mock: null,
			isRefreshing: false
		}
	}
	componentDidMount() {
		const { marry } = this.props;
		if(marry.id) {
			
		} else {
			this.props.navigator.push({
				title: '邀请另一半',
				component: FindPartner
			});
		}
	}
	_invite() {
		this.props.navigator.push({
			component: FindPartner
		});
	}
	_onRefresh() {
		this.setState({isRefreshing: true});
		setTimeout(() => {
			this.props.loadSession();
		  this.setState({
		    isRefreshing: false
		  });
		}, 2000);
		
	}
 	render() {
		const { marry, navigator, unread } = this.props;
 		const url = 'http://weixin.marrynovo.com/app/index.php?i=2&c=home&a=page&id=6';
		if(typeof marry === 'object') {
			return (
				<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

					<View style={{ height: 150, backgroundColor: '#F06199', alignItems: 'center', justifyContent: 'center' }}>
						<TouchableOpacity 
							onPress={() => Linking.openURL(url).catch(err => console.error('An error occurred', err)) } 
							style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}> 
							
							<Image source={asset.bookBanner} style={{ width: 100 }} resizeMode={'contain'} />
							<View style={{ alignItems: 'center', justifyContent: 'center' }}>
								<Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '300' }}>《婚格物语》官方婚礼绘本</Text>
								<View style={{ height: 5 }} />
								<Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '300' }}>开始预售，5月发货~</Text>
							</View>

						</TouchableOpacity>
					</View>

						{
							marry.users.length == 1 ? 
							<View style={[{ flexDirection: 'row', height: 50, alignItems: 'center' }, globalStyles.yellow_box]}>
								<Image source={asset.couple} style={{ height: 30 }} resizeMode={"contain"} />
								<View style={{ flex: 1, paddingHorizontal: 10 }}>
									<TouchableOpacity onPress={this._invite.bind(this)}><Text style={{ fontSize: 14, color: '#666666' }}>
										你现在是单人模式, 邀请另一半加入婚礼, 双人模式 筹备婚礼更简单哦~ <Text style={{ fontWeight: '500' }}>点我邀请</Text></Text>
									</TouchableOpacity>
								</View>
							</View>
							: 
							null
						}

						<ScrollView 
							contentContainerStyle={{ flex: 1 }}
			        refreshControl={
			          <RefreshControl
			            refreshing={this.state.isRefreshing}
			            onRefresh={this._onRefresh.bind(this)}
			            tintColor="#F06199"
			            title="正在更新..."
			            colors={['#F06199']}
			            progressBackgroundColor="#FFFFFF"
			          />
			        }>
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
                    onPress={ () => navigator.push({ title: '小课堂', component: WebPage }) }
                    style={styles.textIcon}>
                  <Image source={asset.i_50} style={styles.icon} />
                  <Text style={styles.text}>小课堂</Text>
                </TouchableOpacity>
							
								<TouchableOpacity
										onPress={ () => navigator.push({ component: MyWedding }) }
										style={styles.textIcon}>
									<Image source={asset.i_22} style={styles.icon} />
									<Text style={styles.text}>我的婚礼</Text>
								</TouchableOpacity>
								
								<TouchableOpacity
										onPress={ () => navigator.push({ component: SocialWedding }) }
										style={styles.textIcon}>
									<Image source={asset.i_51} style={styles.icon} />
									<Text style={styles.text}>参加婚礼</Text>
								</TouchableOpacity>

							</View>

						</ScrollView>

						<View 
							style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', padding: 20, alignItems: 'center', justifyContent: 'center' }}>
							
							<View style={{ width: 220, paddingHorizontal: 10, borderRadius: 40, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#FEFDE5', borderWidth: 1, borderColor: '#E6E4C0' }}>
								
								<TouchableOpacity style={{ width: 40, alignItems: 'center', justifyContent: 'center' }}>
									<Image source={asset.house} />
									<Text style={{ color: '#9A804A' }}>首页</Text>
								</TouchableOpacity>
								
								<TouchableOpacity onPress={() => this.props.navigator.push({ component: Add })}  style={{ alignItems: 'center', justifyContent: 'center' }}>
									<Image source={asset.write} />
								</TouchableOpacity>
								
								<TouchableOpacity onPress={() => navigator.push({ title: '联系人', component: Chat })} style={{ width: 40, alignItems: 'center', justifyContent: 'center' }}>
									<Image source={asset.talk} />
									<Text style={{ color: '#9A804A' }}>联系人</Text>
								</TouchableOpacity>
							</View>

						</View>

				</View>
			);
		}else {
			return (
				<View />
			)
		}
	}
}


// <ActionButton 
// 	onPress={() => this.props.navigator.push({ component: Add })} 
// 	buttonColor="#F06199" position={"center"} />

const styles = StyleSheet.create({
	bannerWrapper: {
		alignItems: 'center',
		height: 140,
		backgroundColor: '#F06199'
	},
	bannerImage: {
		height: 100
	},

	textIcon: {
		height: 70,
		width: 70,
		borderRadius: 35,
		marginTop: 15,
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
		width: 30,
		height: 30,
		resizeMode: 'contain',
		margin: 2,
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
		updateMarry: (data) => dispatch(setMyMarry(data)),
		loadSession: () => dispatch(loadUser()),
	})
)(Home);