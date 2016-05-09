import React, {
	ScrollView,
	View,
	Text,
	Image,
	RefreshControl,
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
import { BackStep } from '../components/View';
import { PureButton } from '../components/Form';
import FindPartner from './FindPartner';
import TodoNew from './TodoNew';
import ActionButton from 'react-native-action-button';
import FeedBack from './FeedBack';
import WebPage from './WebPage';
import MyWedding from './MyWedding';
import SocialWedding from './SocialWedding';
class TodoList extends React.Component {
	render() {
		return (
			<View style={{flex: 1, backgroundColor: '#EFEFEF'}}>
				<Todo navigator={this.props.navigator} />
        <ActionButton 
        	position={"center"}
        	onPress={() => this.props.navigator.push({ component: TodoNew })}
        	buttonColor="#F06199" />
			</View>
		);
	}
}
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mock: null,
			isRefreshing: false,
		};
	}
	componentDidMount() {
		const { marry } = this.props;
		if(marry === null) {
			this.props.navigator.push({
				title: '邀请另一半',
				component: FindPartner
			});
		}
	}
	_invite() {
		this.props.navigator.push({
			title: '邀请另一半',
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
 		const url = 'http://weixin.marrynovo.com/app/index.php?i=2&c=home&a=page&id=6';
		const { state, navigator } = this.props;
		if(this.props.marry) {
			const { marry } = this.props;
			return (
				<View style={{ flex: 1 }}>
					<View style={{ height: 150, backgroundColor: '#F06199', alignItems: 'center', justifyContent: 'center' }}>
						<TouchableOpacity 
							onPress={() => Linking.openURL(url).catch(err => console.error('An error occurred', err)) } 
							style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}> 
							
							<Image source={asset.bookBanner} style={{ width: 100 }} resizeMode={'contain'} />
							<View style={{ alignItems: 'center', justifyContent: 'center' }}>
								<Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '300' }}>《婚格物语》官方婚礼绘本</Text>
								<View style={{ height: 5 }} />
								<Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '300' }}>  开始预售，5月发货~</Text>
							</View>

						</TouchableOpacity>
					</View>

						{
							marry.users.length == 1 ? 
							<View style={[{ flexDirection: 'row', height: 50, alignItems: 'center' }, globalStyles.yellow_box]}>
								<Image source={asset.couple} style={{ height: 30 }} resizeMode={"contain"} />
								<View style={{ flex: 1, paddingHorizontal: 10 }}>
									<TouchableOpacity onPress={this._invite.bind(this)}>
										<Text style={{ fontSize: 14, color: '#666666' }}>
											小主,你现在是单人模式，
											邀请另一半加入双人模式，点我邀请...
										</Text>
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
			            tintColor="#EEEEEE"
			            title="正在更新..."
			            colors={['#EEEEEE']}
			            progressBackgroundColor="#FFFFFF"
			          />
			        }>
			        
						<View style={{ flex: 1 }}>
              <View style={{ justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap' }}>
                <TouchableOpacity
                    onPress={ () => navigator.push({ title: '账本', component: AccountBook }) }
                    style={styles.textIcon}>
                  <Image source={asset.accountBook} style={styles.icon} />
                  <Text style={styles.text}>账本</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => navigator.push({ title: '待办', component: TodoList }) }
                    style={styles.textIcon}>
                  <Image source={asset.taskBook} style={styles.icon} />
                  <Text style={styles.text}>待办</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => navigator.push({ title: '故事', component: Story }) }
                    style={styles.textIcon}>
                  <Image source={asset.storyBook} style={styles.icon} />
                  <Text style={styles.text}>故事</Text>
                </TouchableOpacity>
              </View>

              <View style={{ justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap' }}>
                <TouchableOpacity
                    onPress={ () => navigator.push({ title: '婚礼', component: MyWedding }) }
                    style={styles.textIcon}>
                  <Image source={asset.i_22} style={styles.icon} />
                  <Text style={styles.text}>我的婚礼</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => navigator.push({ title: '小课堂', component: WebPage }) }
                    style={styles.textIcon}>
                  <Image source={asset.i_50} style={styles.icon} />
                  <Text style={styles.text}>小课堂</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => navigator.push({ title: '参加婚礼', component: SocialWedding }) }
                    style={styles.textIcon}>
                  <Image source={asset.i_51} style={styles.icon} />
                  <Text style={styles.text}>参加婚礼</Text>
                </TouchableOpacity>
              </View>

						</View>
						</ScrollView>

						<View style={{ height: 50 }} />
				</View>
			);
		}else {
			return (
				<View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
						
					<TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, backgroundColor: '#CCCCCC' }} onPress={this._invite.bind(this)}>
						<Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '500' }}>生成我的婚礼</Text>
					</TouchableOpacity>

				</View>
			)
		}
	}
}


const styles = StyleSheet.create({
	bannerWrapper: {
		alignItems: 'center',
		height: 120,
		backgroundColor: '#F06199'
	},
	bannerImage: {
		height: 100,
	},

	textIcon: {
		height: 80,
		width: 80,
		borderRadius: 40,
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
	state => ({ marry: state.marry, chat: state.chat}),
	dispatch => ({
		updateMarry: (data) => dispatch(setMyMarry(data)),
		loadSession: () => dispatch(loadUser()),
	})
)(Home)