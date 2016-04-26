import React, {
	View,
	Text,
} from 'react-native';
import CityPicker from '../components/CityPicker';
class PickCity extends React.Component {
	_select(city) {
		this.props.onSelect(city);
		this.props.navigator.pop();
	}
	render() {
		return (
			<CityPicker onSelect={this._select.bind(this)} />
		);
	}
}
export default PickCity;