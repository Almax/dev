import React, { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

  list: {
  	backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 3
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
	container: {
		flex: 1,
		marginTop: 20,
		backgroundColor: '#FFFFFF',
		borderTopColor: '#EEEEEE',
		borderTopWidth: 1,
		borderBottomColor: '#EEEEEE',
		borderBottomWidth: 1
	},
	month: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	week: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	monthArrow: {
		height: 16,
		width: 6,
		padding: 5,
	},
	monthButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
	},
	monthText: {
		fontSize: 16,
		color: '#999999',
		fontWeight: '600'
	},
	calendarTitle: {
		fontSize: 16,
		fontWeight: '600',
	}
})

module.exports = styles;