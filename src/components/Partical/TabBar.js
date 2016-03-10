import React, {
	TouchableOpacity,
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native';

export class TabItem extends React.Component {
	render() {
		
		const { 
			text, 
			icon, 
			iconH,
			onPress, 
			page,
			name
		} = this.props;


		if(page == name) {
			return (
				<TouchableOpacity onPress={onPress} style={styles.item} activeOpacity={1}>
					<Image resizeMode={"contain"} source={iconH} style={styles.icon} />
					<Text style={styles.textH}>{text}</Text>
				</TouchableOpacity>
			)
		}else {
			return (
				<TouchableOpacity onPress={onPress} style={styles.item} activeOpacity={1}>
					<Image resizeMode={"contain"} source={icon} style={styles.icon} />
					<Text style={styles.text}>{text}</Text>
				</TouchableOpacity>
			)
		}

	}
}

export default class TabBar extends React.Component {
	render() {
		const { children } = this.props;
		return (
			<View style={styles.container}>
				{ children }
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderTopColor: '#EEEEEE',
		borderTopWidth: 1
	},
	item: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		height: 26
	},
	text: {
		color: '#666666',
		fontSize: 14,
		fontWeight: '500'
	},
	textH: {
		color: '#3FAEEC',
		fontSize: 14,
		fontWeight: '500'
	}
})
