import React, {
	View,
	Text,
	StyleSheet
} from 'react-native';

class Caption extends React.Component {
	render() {
		const { children } = this.props;
		color = this.props.color ? this.props.color : '#FFFFFF';
		return (
			<View style={styles.container}>
				<Text style={[styles.text, { color }]}>{children}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		
	},
	text: {
		fontSize: 24,
		fontWeight: '500'
	}
})

export default Caption