import React, {
	Platform,
	PushNotificationIOS,
} from 'react-native';
import moment from 'moment';
import Notification from 'react-native-system-notification';
import { connect } from 'react-redux';
import io from 'socket.io-client/socket.io';
import { loadRemoteMsg } from '../redux/modules/chat';
class Subscriber extends React.Component {
	componentDidMount() {
		// console.warn('PushNotificationIOS');
		// PushNotificationIOS.requestPermissions();
		// PushNotificationIOS.addEventListener('register', function(token){
		//  console.warn('You are registered and the device token is: ',token)
		// });
		// PushNotificationIOS.addEventListener('notification', function(notification){
		//  console.warn('You have received a new notification!', notification);
		// });

		this.socket = io.connect('ws://182.254.159.146:3031', { jsonp: false });
		this.socket.emit('subscribe', this.props.user.uid)
		this.socket.on('chat', (msg) => {
			this.props.loadRemoteMsg(msg);
      
      if(Platform.OS === 'ios') {
        PushNotificationIOS.requestPermissions();
        PushNotificationIOS.scheduleLocalNotification({
          fireDate: moment().toISOString(),
          alertBody: `一条来自${msg.name}的新消息: ${msg.text}`,
          soundName: 'default'
        })
      }else if(Platform.OS === 'android') {
				Notification.create({
				  subject: `新消息`,
				  message: `一条来自${msg.name}的新消息: ${msg.text}`,
				  sendAt: new Date()
				});
      }

		});
	}
	render() {
		return null;
	}
}

export default connect(
	state=>({ user: state.session }),
	dispatch=>({
		loadRemoteMsg: (msg) => dispatch(loadRemoteMsg(msg))
	})
)(Subscriber);