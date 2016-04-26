import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EFEFEF'
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
		backgroundColor: '#FFFFFF',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
		marginBottom: 1,
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
		fontSize: 16,
		color: '#999999',
	},
	helperText: {
		fontSize: 14,
		color: '#CCCCCC',
		marginRight: 10,
	},
	input: {
		height: 40
	},
	yellow_box: {
		backgroundColor: '#FFF7DD', 
		padding: 2, 
		borderBottomWidth: 1, 
		borderBottomColor: '#E0DBC0',
	},
	smallText: {
		fontSize: 14,
		color: '#666666'
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