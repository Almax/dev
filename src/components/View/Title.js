import React, {
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';

class Title extends React.Component {
	render() {

		const { children, onPress } = this.props;

		color = this.props.color ? this.props.color : '#666666';

		return (
			<TouchableOpacity onPress={onPress} style={styles.container}>
				<Text style={[styles.text, { color }]}>{children}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		marginBottom: 20,
	},
	text: {
		fontSize: 20,
		lineHeight: 26,
		fontWeight: '500'
	}
})

export default Title