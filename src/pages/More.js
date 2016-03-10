import React, {
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
import WebView from './WebView';

class More extends React.Component {
	render() {
		const { navigator } = this.props
		const user = this.props.state
		
		return (
		<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
	      <Image source={asset.user} style={{ height: 220, width: width }} resizeMode={"stretch"}>
						<View style={innerStyles.layer}>

							<Image source={{ uri: user.photo }} style={{ height: 100, width: 100, borderRadius: 50 }} />	
							<View style={{ marginVertical: 5, backgroundColor: 'transparent' }}>
								<Text style={innerStyles.username}> {user.name}</Text>
							</View>

							<View style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 5, borderWidth: 1, borderColor: '#FFFFFF' }}>
								<Text style={{ color: '#FFFFFF', fontWeight: '200', fontSize: 14 }}>{user.signature}</Text>
							</View>

						</View>
				</Image>
				<View style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}>
					<Text style={{ fontSize: 16, fontWeight: '500', color: '#666666' }}>资料</Text>
				</View>

				<View style={{ backgroundColor: '#FFFFFF' }}>
				<TouchableOpacity
						onPress={ () => navigator.push({ component: BasicProfile }) }
						style={styles.textIcon}>
					<View style={styles.textWrapper}>
						<Image source={asset.icon_book} style={styles.icon} />
						<Text style={styles.text}>个人资料</Text>
					</View>
					<Text style={styles.helperText}>修改我的资料</Text>
				</TouchableOpacity>

				<TouchableOpacity
						onPress={ () => navigator.push({ component: BasicMarry }) }
						style={styles.textIcon}>
					<View style={styles.textWrapper}>
						<Image source={asset.icon_book} style={styles.icon} />
						<Text style={styles.text}>婚礼信息</Text>
					</View>
					<Text style={styles.helperText}>我们的婚礼信息</Text>
				</TouchableOpacity>

				<TouchableOpacity
						onPress={ () => navigator.push({ component: WebView }) }
						style={styles.textIcon}>
					<View style={styles.textWrapper}>
						<Image source={asset.icon_book} style={styles.icon} />
						<Text style={styles.text}>联系我们</Text>
					</View>
					<Text style={styles.helperText}>教你怎么找到我们</Text>
				</TouchableOpacity>
				</View>

				<View style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}></View>

				<View style={{ marginBottom: 20, backgroundColor: '#FFFFFF' }}>
				<TouchableOpacity
						onPress={ () => this.props.cleanSession() }
						style={styles.textIcon}>
					<View style={styles.textWrapper}>
						<Image source={asset.icon_book} style={styles.icon} />
						<Text style={styles.text}>退出</Text>
					</View>
					<Text style={styles.helperText}>退出婚格</Text>
				</TouchableOpacity>
				</View>

    </View>
		)
	}
}

export default connect(
	state => ({ state: state.session }),
	dispatch => ({
		cleanSession: () => dispatch(logout())
	})
)(More)

const innerStyles = StyleSheet.create({
	cover: {
		width, 
		height: 200,
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
		alignItems: 'center',
		justifyContent: 'center',
	},
})