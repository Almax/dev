import React, {
	View
} from 'react-native'

export default class HorizontalView extends React.Component {
	render() {
		const { children } = this.props;

		return (
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
				{children}
			</View>
		)
	}
}