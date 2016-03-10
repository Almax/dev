import React, {
	View
} from 'react-native'

export default class ButtonGroup extends React.Component {
	render() {
		const { children } = this.props;

		return (
			<View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', alignItems: 'center' }}>
				{children}
			</View>
		)
	}
}