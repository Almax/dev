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
import { BackStep } from '../components/View';
import { PureButton } from '../components/Form';
import FindPartner from './FindPartner';
class TodoList extends React.Component {
	render() {
		return (
			<View style={{flex: 1, backgroundColor: '#EFEFEF'}}>
					<BackStep navigator={this.props.navigator} title={"待办"}></BackStep>
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
	_invite() {
		this.props.navigator.push({
			component: FindPartner
		});
	}
 	render() {
		const { state, navigator } = this.props;

		if(this.props.marry) {
			const { marry } = this.props;
			return (
				<View style={{ flex: 1 }}>

						<Swiper height={180} showsPagination={true} showsButtons={false}>
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
						</View>

						{
							marry.users.length == 1 ? 
							<View style={{ backgroundColor: '#FFF7DD', margin: 10, padding: 10, borderWidth: 1, borderColor: '#E0DBC0' }}>
								<PureButton
									size={"small"} 
									onPress={this._invite.bind(this)}
									style={{ backgroundColor: 'transparent' }}>
									你现在是单人模式，立即邀请另一半加入婚礼?
								</PureButton>
							</View>
							: 
							null
						}

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