import React, {
	Component,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';

export default class Link extends Component {
	render() {
		const { children, onPress, side } = this.props;
		return (
			<TouchableOpacity onPress={onPress} style={styles.link}>
				<Text style={styles.text}>{children}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({

	link: {
		marginHorizontal: 20,
		backgroundColor: 'transparent',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},

	text: {
		fontSize: 16,
		color: '#999999'
	}
	
})