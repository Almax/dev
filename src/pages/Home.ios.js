import React, {
	ScrollView,
	View,
	Text,
	Image,
	RefreshControl,
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
import CameraView from './CameraView';
import ActionButton from 'react-native-action-button';

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
		const { state, navigator } = this.props;
		if(this.props.marry) {
			const { marry } = this.props;
			return (
				<View style={{ flex: 1 }}>
						<Swiper height={140} showsPagination={true} showsButtons={false}>
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
                    onPress={ () => navigator.push({ component: CameraView }) }
                    style={styles.textIcon}>
                  <Image source={asset.storyBook} style={styles.icon} />
                  <Text style={styles.text}>相册</Text>
                </TouchableOpacity>              
              </View>

						</View>

						{
							marry.users.length == 1 ? 
							<View style={[{ flexDirection: 'row', height: 80, alignItems: 'center' }, globalStyles.yellow_box]}>
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

						</ScrollView>

						<View style={{ height: 50 }} />
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
	state => ({ marry: state.marry, chat: state.chat }),
	dispatch => ({
		updateMarry: (data) => dispatch(setMyMarry(data)),
		loadSession: () => dispatch(loadUser()),
	})
)(Home)