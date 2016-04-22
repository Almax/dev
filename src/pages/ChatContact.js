import React, {
	Alert,
	TouchableOpacity,
	View,
	Text,
	Image,
	ListView,
	RefreshControl,
	InteractionManager,
	StyleSheet,
} from 'react-native';
import asset from '../assets';
import { BackStep } from '../components/View';
import ChatMenu from '../components/ChatMenu';
import ChatFind from './ChatFind';
import Loading from './Loading';
import { load, reload, push } from '../utils/contact';
import { inviteFriend } from '../utils/chat';

class ChatContact extends React.Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({ rowHasChanged: (r1,r2)=>r1!==r2 });
		this.state = {
			ds,
			loaded: false,
			isRefreshing: false
		}
	}
	componentDidMount() {
		InteractionManager.runAfterInteractions( async () => {
			await load((contacts) => {
			  this.setState({
			  	loaded: true,
			  	ds: this.state.ds.cloneWithRows(contacts)
			  });
			});
		});
	}
	async _inviteFriend(uid) {
		let resp = await inviteFriend(uid);
		if(resp === false) {
			Alert.alert('添加成功,等待对方同意...');
		}
	}
	async _pushFriend(user) {
		await push(user);
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
						<TouchableOpacity onPress={this._inviteFriend.bind(this, contact.user.uid)} style={styles.addButton}>
							<Text style={styles.textButton}>添加好友</Text>
						</TouchableOpacity>
					 :
					 	<TouchableOpacity onPress={this._pushFriend.bind(this, contact)} style={styles.inviteButton}>
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
		  Alert.alert('更新通讯录成功!');
    })
	}
	_touch() {
		this.props.navigator.push({
			component: ChatFind,
			title: '搜索用户'
		})
	}
	render() {
		if(this.state.loaded) {
			return (
				<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>

					<View style={{ backgroundColor: '#FFFFFF' }}>
						<TouchableOpacity onPress={this._touch.bind(this)} style={styles.searchBar}>
							<Image source={asset.find} style={styles.find} />
							<Text style={styles.searchPlaceholder}>查找手机号</Text>
						</TouchableOpacity>
					</View>

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
		} else {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>

				<View style={{ backgroundColor: '#FFFFFF' }}>
					<TouchableOpacity onPress={this._touch.bind(this)} style={styles.searchBar}>
						<Image source={asset.find} style={styles.find} />
						<Text style={styles.searchPlaceholder}>查找手机号</Text>
					</TouchableOpacity>
				</View>

				<Loading />

			</View>
		);
		}
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
		height: 36,
		backgroundColor: '#EEEEEE',
		borderRadius: 5,
		margin: 10,
	},
	searchPlaceholder: {
		fontSize: 17,
		fontWeight: '400',
		color: '#999999'
	},
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
		backgroundColor: '#5DC01D',
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