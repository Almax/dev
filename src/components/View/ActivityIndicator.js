import React, {
	ActivityIndicatorIOS,
	View,
	Text,
	Platform
} from 'react-native'

class ActivityIndicator extends React.Component {
	render() {

		const { children } = this.props;

		if(Platform.OS == 'ios') {
			return (
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicatorIOS
				  animating={true}
				  color={'#808080'}
				  size={'small'} />
				<Text> {children} </Text>
			</View>
			)
		}else {
			return (
				<View><Text>{children}</Text></View>
			)
		}
	}
}

export default ActivityIndicator