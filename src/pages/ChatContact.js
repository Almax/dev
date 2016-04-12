import React, {
	Alert,
	TouchableOpacity,
	View,
	Text,
	Image,
	ListView,
	RefreshControl,
	StyleSheet,
} from 'react-native';
import { BackStep } from '../components/View';
import ChatMenu from '../components/ChatMenu';
import { load, reload } from '../utils/contact';
class ChatContact extends React.Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({ rowHasChanged: (r1,r2)=>r1!==r2 });
		this.state = {
			ds,
			isRefreshing: false
		}
	}
	async componentDidMount() {
		await load((contacts) => {
		  this.setState({
		  	ds: this.state.ds.cloneWithRows(contacts)
		  });
		});
	}
	_renderContact(contact) {
		return (
			<View style={{ 
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingHorizontal: 10, 
					paddingVertical: 15, 
					marginBottom: 1, 
					backgroundColor: '#FFFFFF' 
				}}>
				
				<View>
					<Text style={styles.contactName}>{ contact.name }</Text>
					<Text style={styles.contactPhone}>{ contact.phone }</Text>
				</View>

				<View>
					{ contact.user ?
						<TouchableOpacity style={styles.addButton}>
							<Text style={styles.textButton}>添加好友</Text>
						</TouchableOpacity>
					 :
					 	<TouchableOpacity style={styles.inviteButton}>
					 		<Text style={styles.textButton}>邀请加入</Text>
					 	</TouchableOpacity> 
					}
				</View>

			</View>
		);
	}
	async _onRefresh() {
    this.setState({isRefreshing: true});
    await reload((contacts) => {
		  this.setState({
		  	ds: this.state.ds.cloneWithRows(contacts),
		  	isRefreshing: false
		  });
		  Alert.alert('更新通讯录成功!')
    })
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<BackStep navigator={this.props.navigator} title={'我的联系人'} />
				<ChatMenu />
				<ListView 
					initialListSize={20}
					dataSource={this.state.ds} 
					renderRow={this._renderContact.bind(this)}
					refreshControl={
	          <RefreshControl
	            refreshing={this.state.isRefreshing}
	            onRefresh={this._onRefresh.bind(this)}
	            tintColor="#ff0000"
	            title="匹配通讯录..."
	            progressBackgroundColor="#ffff00"
	          />			
        	} />

			</View>
		);
	}
}
const styles = StyleSheet.create({
	contactName: {
		fontSize: 18,
		color: '#666666'
	},
	contactPhone: {
		fontSize: 14,
		color: '#999999'
	},
	addButton: {
		padding: 10,
		backgroundColor: '#9DE5FC',
		borderRadius: 5,
	},
	inviteButton: {
		padding: 10,
		backgroundColor: '#999999',
		borderRadius: 5,
	},
	textButton: {
		color: '#FFFFFF',
	}
});
export default ChatContact;