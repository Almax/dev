'use strict';

import React, {
  LinkingIOS,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  InteractionManager,
} from 'react-native';
import io from 'socket.io-client/socket.io';
import { connect } from 'react-redux';
import GiftedMessenger from 'react-native-gifted-messenger';
import Communications from 'react-native-communications';
import { getRoom, append, load } from '../utils/chat';
import { newChatSession } from '../redux/modules/chat';
import Loading from './Loading';
const MESSAGE_NUMBER = 5;
class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    const { user, object } = this.props;
    const room_id = getRoom(user.id, object.id);
    this.messages = [];
    this.state = {
      loaded: false,
      room_id,
    };

    this.socket = io.connect('ws://182.254.159.146:3031', { jsonp: false });
  }
  componentWillReceiveProps(nextProps) {
  }
  async _saveSession(user) {
     //this.props.newChatSession(user);
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions( async () => {
      const { user, object } = this.props;
      await this._saveSession(object);
      let messages = [];
      let records = await load(this.state.room_id);
      Object.keys(records).map((key) => {
        if(records[key].uid === user.uid) {
          let message = {
            text: records[key].messageText,
            name: '我',
            image: { uri: user.photo },
            position: 'right',
            date: records[key].date
          }
          messages.push(message);
        } else {
          let message = {
            text: records[key].messageText,
            name: object.name,
            image: { uri: object.photo },
            position: 'left',
            date: records[key].date
          }
          messages.push(message);
        }
      });
      this.setState({ loaded: true });
      
      //这个地方修改了room_id来识别消息渠道
      this.socket.emit('subscribe', this.state.room_id);
      this.socket.emit('subscribe', object.uid);
      this.socket.on('chat', this._receiveMessage.bind(this));

      try {
        this._GiftedMessenger.appendMessages(messages);
      } catch (e) {
        console.warn(JSON.stringify(e))
      }
    });    
  }
  getMessages() {
    return [
      {
        text: '开始聊天', 
        position: 'right',
        name: '我',
        image: { uri: this.props.user.photo }, 
        date: new Date(2014, 0, 1, 20, 0),
      }
    ];
  }
  _receiveMessage(data) {
    let _this = this;
    const me = this.props.user;
    if(data.uid !== me.uid) {
      if(_this._GiftedMessenger) {
        _this._GiftedMessenger.appendMessage({
          ...data,
          position: 'left'
        });
      }
    }
  }
  async handleSend(messageObject = {}, rowID = null) {
    const { object } = this.props;
    const message = {
      uid: this.props.user.uid,
      name: this.props.user.name,
      text: messageObject.text,
      image: { uri: this.props.user.photo },
      position: 'right',
      date: new Date(),
    };

    let resp = await append(this.state.room_id, message.uid, message.text, message.date);
    this.socket.emit('chat', { message , room_id: this.state.room_id });
    this.socket.emit('chat', { message , room_id: object.uid });
  }
  
  onLoadEarlierMessages(oldestMessage = {}, callback = () => {}) {
  }
  
  handleReceive(message = {}) {
    this._GiftedMessenger.appendMessage(message);
  }
  
  onErrorButtonPress(message = {}, rowID = null) {
    setTimeout(() => {
      // will set the message to a custom status 'Sent' (you can replace 'Sent' by what you want - it will be displayed under the row)
      this._GiftedMessenger.setMessageStatus('Sent', rowID);
      setTimeout(() => {
        // will set the message to a custom status 'Seen' (you can replace 'Seen' by what you want - it will be displayed under the row)
        this._GiftedMessenger.setMessageStatus('Seen', rowID);
        setTimeout(() => {
          // append an answer
          this.handleReceive({text: 'I saw your message', name: 'React-Native', image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}, position: 'left', date: new Date()});
        }, 500);
      }, 1000);
    }, 500);
  }
  
  // will be triggered when the Image of a row is touched
  onImagePress(rowData = {}, rowID = null) {
    // Your logic here
    // Eg: Navigate to the user profile
  }
  
  render() {
    if(this.state.loaded) {
      return (
        <GiftedMessenger
          ref={(c) => this._GiftedMessenger = c}
          styles={{
            bubbleRight: {
              marginLeft: 70,
              backgroundColor: '#007aff',
            },
          }}
          
          autoFocus={true}
          messages={this.getMessages()}
          handleSend={this.handleSend.bind(this)}
          onErrorButtonPress={this.onErrorButtonPress}
          maxHeight={Dimensions.get('window').height - navBarHeight - statusBarHeight}
          loadEarlierMessagesButton={true}
          loadEarlierMessagesButtonText={'之前的聊天记录'}
          onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}

          senderName={this.props.user.name}
          senderImage={{ uri: this.props.user.photo }}
          onImagePress={this.onImagePress}
          displayNames={true}
          
          parseText={true} // enable handlePhonePress and handleUrlPress
          handlePhonePress={this.handlePhonePress}
          handleUrlPress={this.handleUrlPress}
          handleEmailPress={this.handleEmailPress}
          
          inverted={true}
        />

      );
    } else {
      return (
        <Loading />
      );
    }
  }
  
  handleUrlPress(url) {
    if (Platform.OS !== 'android') {
      LinkingIOS.openURL(url);
    }
  }

  handlePhonePress(phone) {
    if (Platform.OS !== 'android') {
      var BUTTONS = [
        'Text message',
        'Call',
        'Cancel',
      ];
      var CANCEL_INDEX = 2;
    
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Communications.phonecall(phone, true);
            break;
          case 1:
            Communications.text(phone);
            break;
        }
      });
    }
  }
  
  handleEmailPress(email) {
    Communications.email(email, null, null, null, null);
  }
}

var navBarHeight = (Platform.OS === 'android' ? 56 : 64);
var statusBarHeight = (Platform.OS === 'android' ? 25 : 0);

export default connect(
  state=>({ user: state.session }),
  dispatch=>({
    newChatSession: (friend) => dispatch(newChatSession(friend))
  })
)(ChatPage);