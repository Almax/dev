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
	render() {
		return (
		<View style={{ backgroundColor: '#FFFFFF', marginBottom: 1 }}>
			<TouchableOpacity style={styles.searchBar}>
				<Text style={styles.searchPlaceholder}>搜索</Text>
			</TouchableOpacity>

			<View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', justifyContent: 'space-around'}}>
				<TouchableOpacity style={styles.tab}>
					<Image style={styles.tabImage} source={asset.i_1} />
					<Text style={styles.tabText}>联系人</Text>
				</TouchableOpacity>
				
				<TouchableOpacity style={styles.tab}>
					<Image style={styles.tabImage} source={asset.i_2} />
					<Text style={styles.tabText}>手机通讯录</Text>
				</TouchableOpacity>
				
				<TouchableOpacity style={styles.tab}>
					<Image style={styles.tabImage} source={asset.i_3} />
					<Text style={styles.tabText}>群聊</Text>
				</TouchableOpacity>
			</View>
		</View>
		);
	}
}
const styles = StyleSheet.create({
	searchBar: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 30,
		backgroundColor: '#EEEEEE',
		borderRadius: 5,
		marginHorizontal: 10,
		marginVertical: 5,
	},
	searchPlaceholder: {
		fontWeight: '500',
		color: '#666666'
	},
	tab: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10,
	},
	tabImage: {
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