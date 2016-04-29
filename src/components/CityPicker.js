import React, {
	ListView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { SubmitButton } from './Form';
import cityInfo from '../utils/city';
class CityPicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			province: new ListView.DataSource({ rowHasChanged: (r1,r2) => r1!==r2 }),
			city: new ListView.DataSource({ rowHasChanged: (r1,r2) => r1!==r2 }),
			district: new ListView.DataSource({ rowHasChanged: (r1,r2) => r1!==r2 }),
			selectP: null,
			selectC: null,
			selectD: null,
			p: '',
			c: '',
			d: '',
		}
	}
	componentWillMount() {
		let province = [];
		for(key in cityInfo) {
			province[key] = cityInfo[key].name;
		}
		this.setState({
			province: this.state.province.cloneWithRows(province)
		});
	}
	_selectCity(rowId) {
		let city = [];
		const c = cityInfo[rowId].children;
		for(key in c) {
			city[key] = c[key].name;
		}
		this.setState({
			p: cityInfo[rowId].name,
			c: '',
			d: '',
			selectP: rowId,
			city: this.state.city.cloneWithRows(city),
			district: this.state.district.cloneWithRows([])
		})
	}
	_selectDistrict(rowId) {
		let province = cityInfo[this.state.selectP];
		let city = province.children[rowId];
		if(city.children) {
			this.setState({
				c: city.name,
				d: '',
				district: this.state.district.cloneWithRows(city.children)
			});
		} else {
			this.setState({
				c: city.name,
				d: '',
				district: this.state.district.cloneWithRows([])
			});
		}
	}
	_select(district) {
		this.setState({
			d: district
		})
	}
	renderProvince(data, sectionId, rowId) {
		return (
			<TouchableOpacity onPress={this._selectCity.bind(this, rowId)} style={{ backgroundColor: '#FFFFFF', padding: 15, marginBottom: 1 }}>
				<Text>{data}</Text>
			</TouchableOpacity>
		);
	}
	renderCity(data, sectionId, rowId) {
		return (
			<TouchableOpacity onPress={this._selectDistrict.bind(this, rowId)} style={{ backgroundColor: '#FFFFFF', padding: 15, marginBottom: 1 }}>
				<Text>{data}</Text>
			</TouchableOpacity>
		);
	}
	renderDistrict(data, sectionId, rowId) {
		if(data) {
			return (
				<TouchableOpacity onPress={this._select.bind(this, data.name)} style={{ backgroundColor: '#FFFFFF', padding: 15, marginBottom: 1 }}>
					<Text>{data.name}</Text>
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	}
	_pickData() {
		const { onSelect } = this.props;
		onSelect(`${this.state.p} ${this.state.c} ${this.state.d}`);
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>

				<View style={styles.selection}>
					<Text>{ this.state.p } { this.state.c } { this.state.d }</Text>
					<SubmitButton size={'small'} onPress={this._pickData.bind(this)}>选择</SubmitButton>
				</View>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<ListView
						contentContainerStyle={styles.province}
					  dataSource={this.state.province}
					  renderRow={this.renderProvince.bind(this)} />

					<ListView
						contentContainerStyle={styles.city}
					  dataSource={this.state.city}
					  renderRow={this.renderCity.bind(this)} />

					<ListView
						contentContainerStyle={styles.district}
					  dataSource={this.state.district}
					  renderRow={this.renderDistrict.bind(this)} />
				</View>

			</View>
		);
	}
}
const styles = StyleSheet.create({
	selection: {
		backgroundColor: '#FFFFFF', 
		flexDirection: 'row', 
		paddingHorizontal: 20, 
		height: 50, 
		alignItems: 'center', 
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: '#EFEFEF',
	},
	province: {
		borderRightWidth: 1,
		borderRightColor: '#EFEFEF',
	},
	city: {
		borderRightWidth: 1,
		borderRightColor: '#EFEFEF',
	},
	district: {

	},
});
export default CityPicker;