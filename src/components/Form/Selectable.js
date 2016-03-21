import React, {
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';

export default class Selectable extends React.Component {
	render() {
		const { onPress, children, indicator, style } = this.props;
		if(typeof children === 'string') {
			return (
				<TouchableOpacity onPress={onPress} style={styles.selectable}>
						<Text style={[styles.text, style]}>{children}</Text>
						{indicator}
				</TouchableOpacity>
			);
		}else {
			return (
				<TouchableOpacity onPress={onPress} style={styles.selectable}>
						{children}
						{indicator}
				</TouchableOpacity>
			);
		}
	}

}

const styles = StyleSheet.create({
	selectable: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	text: {
		fontSize: 16,
		color: '#9A9A9A'
	}

})