import React, {
	View,
	Text,
	StyleSheet
} from 'react-native';

class Detail extends React.Component {
	render() {

		const { children } = this.props;

		color = this.props.color ? this.props.color : '#52AB0A';

		return (
			<View style={styles.container}>
				<Text style={[styles.text, { color }]}>{children}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		marginBottom: 10,

	},
	text: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: '100'
	}
})

export default Detail