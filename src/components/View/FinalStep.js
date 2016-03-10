import React, {
	TouchableOpacity,
	View,
	Text,
	Platform,
	StyleSheet
} from 'react-native';

class FinalStep extends React.Component {
	render() {
		const { stepName, navigator } = this.props;
		color = this.props.color ? this.props.color : '#666666';

		if(Platform.OS == 'ios') {
			var style = iosStyles;
		}else if(Platform.OS == 'android') {
			var style = androidStyles;
		}

		return (
			<TouchableOpacity style={style.container}>
				<Text style={[style.text, { color }]}>{ stepName }</Text>
			</TouchableOpacity>
		)
	}
}

const iosStyles = StyleSheet.create({
	container: {
		marginTop: 20,
		alignItems: 'center',
		paddingVertical: 10,
		marginHorizontal: 10,
	},
	text: {
		color: '#666666',
		fontSize: 16,
		fontWeight: '500'
	}
})

const androidStyles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingVertical: 10,
		marginHorizontal: 10,
	},
	text: {
		color: '#666666',
		fontSize: 16,
		fontWeight: '500'
	}
})

export default FinalStep