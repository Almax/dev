import React, {
	Component,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';

export default class Label extends Component {

	render() {
		const children = this.props.children

		return (
			<TouchableOpacity style={styles.label}>
				<Text style={styles.font}>{children}</Text>
			</TouchableOpacity>
		)
	}

}

const styles = StyleSheet.create({
	label: {
		width: 80,
	},
	font: {
		fontSize: 16,
		fontWeight: '400',
		color: '#999999'
	}
})