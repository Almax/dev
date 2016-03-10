import React, {
	Component,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';

export default class SubmitButton extends Component {
	render() {
		const { onPress, children, size } = this.props;

		if(size == 'small') {
			return (
				<TouchableOpacity onPress={onPress} activeOpacity={0.6} style={styles.buttonSmall}>
					<Text style={styles.textSmall}>{children}</Text>
				</TouchableOpacity>
			)
		}else {
			return (
				<TouchableOpacity onPress={onPress} activeOpacity={0.6} style={styles.button}>
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
		backgroundColor: '#F06199',
		paddingHorizontal: 20,
		borderRadius: 5,
	},

	buttonSmall: {
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F06199',
		borderRadius: 5,
		paddingHorizontal: 10,
	},

	text: {
		fontSize: 18,
		fontWeight: '500',
		color: '#FFFFFF'
	},

	textSmall: {
		fontSize: 14,
		fontWeight: '500',
		color: '#FFFFFF'
	}

})