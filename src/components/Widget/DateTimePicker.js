import React, {
	View,
	Text,
	DatePickerIOS,
	TouchableOpacity,
	Platform
} from 'react-native';
import Animatable from 'react-native-animatable';

class DateTimePicker extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isVisible: false,
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
		}
	}

	onDateChange(date) {
		this.setState({
			date
		});
		this.props.onSelect(date)
	}
	async componentWillReceiveProps(nextProps) {
		if(this.state.isVisible === nextProps.isVisible) {
			return ;
		}else if(nextProps.isVisible === true) {
			this.setState({ isVisible: nextProps.isVisible });
			await this.view.bounceInUp(600);
		}else if(nextProps.isVisible === false) {
			this.setState({ isVisible: nextProps.isVisible });
			await this.view.fadeOutDown(200);
		}
	}
	_confirm() {
		this.setState({
			isVisible: false,
		})
	}
	_cancel() {
		this.setState({
			isVisible: false,
		})
	}
	render() {

		if(this.state.isVisible === false) {
			return (
				<View />
			)
		}

		if(Platform.OS === 'ios') {
			return (
				<Animatable.View
					ref={view => this.view = view } 
					style={{ 
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0, 
						backgroundColor: '#FFFFFF', 
						borderWidth: 1, 
						borderColor: '#EFEFEF'
					}}>
					
	        <DatePickerIOS
	          date={this.state.date}
	          mode="datetime"
	          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
	          onDateChange={this.onDateChange.bind(this)} />

	        <View style={{ borderTopWidth: 1, borderTopColor: '#EEEEEE', flexDirection: 'row', height: 40, alignItems: 'center' }}>
	        	<TouchableOpacity onPress={this._confirm.bind(this)} style={{ flex: 1, paddingVertical: 15, alignItems: 'center', justifyContent: 'center' }}>
	        		<Text>设定日期</Text>
	        	</TouchableOpacity>
	        	<View style={{ height: 40, width: 1, backgroundColor: '#EEEEEE' }}/>
	        	<TouchableOpacity onPress={this._cancel.bind(this)} style={{ flex: 1, paddingVertical: 15, alignItems: 'center', justifyContent: 'center' }}>
	        		<Text>取消</Text>
	        	</TouchableOpacity>
	        </View>

	      </Animatable.View>
			)
		}else if(Platform.OS === 'android') {
			return (
				<View>

				</View>
			)
		}

	}
}

export default DateTimePicker