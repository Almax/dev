import React, {
	View,
	Text,
	StyleSheet
} from 'react-native';

class Caption extends React.Component {
	render() {

		const { children } = this.props;

		color = this.props.color ? this.props.color : '#666666';

		return (
			<View style={styles.container}>
				<Text style={[styles.text, { color }]}>{children}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10
	},
	text: {
		fontSize: 16
	}
})

export default Caption