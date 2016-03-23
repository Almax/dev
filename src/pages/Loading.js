import React, {
	View,
	Text,
	Platform,
	ActivityIndicatorIOS,
} from 'react-native';

class Loading extends React.Component {
	render() {
		if(Platform.OS === 'ios') {
			return (
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					
					<ActivityIndicatorIOS />

					<Text style={{ marginLeft: 5, color: '#666666' }}>处理中，请等待...</Text>

				</View>
			)
		}else {
			return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Text>处理中，请等待...</Text>
				</View>
			)
		}
	}
}

export default Loading;