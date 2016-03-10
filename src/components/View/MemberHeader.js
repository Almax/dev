import React, {
	TouchableOpacity,
	Image,
	Text,
} from 'react-native';

export default class MemberHeader extends React.Component {
	render() {
		const { headimg, name } = this.props;

		return (
			<TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
				<Image source={headimg} style={{ width: 28, height: 28, borderRadius: 14 }} />
				<Text style={{ fontSize: 12, fontWeight: '500', color: '#999999' }}>{name}</Text>
			</TouchableOpacity>
		)
	}
}