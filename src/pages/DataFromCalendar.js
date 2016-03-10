import React, {
	View,
} from 'react-native'

import Calendar from '../components/Widget/Calendar';

class DataFromCalendar extends React.Component {
	render() {
		const { set } = this.props;

		return (
			<Calendar onSelect={(date) => { set(date); this.props.navigator.pop()} } />
		)
	}
}


export default DataFromCalendar