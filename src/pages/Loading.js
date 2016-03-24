import React, {
	View,
	Text,
	Image,
	Platform,
	ActivityIndicatorIOS,
} from 'react-native';
import asset from '../assets';
class Loading extends React.Component {
	render() {
		if(Platform.OS === 'ios') {
			return (
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicatorIOS />
					<Text style={{ marginLeft: 5, color: '#666666' }}>请等待...</Text>
				</View>
			)
		}else {
			return (
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Image source={asset.loading} style={{ height: 20, width: 20 }} />
					<Text style={{ marginLeft: 5, color: '#666666' }}>请等待...</Text>
				</View>
			)
		}
	}
}

export default Loading;