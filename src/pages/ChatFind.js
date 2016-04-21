import React, {
	TextInput,
	View,
	Text,
	Alert,
	TouchableOpacity,
	Image,
	ScrollView,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import asset from '../assets';
import { findUser } from '../utils/session';
import { inviteFriend } from '../utils/chat';
import { SubmitButton, FormBlock } from '../components/Form';
class ChatUser extends React.Component {
	async _invite() {
		let resp = await inviteFriend(this.props.user.uid);
		if(resp === false) {
			Alert.alert('添加成功,等待对方同意...');
		}
	}
	render() {
		const { user } = this.props;
		return (
		<View>
			<View style={{ padding: 10 }}>
				<Text style={{ fontSize: 16, color: '#999999' }}>查找结果 (1个用户)</Text>
			</View>

			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderWidth: 1, borderColor: '#EFEFEF' }}>
				
				<View style={{ alignItems: 'center' }}>
					<Image source={{ uri: user.photo }} style={{ height: 80, width: 80, borderRadius: 40 }} />
					<View style={{ marginVertical: 10 }}>
						<Text style={{ color: '#666666', fontSize: 16 }}>
							<Text style={{ color: '#999999', fontSize: 16 }}>账号</Text> 
							{ user.username }
						</Text>
						
						<Text style={{ color: '#666666', fontSize: 16 }}>
							<Text style={{ color: '#999999', fontSize: 16 }}>昵称</Text>
							{ user.nickname ? user.nickname : '匿名用户' }
						</Text>
						
						<Text style={{ color: '#666666', fontSize: 16 }}>
							<Text style={{ color: '#999999', fontSize: 16 }}>签名</Text>
							{ user.signature ? user.signature : '没有留下任何签名' }
						</Text>
					</View>
				</View>

				<View>
					<FormBlock>
						<SubmitButton size={'small'}>留言</SubmitButton>
					</FormBlock>
					<FormBlock>
						<SubmitButton 
							onPress={this._invite.bind(this)}
							size={'small'}>添加好友</SubmitButton>
					</FormBlock>
				</View>

			</View>
		</View>
		);
	};
}	

class ChatFind extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '15601923212',
			user: null,
		}
	}
	async componentDidMount() {

	}
	async _findUsername() {
		if(/\d{11}/.test(this.state.username)) {
			let user = await findUser(this.state.username);
			if(user.error) {
				Alert.alert(user.error);
			} else if(user.uid === this.props.user.uid) {
				Alert.alert('无法添加你自己为好友');
			} else {
				this.setState({
					user
				});
			}
		} else {
			Alert.alert('手机号码有误，请修改')
		}
	}
	render() {
		return (
			<ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#FFFFFF' }}>
				<View style={styles.searchBar}>
					<Image source={asset.find} style={styles.find} />
					<TextInput
						autoFocus={true}
						style={styles.input}
						value={this.state.username}
						onChangeText={(username) => this.setState({ username })}
						keyboardType={'numeric'}
						placeholderTextColor={'#999999'}
						placeholder={'查找手机号'}
						enablesReturnKeyAutomatically={true}
						underlineColorAndroid={'transparent'}
						numberOfLines={1} />

					<TouchableOpacity
						onPress={this._findUsername.bind(this)}
						style={styles.findButtonWrap}>
						<Text style={styles.findButton}>查找</Text>
					</TouchableOpacity>
				</View>



				{ this.state.user ? <ChatUser user={this.state.user} /> : null }

			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	searchBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		backgroundColor: '#EEEEEE',
		borderRadius: 5,
		marginHorizontal: 10,
		marginVertical: 10,
		paddingHorizontal: 10,
	},
	input: {
		flex: 1,
		fontSize: 14,
	},
	find: {
		marginRight: 5,
		width: 15,
		height: 15,
	},
	findButton: {
		color: '#666666',
		fontWeight: '500',
		fontSize: 16,
	},
	findButtonWrap: { 
		height: 35, 
		width: 40, 
		alignItems: 'center', 
		justifyContent: 'center' 
	}
});
export default connect(
	state=>({ user: state.session })
)(ChatFind);