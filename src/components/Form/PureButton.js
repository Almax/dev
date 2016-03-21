import React, {
	Component,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';

export default class PureButton extends Component {
	render() {
		const { onPress, children, size, style } = this.props;

		if(size == 'small') {
			return (
				<TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[styles.buttonSmall, style]}>
					<Text style={styles.textSmall}>{children}</Text>
				</TouchableOpacity>
			)
		}else {
			return (
				<TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[styles.button, style]}>
					<Text style={styles.text}>{children}</Text>
				</TouchableOpacity>
			)
		}

	}
}

const styles = StyleSheet.create({
	
	button: {
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 20,
	},

	buttonSmall: {
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 20
	},

	text: {
		fontSize: 18,
		fontWeight: '500',
		color: '#0C84FB'
	},

	textSmall: {
		fontSize: 14,
		fontWeight: '500',
		color: '#0C84FB'
	}

})