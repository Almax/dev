import React, {
	Component,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';

export default class HideButton extends Component {
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
		color: '#999999'
	},

	textSmall: {
		fontSize: 14,
		fontWeight: '500',
		color: '#999999'
	}

})