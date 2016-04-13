import React, {
	TouchableOpacity,
	View,
	Text,
	Platform,
	StyleSheet
} from 'react-native';

class BackStep extends React.Component {
	render() {
		const { 
			children, 
			navigator,
			title,
			press,
			buttonTitle,
			buttonPress, 
		} = this.props;
		color = this.props.color ? this.props.color : '#FFFFFF';

		if(Platform.OS == 'ios') {
			var styles = iosStyles;
		}else if(Platform.OS == 'android') {
			var styles = androidStyles;
		}

		return (
			<View style={styles.container}>
				{
					navigator ? 
						<TouchableOpacity style={styles.button} onPress={ () => navigator.pop() }>
							<Text style={[styles.text, { color }]}>上一步</Text>
						</TouchableOpacity>
					:
						<TouchableOpacity style={styles.button}></TouchableOpacity> 
				}

				<TouchableOpacity style={styles.title} onPress={press}>
					<Text style={[styles.text, { color }]}>{ title }</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.buttonR} onPress={buttonPress}>
					<Text style={[styles.text, { color }]}>{buttonTitle}</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const iosStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#F06199',
		paddingTop: 15,
		height: 50,
		paddingHorizontal: 10,
	},
	title: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
	},
	button: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		height: 40,
	},
	buttonR: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
		height: 40,
	},
	text: {
		fontSize: 16,
		fontWeight: '500'
	}
})

const androidStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#F06199',
		paddingTop: 20,
		height: 60,
		paddingHorizontal: 10,
	},
	title: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
	},
	button: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		height: 40,
	},
	buttonR: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
		height: 40,
	},
	text: {
		fontSize: 16,
		fontWeight: '500'
	}
})

export default BackStep