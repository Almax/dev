import React, {
	View,
	Image,
	StyleSheet
} from 'react-native';

class Logo extends React.Component {
	render() {
		const { source } = this.props;
		return (
			<View style={styles.container}><Image style={styles.logo} source={source} /></View>)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		width: 120,
		height: 120
	}
})

export default Logo;