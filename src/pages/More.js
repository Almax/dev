import React, {
	ScrollView,
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const { width, height } = Dimensions.get('window');
import asset from '../assets';
import styles from '../styles';
import { connect } from 'react-redux';
import { logout } from '../redux/modules/session';
import BasicProfile from './BasicProfile';
import BasicMarry from './BasicMarry';
import About from './About';
import BasicSecurity from './BasicSecurity';

class More extends React.Component {
	componentDidMount() {

	}
	render() {
		const { navigator } = this.props
		const { user } = this.props;
		
		if(user) {
			return (
				<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
			      <Image source={asset.user} style={{ height: 180, width: width }} resizeMode={"stretch"}>
								<View style={innerStyles.layer}>

									<Image source={{ uri: `${user.photo}?imageView2/1/w/200/h/200` }} style={{ borderWidth: 1, borderColor: '#FFFFFF', height: 100, width: 100, borderRadius: 50 }} />	
									<View style={{ marginVertical: 5, backgroundColor: 'transparent' }}>
										<Text style={innerStyles.username}> {user.name}</Text>
									</View>

									{ 
										user.signature ? 
										<View style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 5, borderWidth: 1, borderColor: '#FFFFFF' }}>
											<Text style={{ color: '#FFFFFF', fontWeight: '200', fontSize: 14 }}>{user.signature}</Text>
										</View>
										: 
										null 
									}

								</View>
						</Image>
						<ScrollView contentContainerStyle={{ backgroundColor: '#EFEFEF' }}>
							
							<View style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}>
								<Text style={{ fontSize: 16, fontWeight: '500', color: '#666666' }}>资料</Text>
							</View>

							<TouchableOpacity
									onPress={ () => navigator.push({ component: BasicMarry }) }
									style={styles.textIcon}>
								<View style={styles.textWrapper}>
									<Image source={asset.wedding} style={styles.icon} />
									<Text style={styles.text}>我的婚礼信息</Text>
								</View>
								<Text style={styles.helperText}>我们的婚礼信息</Text>
							</TouchableOpacity>

							<TouchableOpacity
									onPress={ () => navigator.push({ component: BasicProfile }) }
									style={styles.textIcon}>
								<View style={styles.textWrapper}>
									<Image source={asset.account} style={styles.icon} />
									<Text style={styles.text}>账户信息</Text>
								</View>
								<Text style={styles.helperText}>修改我的资料</Text>
							</TouchableOpacity>

							<TouchableOpacity
									onPress={ () => navigator.push({ component: BasicSecurity }) }
									style={styles.textIcon}>
								<View style={styles.textWrapper}>
									<Image source={asset.safe} style={styles.icon} />
									<Text style={styles.text}>安全信息</Text>
								</View>
								<Text style={styles.helperText}>账户密码安全保护</Text>
							</TouchableOpacity>

							<TouchableOpacity
									onPress={ () => navigator.push({ component: About }) }
									style={styles.textIcon}>
								<View style={styles.textWrapper}>
									<Image source={asset.about} style={styles.icon} />
									<Text style={styles.text}>关于我们</Text>
								</View>
								<Text style={styles.helperText}>教你怎么找到我们</Text>
							</TouchableOpacity>
			

							<View style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}></View>

							<View style={{ marginBottom: 20, backgroundColor: '#FFFFFF' }}>
							<TouchableOpacity
									onPress={ () => this.props.cleanSession() }
									style={styles.textIcon}>
								<View style={styles.textWrapper}>
									<Image source={asset.exit} style={styles.icon} />
									<Text style={styles.text}>退出</Text>
								</View>
								<Text style={styles.helperText}>退出婚格</Text>
							</TouchableOpacity>
							</View>
						</ScrollView>
						
		    </View>
			);
		} else {
			return <View />
		}
	}
}

export default connect(
	state => ({ user: state.session }),
	dispatch => ({
		cleanSession: () => dispatch(logout())
	})
)(More)

const innerStyles = StyleSheet.create({
	cover: {
		width, 
		height: 180,
	},
	username: {
		fontSize: 18,
		color: '#FFFFFF'
	},
	avatar: {
		height: 150,
		width: 150,
		borderRadius: 75
	},
	layer: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
	},
})