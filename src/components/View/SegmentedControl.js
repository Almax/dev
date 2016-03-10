import React, {
	View,
	Text,
	SegmentedControlIOS,
	Platform
} from 'react-native';

class SegmentedControl extends React.Component {
	render() {
		const { OS } = Platform;
		const {
			enabled,
			momentary,
			onChange,
			onValueChange,
			selectedIndex,
			tintColor,
			values,
		} = this.props;
		if(OS === 'ios') {
			return (
				<SegmentedControlIOS
					 enabled={enabled}
					 momentary={momentary}
					 onChange={onChange}
					 onValueChange={onValueChange}
					 selectedIndex={selectedIndex}
					 tintColor={tintColor}
					 values={values} />
			);
		}else if(OS === 'android') {
			return (
				<Text>Not supported yet!</Text>
			)
		}
	}
}

export default SegmentedControl;