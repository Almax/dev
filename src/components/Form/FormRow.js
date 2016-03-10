import React, {
	Component,
	View,
	StyleSheet
} from 'react-native';

export default class FormRow extends Component {
	render() {
		const { children, style } = this.props;

		return (
			<View style={[styles.row, style]}>{children}</View>
		)
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: '#EEEEEE',
	}
});