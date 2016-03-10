import React, {
	View,
	Text,
	VibrationIOS,
	PushNotificationIOS,
	Platform
} from 'react-native';

import Notification from 'react-native-system-notification';

import { FormRow, Input, Label } from '../components/Form';

import { Caption, BackStep } from '../components/View';

import Calling from '../components/Widget/Calling';

import BadgeAndroid from 'react-native-android-badge';


class EventTrigger extends React.Component {

	componentDidMount() {
		if(Platform.OS == 'ios') {
			PushNotificationIOS.requestPermissions();
		}
		//Notification.create({ subject: '你的任务到期了', message: '你的任务到期了，你去查看一下' });
		//Calling('你的任务到期了', '你的任务到期了，你去查看一下')

		// Notification.create({
		//   subject: 'Scheduled Notification',
		//   message: 'This notification will show on every Friday morning at 8:30 AM, starts at 2015/9/9 and end after 10 times.',
		//   sendAt: new Date(),
		//   repeatEvery: 'week',
		//   count: 1,
		//   sound: "default"
		// });

		// Notification.create({
		// 	number: 100,
		// 	sound: "default",
		// 	lights: "default"
		// })

	}
	_setBadge(number) {
		number = parseInt(number);
		console.warn('set to', number)
		if(Platform.OS == 'android') {
			BadgeAndroid.setBadge(number);
		}else {
			PushNotificationIOS.setApplicationIconBadgeNumber(number)
		}
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
				<BackStep navigator={this.props.navigator} />
				<FormRow>
					<Label>设置APP Badge</Label>
					<Input 
						onChangeText={(text) => this._setBadge(text)}
						placeholder={"输入Badge数值"} />
				</FormRow>

			</View>
		)
	}

}

export default EventTrigger