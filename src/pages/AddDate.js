import React, {
	ScrollView,
	View,
	Text,
	DatePickerIOS,
} from 'react-native'
import moment from 'moment'

import { Caption, Subtitle, HorizontalView, BackStep } from '../components/View'
import { FormBlock, HideButton, SubmitButton } from '../components/Form'
import DateTimePicker from '../components/Widget/DateTimePicker'

class AddDate extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			date: new Date(),
			timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
			showPicker: true,
		}
	}
	
	onSelect(date) {
		this.setState({
			date,
		});
	}

	nextStep() {
		const { getResult } = this.props;
		getResult(this.state.date);
		this.props.navigator.pop();
	}

	render() {
		const { task, taskCate } = this.props;
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<BackStep navigator={this.props.navigator} />

				<ScrollView
					bounces={false}
					contentContainerStyle={{ flex: 1, padding: 10, backgroundColor: '#FFFFFF', margin: 10, borderRadius: 5 }}>
					<Subtitle>设定提醒的时间</Subtitle>
	        <DatePickerIOS
	          date={this.state.date}
	          mode="datetime"
	          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
	          onDateChange={this.onSelect.bind(this)} />

						{ 
							this.state.date ? 
								<Subtitle>{moment(this.state.date).format('YYYY MMMM Do, h:mm:ss a')}</Subtitle>
							:
								<Subtitle>选择一个提醒的日期吧</Subtitle>
						}
					
						<FormBlock>
							<SubmitButton onPress={this.nextStep.bind(this)}>选择日期</SubmitButton>
						</FormBlock>
				</ScrollView>
			</View>
		)
	}
}

export default AddDate