import React, {
	Component,
	View,
	StyleSheet
} from 'react-native';

export default class FormBlock extends Component {
	render() {
		const { children } = this.props;
		return (
			<View style={styles.row}>{children}</View>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'space-around',
	}
})