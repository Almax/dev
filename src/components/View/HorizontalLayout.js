import React, {
	View
} from 'react-native'

export default class HorizontalLayout extends React.Component {
	render() {
		const { children } = this.props;

		return (
			<View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
				{children}
			</View>
		)
	}
}