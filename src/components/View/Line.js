import React, {
	View,
	PixelRatio
} from 'react-native'

export default class Line extends React.Component{
	render() {
		const { color } = this.props;

		return (
			<View style={{ marginVertical: 10, height: 1 / PixelRatio.get(), backgroundColor: color }} />
		)
	}
}