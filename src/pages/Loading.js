import React, {
	View,
	Text,
} from 'react-native';

class Loading extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Loading...</Text>
			</View>
		)
	}
}

export default Loading;