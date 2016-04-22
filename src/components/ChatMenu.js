import React, {
	View,
	Image,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';
import asset from '../assets';

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

class ChatMenu extends React.Component {
	_touch(id) {
		const { onPress } = this.props;
		onPress(id);
	}
	render() {
		const { unread } = this.props;
		return (
			<View style={{ backgroundColor: '#FFFFFF' }}>
				<View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'space-around'}}>

					<TouchableOpacity onPress={this._touch.bind(this, 3)} style={styles.tab}>
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image style={styles.tabImage} source={asset.i_3} />
							<Text style={styles.tabText}>通知消息</Text>

							{ unread ? <Badge value={unread} /> : null }
						</View>
					</TouchableOpacity>

					<View style={{ height: 30, width: 1, backgroundColor: '#EEEEEE' }} />
					
					<TouchableOpacity onPress={this._touch.bind(this, 2)} style={styles.tab}>
						<Image style={styles.tabImage} source={asset.i_2} />
						<Text style={styles.tabText}>添加好友</Text>
					</TouchableOpacity>
					
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10,
	},
	tabImage: {
		height: 20, 
		width: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 5,
		backgroundColor: '#FFFFFF',
	},
	tabText: {
		color: '#666666',
		fontWeight: '500',
	},
	badge: {
		position: 'absolute',
		right: -5,
		top: 0, 
		backgroundColor: 'red', 
		height: 18, 
		width: 18, 
		borderRadius: 9, 
		alignItems: 'center', 
		justifyContent: 'center' 
	},
})

export default ChatMenu;