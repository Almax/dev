import React, {
	View,
	Text,
	StyleSheet
} from 'react-native';

class PureText extends React.Component {
	render() {

		const { children } = this.props;

		color = this.props.color ? this.props.color : '#999999';

		return (
			<View style={styles.container}>
				<Text style={[styles.text, { color }]}>{children}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		fontSize: 12,
		fontWeight: '600'
	}
})

export default PureText