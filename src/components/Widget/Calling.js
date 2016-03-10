import React, {
	Modal,
	Alert,
	Platform
} from 'react-native';
import Vibration from 'react-native-vibration';


function lightCall(title, message) {
		Vibration.vibrate();
		Alert.alert(title, message);
}

module.exports = lightCall