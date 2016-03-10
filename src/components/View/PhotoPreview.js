import React, {
	TouchableOpacity,
	Image,
	Text,
} from 'react-native';

export default class PhotoPreview extends React.Component {
	render() {
		const { headimg } = this.props;

		return (
			<TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginRight: 5, marginBottom: 5 }}>
				<Image source={headimg} style={{ width: 50, height: 50, borderRadius: 5 }} />
			</TouchableOpacity>
		)
	}
}