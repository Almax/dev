import React, {
	View,
	Text,
	Image as ImageComponent,
} from 'react-native';
import asset from '../assets';
class Image extends React.Component {
	render() {
		let { style, source } = this.props;
		source = source.uri ? source : asset.userhead;
		return (
			<ImageComponent source={source} defaultSource={asset.userhead} style={style} />
		)
	}
}

export default Image;