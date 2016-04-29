import React, {
	Alert,
	TouchableOpacity,
	View,
	Text,
	Image,
	ListView,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { pass } from '../redux/modules/message';
import { loadInvitation, passInvitation } from '../redux/modules/invitation';
import { loadFriends } from '../redux/modules/friend';
class ChatMessage extends React.Component {
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1!==r2 });
		this.state = {
			dataSource
		}
	}
	componentDidMount() {
	  let { message, invitation} = this.props;
	  this.setState({
	  	dataSource: this.state.dataSource.cloneWithRows(message.concat(invitation))
	  });
	}
	componentWillReceiveProps(nextProps) {
		let { message, invitation} = nextProps;

		if(nextProps.invitation.length < this.props.invitation.length) {
			Alert.alert('已经添加为好友');
		}

	  this.setState({
	  	dataSource: this.state.dataSource.cloneWithRows(message.concat(invitation))
	  });
	}
	async _passRequest(user) {
		this.props.passInvitation(user);
		this.props.loadFriends();
	}
	_passPartner(id) {
		this.props.pass(id);
	}
	_renderRow(user) {
		if(user.toUser && user.fromUser) {
			const { fromUser, toUser } = user;
			if(this.props.user.id === fromUser.id) {
				return (
					<View style={innerStyles.wrapper}>
						<Image source={{ uri: toUser.photo }} style={innerStyles.avatar} />
						<View style={innerStyles.user}>
							<TouchableOpacity style={innerStyles.userBlock}>
								<View style={innerStyles.userinfo}>
									<Text style={innerStyles.name}>{toUser.name}</Text>
									<Text style={innerStyles.username}>{toUser.username}</Text>
								</View>
								<View style={{ height: 5 }} />
								<Text style={innerStyles.message}>我是{toUser.role}{toUser.name},我已经看到了你的邀请</Text>
							</TouchableOpacity>
							<View style={innerStyles.btnGroup}>								
								{ user.pass ? 
									<TouchableOpacity style={innerStyles.doneButton} activeOpacity={1}>
										<Text style={{ fontSize: 14, color: '#999999' }}>已通过</Text>
									</TouchableOpacity>
									: 
									<TouchableOpacity style={innerStyles.doneButton} activeOpacity={1}>
										<Text style={{ fontSize: 14, color: '#666666' }}>等待通过</Text>
									</TouchableOpacity>
								}
							</View>
						</View>
					</View>
				);
			}else if(this.props.user.id === toUser.id) {
				return (
					<View style={innerStyles.wrapper}>
						<Image source={{ uri: fromUser.photo }} style={innerStyles.avatar} />
						<View style={innerStyles.user}>
							<TouchableOpacity style={innerStyles.userBlock}>
								<View style={innerStyles.userinfo}>
									<Text style={innerStyles.name}>{fromUser.name}</Text>
									<Text style={innerStyles.username}>{fromUser.username}</Text>
								</View>
								<View style={{ height: 5 }} />
								<Text style={innerStyles.message}>我是{fromUser.role}{fromUser.name},你快加入到婚礼里来</Text>
							</TouchableOpacity>
							<View style={innerStyles.btnGroup}>
								{ user.pass ? 
									<TouchableOpacity style={innerStyles.doneButton} activeOpacity={1}>
										<Text style={{ fontSize: 14, color: '#999999' }}>已加入</Text>
									</TouchableOpacity>
									: 
									<TouchableOpacity style={innerStyles.passButton} onPress={this._passPartner.bind(this, user.id)}>
										<Text style={{ color: '#FFFFFF' }}>通过</Text>
									</TouchableOpacity>
								}
							</View>
						</View>

					</View>
				);
			}
		} else if(user.uid) {
			return (
				<View style={innerStyles.wrapper}>
					<Image source={{ uri: user.photo }} style={innerStyles.avatar} />
					<View style={innerStyles.user}>
						<TouchableOpacity style={{ flex: 1, height: 70, justifyContent: 'center' }}>
							<View style={innerStyles.userinfo}>
								<Text style={innerStyles.name}>{user.name}</Text>
								<Text style={innerStyles.username}>{user.username}</Text>
							</View>
							<View style={{ height: 5 }} />							
							<Text style={innerStyles.message}>我是{user.name},我想加你为好友,如果你认识我,就请通过</Text>
						</TouchableOpacity>
						<View style={innerStyles.btnGroup}>
							<TouchableOpacity onPress={this._passRequest.bind(this, user)} style={innerStyles.passButton}>
								<Text style={{ color: '#FFFFFF' }}>通过</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			);
		}
	}
	render() {
		if(this.state.dataSource.getRowCount() > 0) {
			return (
				<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
					<ListView
						dataSource={this.state.dataSource}
						renderRow={this._renderRow.bind(this)} />
				</View>
			);
		} else {
			return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
				<View style={{ backgroundColor: '#F4F4F4', padding: 10, borderRadius: 5 }}>
					<Text style={{ color: '#C0C0C0' }}>你还没有收到新消息~</Text>
				</View>
			</View>
			);
		}
	}
}
const innerStyles = StyleSheet.create({
	wrapper: { paddingVertical: 10, backgroundColor: '#FFFFFF', marginBottom: 1, alignItems: 'center', flexDirection: 'row' },
	user: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	userBlock: { flex: 1, height: 70, justifyContent: 'center' },
	avatar: { height: 40, width: 40, borderRadius: 20, marginHorizontal: 10 },
	doneButton: { backgroundColor: '#FFFFFF', padding: 10, borderRadius: 5 },
	passButton: { backgroundColor: '#5DC01D', padding: 10, borderRadius: 5 },
	name: { fontSize: 18, color: '#666666', fontWeight: '500' },
	messages: { fontSize: 16, color: '#999999', lineHeight: 22 },
	btnGroup: { backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', height: 70, width: 80 },
	username: { fontSize: 12, color: '#999999' },
	userinfo: { flexDirection: 'row', justifyContent: 'space-between' }
});
export default connect(
	state=>({ user: state.session, message: state.message, invitation: state.invitation }),
	dispatch=>({
		pass: (id) => dispatch(pass(id)),
		loadFriends: () => dispatch(loadFriends()),
		passInvitation: (friend) => dispatch(passInvitation(friend))
	})
)(ChatMessage);