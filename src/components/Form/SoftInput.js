/* auto-toggle TextInput */

import React, {
	Component,
	Platform,
	TextInput,
	View,
	Text,
	DeviceEventEmitter,
	Dimensions,
	StyleSheet,
} from 'react-native';
const { height, width } = Dimensions.get('window');

export default class SoftInput extends Component {
	constructor(props) {
		super(props)
		this.state = {
		    keyboardSpace: 0,
		    offset: 0,
		};
		this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
		this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
	}
	updateKeyboardSpace(frames) {
		if (!frames.endCoordinates)
		    return ;
		this.setState({
		    keyboardSpace: frames.endCoordinates.height
		});
	}
  resetKeyboardSpace() {
    this.setState({
        keyboardSpace: 0
    });
  }
	componentDidMount() {
		this._listeners = [
		  DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace),
		  DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace),
		];
	}
	componentWillUnmount() {
		this._listeners.forEach(function(listener) {
		    listener.remove();
		});
	}
  /*
    this.props.scroll: Scroll method with scrollview : (offset) => { this.refs.scrollView.scrollTo(offset) }
  */
	onFocus() {
		const { scroll } = this.props;
		this.textInput.measure((ox, oy, width, height, px, py) => {
			const offset = py + 120 - this.state.keyboardSpace;
			if(offset > 0) {
				this.setState({ offset });
				scroll(offset);
			}
		});
	}
	onBlur() {
		const { scroll } = this.props;
		scroll(0);
	}

	render() {
		const { 
			keyboardType,
			onChangeText,
			placeholder,
			secureTextEntry,
			multiline,
			value,
			editable,
			style,
		} = this.props;

		if(Platform.OS == 'android') {
			return (
				<TextInput
					ref={textInput => this.textInput = textInput}
					style={[styles.inputAndroid, style]}
					editable={editable}
					value={value}
					secureTextEntry={secureTextEntry}
					multiline={multiline}
					keyboardType={keyboardType}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor={'#CCCCCC'}
					underlineColorAndroid={'transparent'} />
			)
		}else if(Platform.OS == 'ios') {
			return (
				<TextInput
					ref={textInput => this.textInput = textInput}
					onFocus={this.onFocus.bind(this)}
					onBlur={this.onBlur.bind(this)}
					style={[styles.inputIOS, style]}
					value={value}
					secureTextEntry={secureTextEntry}
					multiline={multiline}
					keyboardType={keyboardType}
					onChangeText={onChangeText}
					placeholder={placeholder}/>
			)
		}
	}
}

const styles = StyleSheet.create({
	inputAndroid: {
		flex: 1,
		height: 60,
		fontSize: 14,
		backgroundColor: '#FFFFFF',
	},
	inputIOS: {
		flex: 1,
		height: 60,
		fontSize: 14,
		fontWeight: '500',
		color: '#666666',
		backgroundColor: '#FFFFFF',
	}
})
