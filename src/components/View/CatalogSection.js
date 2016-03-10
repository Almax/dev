import React, {
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native';

import constant from '../../utils/constant';

class CatalogSection extends React.Component {
	render() {

		const { id, onPress } = this.props;

		const row = constant[id];

		if(row) {
			return (
				<TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0)', paddingHorizontal: 10, paddingVertical: 2 }}>
					<Image source={row.icon} style={{ width: 24, height: 24 }} />
					<View style={{ marginHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontSize: 16, fontWeight: '500', color: '#666666' }}>{row.name}</Text>
					</View>
				</TouchableOpacity>
			);
		}else {
			return (
				<TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0)', paddingHorizontal: 10, paddingVertical: 2 }}>
					<View style={{ backgroundColor: '#9DE5FC', width: 24, height: 24 }} />
					<View style={{ marginHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontSize: 16, fontWeight: '500', color: '#666666' }}>未分类</Text>
					</View>
				</TouchableOpacity>
			)
		}
	}
}

export default CatalogSection;