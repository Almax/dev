import React, {
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native';

import constant from '../../utils/constant';

class Catalog extends React.Component {
	render() {

		const { id, onPress } = this.props;

		const row = constant[id];

		if(id !== null) {
			return (
				<TouchableOpacity onPress={onPress} style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Image source={row.icon} style={{ width: 30, height: 30 }} />
					<Text style={{ fontSize: 12, fontWeight: '400', color: '#666666' }}>{row.name}</Text>
				</TouchableOpacity>
			);
		}else {
			return (
				<View />
			)
		}
	}
}

export default Catalog;