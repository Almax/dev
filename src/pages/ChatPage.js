import React, {
	TouchableOpacity,
	View,
	Text,
	Image,
	TextInput,
	Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
const { height, width } = Dimensions.get('window');
import styles from '../styles';
import { BackStep } from '../components/View';
import io from 'socket.io-client/socket.io';
class ChatPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			text: null
		}
		this.socket = io("ws://192.168.199.152:3031", { jsonp: false });
		this.socket.on('text', this._receiveMessage.bind(this));
	}
	componentDidMount() {
	}
	_receiveMessage(data) {
		this.state.messages.push(data);
		this.setState({
			messages: this.state.messages
		})
	}
	_appendMessage(text) {
		const message = {
			user: this.props.user.name,
			text: this.state.text
		};
		this.socket.emit('text', message);
		this.setState({ text: null });
	}
	render() {
		const { object } = this.props;
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