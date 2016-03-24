import React, {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
} from 'react-native';

export default class Selectable extends React.Component {
	render() {
		const { onPress, children, indicator, style } = this.props;
		if(typeof children === 'string') {
			return (
			<View style={{ height: 40 }}>
				<TouchableOpacity onPress={onPress} style={styles.selectable}>
						<Text style={[styles.text, style]}>{children}</Text>
						{indicator}
				</TouchableOpacity>
			</View>
			);
		}else {
			return (
			<View style={{ height: 40 }}>
				<TouchableOpacity onPress={onPress} style={styles.selectable}>
						{children}
						{indicator}
				</TouchableOpacity>
			</View>
			);
		}
	}

}

const styles = StyleSheet.create({
	selectable: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	text: {
		fontSize: 16,
		color: '#666666'
	}

})