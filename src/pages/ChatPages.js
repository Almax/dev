import React, {
	TouchableOpacity,
	View,
	Text,
	Image,
	TextInput,
	Dimensions,
	Platform,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import GiftedMessenger from 'react-native-gifted-messenger';
import { connect } from 'react-redux';
import styles from '../styles';
import { BackStep } from '../components/View';
import io from 'socket.io-client/socket.io';
import { getRoom, append, load } from '../utils/chat';

const navBarHeight = (Platform.OS === 'android' ? 56 : 64);
const statusBarHeight = (Platform.OS === 'android' ? 25 : 0);

class ChatPage extends React.Component {
	constructor(props) {
		super(props);
		const { user, object } = this.props;
		const room_id = getRoom(user.id, object.id);
		this.state = {
			messages: [],
			text: null,
			room_id
		}
		this.socket = io.connect('ws://182.254.159.146:3031', { jsonp: false });
		this.socket.emit('subscribe', room_id);
	}
	async componentDidMount() {
		const { user, object } = this.props;
		let messages = [];
		let records = await load(this.state.room_id);
		Object.keys(records).map((key) => {
			if(records[key].uid === user.uid) {
				let message = {
					text: records[key].messageText,
					name: '我',
					image: {uri: user.photo},
					position: 'right',
					date: records[key].date
				}
				messages.push(message);
			} else {
				let message = {
					text: records[key].messageText,
					name: object.name,
					image: {uri: object.photo},
					position: 'left',
					date: records[key].date
				}
				messages.push(message);
			}
		});
		this._GiftedMessenger.appendMessages(messages);
	}
	_refBind(ref) {
		this._GiftedMessenger = ref;
		this.socket.on('chat', this._receiveMessage.bind(this));
	}
	_receiveMessage(data) {
		const me = this.props.user;
		if(data.uid !== me.uid) {
			this._GiftedMessenger.appendMessage({
				...data,
				position: 'left'
			});
		}
	}
	async _appendMessage(messageObject, rowId) {
		const message = {
			uid: this.props.user.uid,
			name: this.props.user.name,
			text: messageObject.text,
			image: { uri: this.props.user.photo },
			position: 'right',
			date: new Date(),
		};
		this._GiftedMessenger.setMessageStatus('正在发送', rowId)

		var resp = await append(this.state.room_id, message.uid, message.text, message.date);
		if(resp.id) {
			this._GiftedMessenger.setMessageStatus('发送成功', rowId);
		} else {
			this._GiftedMessenger.setMessageStatus('发送错误', rowId);
		}
		this.socket.emit('chat', { message , room_id: this.state.room_id });
	}

	async _getInitialMessages() {
    return [

    ];
	}
	_onLoadEarlierMessages() {

	}
	render() {
		const { object } = this.props;
    return (
			<View style={[styles.container, { flexWrap: 'wrap', backgroundColor: '#EFEFEF'}]}>
				<BackStep navigator={this.props.navigator} title={`与${object.name}聊天`} />
	      <GiftedMessenger
	        ref={this._refBind.bind(this)}
	        autoFocus={false}
	        messages={[]}
	        handleSend={this._appendMessage.bind(this)}
	        onErrorButtonPress={() => true}
	        maxHeight={Dimensions.get('window').height - navBarHeight - statusBarHeight}
	        loadEarlierMessagesButton={true}

	        displayNames={true}
	        parseText={true}
	        onLoadEarlierMessages={this._onLoadEarlierMessages.bind(this)}
	        placeholder={'写下你要说的'}
	        
	        senderName={'我'}
	        senderImage={{ uri: this.props.user.photo }}
	        sendButtonText={'发送'}
	        maxHeight={Dimensions.get('window').height - 50}
	        style={{ flexWrap: 'wrap', paddingTop: 20, backgroundColor: '#EEEEEE' }}
	        styles={{
	          bubbleLeft: {
	          	flexWrap: 'wrap',
	            backgroundColor: '#FFFFFF',
	            marginRight: 70,
	            borderWidth: 1,
	            borderColor: '#EFEFEF',
	          },
	          bubbleRight: {
	          	flexWrap: 'wrap',
	            backgroundColor: '#49D25C',
	            marginLeft: 70,
	          },
	        }}
	      />
	    </View>
    );
		return (
			<View style={[styles.container, {backgroundColor: '#EFEFEF'}]}>
				<BackStep navigator={this.props.navigator} title={`与${object.name}聊天`} />
				<TextInput
					value={this.state.text}
					onChangeText={(text) => this.setState({ text })}
					style={{ height: 40, width: width, borderWidth: 1, borderColor: '#FFFFFF' }} />
				<TouchableOpacity onPress={this._appendMessage.bind(this)} style={{ padding: 10 }}><Text>发送</Text></TouchableOpacity>

				{Object.keys(this.state.messages).map((key) => {
					return (
						<View key={key} style={{ backgroundColor: '#FFFFFF', padding: 10, marginBottom: 1 }}>
							<Text>
								{this.state.messages[key].user === 0 ? "系统提示" :this.state.messages[key].user }
								:
								{this.state.messages[key].text}
							</Text>
						</View>
					);
				})}

			</View>
		);
	}
}


export default connect(
	state=>({ user: state.session }),
	dispatch=>({})
)(ChatPage);