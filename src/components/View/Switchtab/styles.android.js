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
		justifyContent: 'flex-end',
		height: 50,
		paddingBottom: 10,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},
	tabButtonWrapper: {
		width: 150,
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#F06199',
		borderRadius: 3,
	},
	tabText: {
		fontSize: 14,
		color: '#F06199',
	},
	tabButton: {
		flex: 1,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tabTextActived: {
		fontSize: 14,
		color: '#FFFFFF',
	},
	tabButtonActived: {
		flex: 1,
		backgroundColor: '#F06199',
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
	}
})