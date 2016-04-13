import React, {
	TouchableOpacity,
	View,
	Text,
	Image,
	ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { getInvitedMessages } from '../utils/chat';
class ChatMessage extends React.Component {
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1!==r2 });
		this.state = {
			dataSource
		}
	}
	async componentDidMount() {
	  let friend_requests = await getInvitedMessages();
	  this.setState({
	  	dataSource: this.state.dataSource.cloneWithRows(friend_requests)
	  });
	}
	_chatWith(user) {

	}
	_passRequest(user) {

	}
	_renderRow(user) {
		return (
			<View style={{ flexWrap: 'wrap', paddingVertical: 10, backgroundColor: '#FFFFFF', marginBottom: 1, flexDirection: 'row' }}>
				<Image source={{ uri: user.photo }} style={{ height: 50, width: 50, borderRadius: 25, margin: 10, }} />
					
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					
					<TouchableOpacity onPress={this._chatWith.bind(this, user)} style={{ flex: 1, height: 70, justifyContent: 'center' }}>
						<Text style={{ fontSize: 18, color: '#666666', fontWeight: '500' }}>{user.name}</Text>
						<View style={{ height: 10, }} />
						<Text style={{ fontSize: 16, color: '#999999', lineHeight: 18 }}>我是{user.role}{user.name},我想加你为好友,如果你认识我,就请通过</Text>
					</TouchableOpacity>

					<View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', height: 70, width: 80 }}>
						
						<TouchableOpacity onPress={this._passRequest.bind(this, user)} style={{ backgroundColor: '#5DC01D', padding: 10, borderRadius: 5 }}>
							<Text style={{ color: '#FFFFFF' }}>通过</Text>
						</TouchableOpacity>

					</View>
				</View>
			</View>
		);
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)} />
			</View>
		);
	}
}

export default connect(
	state=>({ user: state.session })
)(ChatMessage);