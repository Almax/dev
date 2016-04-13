import React, {
	View,
	Image,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';
import asset from '../assets';
class ChatMenu extends React.Component {
	componentDidMount() {
		
	}
	_touch(id) {
		const { onPress } = this.props;
		onPress(id);
	}
	render() {
		return (
			<View style={{ backgroundColor: '#FFFFFF', marginBottom: 1 }}>
				<TouchableOpacity onPress={this._touch.bind(this, 0)} style={styles.searchBar}>
					<Image source={asset.find} style={styles.find} />
					<Text style={styles.searchPlaceholder}>查找手机号</Text>
				</TouchableOpacity>


				<View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', justifyContent: 'space-around'}}>

					<TouchableOpacity onPress={this._touch.bind(this, 3)} style={styles.tab}>
						<Image style={styles.tabImage} source={asset.i_3} />
						<Text style={styles.tabText}>通知消息</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={this._touch.bind(this, 1)} style={styles.tab}>
						<Image style={styles.tabImage} source={asset.i_1} />
						<Text style={styles.tabText}>联系人</Text>
					</TouchableOpacity>
					
					<TouchableOpacity onPress={this._touch.bind(this, 2)} style={styles.tab}>
						<Image style={styles.tabImage} source={asset.i_2} />
						<Text style={styles.tabText}>手机通讯录</Text>
					</TouchableOpacity>
					
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	find: {
		marginRight: 5,
		width: 15,
		height: 15,
	},
	searchBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		backgroundColor: '#EEEEEE',
		borderRadius: 5,
		marginHorizontal: 10,
		marginVertical: 10,
	},
	searchPlaceholder: {
		fontSize: 17,
		fontWeight: '400',
		color: '#999999'
	},
	tab: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 5,
	},
	tabImage: {
		height: 20, 
		width: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
		backgroundColor: '#FFFFFF',
	},
	tabText: {
		color: '#666666',
		fontWeight: '500',
	},
})

export default ChatMenu;