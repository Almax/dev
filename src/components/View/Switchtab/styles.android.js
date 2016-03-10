import React, {
	Dimensions,
	StyleSheet,
} from 'react-native';

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
	container: {
		flex: 1,
		height: height
	},
	tabContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
	},

	tabButtonWrapper: {
		width: 150,
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#FFFFFF',
		borderRadius: 3,
	},

	tabText: {
		fontSize: 14,
		color: '#FFFFFF',
	},
	tabButton: {
		flex: 1,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},

	tabTextActived: {
		fontSize: 14,
		color: '#F06199',
	},
	tabButtonActived: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},

	showContext: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#000000',
	},
	hideContext: {
		height: 0,
		borderWidth: 1,
		borderColor: '#336699',
	}
})