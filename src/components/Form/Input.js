import React, {
	Component,
	Platform,
	TextInput,
	View,
	Text,
	StyleSheet,
} from 'react-native';

export default class Input extends Component {

	render() {
		const { 
			keyboardType, 
			onChangeText, 
			placeholder, 
			secureTextEntry, 
			value,
			onFocus,
			onLayout,
			style,
		} = this.props;

		if(Platform.OS == 'android') {
			return (
				<TextInput
					style={[styles.inputAndroid, style]}
					value={value}
					secureTextEntry={secureTextEntry}
					keyboardType={keyboardType}
					onChangeText={onChangeText}
					onFocus={onFocus}
					onLayout={onLayout}
					placeholder={placeholder}
					placeholderTextColor={"#CCCCCC"}
					underlineColorAndroid={"transparent"}/>
			)
		}else if(Platform.OS == 'ios') {
			return (
				<TextInput
					style={[styles.inputIOS,style]}
					value={value}
					secureTextEntry={secureTextEntry}
					keyboardType={keyboardType}
					onFocus={onFocus}
					onLayout={onLayout}
					onChangeText={onChangeText}
					placeholder={placeholder}/>
			)
		}

	}

}

const styles = StyleSheet.create({
	inputAndroid: {
		flex: 1,
		height: 40,
		fontSize: 16,
		color: '#666666',
		backgroundColor: '#FFFFFF'
	},
	inputIOS: {
		flex: 1,
		height: 40,
		fontSize: 14,
		color: '#666666',
		backgroundColor: '#FFFFFF'
	}
})