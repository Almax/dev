import React, {
	TouchableOpacity,
	Text,
	Image,
	StyleSheet
} from 'react-native';

class IconButton extends React.Component {
	render() {
		const { icon, children, onPress } = this.props;
		return (
			<TouchableOpacity onPress={onPress} style={styles.container}>
				<Image source={icon} style={{ height: 18, width: 18, marginHorizontal: 5 }} />
				<Text style={{ fontSize: 18, fontWeight: '500', color: '#5294DF' }}>{children}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: { 
		backgroundColor: '#FFFFFF', 
		height: 35, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center' 
	}
})

export default IconButton;