import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF'
	},

	centerLayout: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF'
	},

	wall: {
		backgroundColor: '#FFFFFF',
		marginTop: 20
	},

	bannerWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 200,
		backgroundColor: '#F06199'
	},
	bannerImage: {
		height: 100
	},

	textIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
		borderBottomColor: '#EEEEEE',
		borderBottomWidth: 1
	},
	textWrapper: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		width: 20,
		height: 20,
		borderRadius: 5,
		resizeMode: 'contain',
		margin: 5,
	},
	text: {
		fontSize: 18,
		color: '#999999',
	},
	helperText: {
		fontSize: 14,
		color: '#CCCCCC',
		marginRight: 10,
	}
	
})

const colors = [
	'#E2F5CC',
	'#E4F7FF',
	'#FDE9EE',
	'#FFCCCC',
	'#CCCCFF'
]

exports.colors = colors