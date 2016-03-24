import React, {
	ScrollView,
	View,
	Text,
	Alert,
	DatePickerAndroid,
	TimePickerAndroid,
	Platform,
	StyleSheet,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { Label, Selectable, FormRow, FormBlock, PureButton, Input, SoftInput } from '../components/Form';
import { BackStep } from '../components/View';
import { update } from '../redux/modules/task';
import DateTimePicker from '../components/Widget/DateTimePicker';
import Loading from './Loading';

class TodoEdit extends React.Component {
	constructor(props) {
		super(props);
		const { todo } = this.props;
		this.state = {
			isEditing: false,
			...todo,
			showPicker: false,
			timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
		};
	}
	componentDidMount() {
	}
	async _save() {
		this.setState({ isEditing: true });
		await this.props.updateTask({
			id: this.state.id,
			task_name: this.state.task_name,
			task_detail: this.state.task_detail,
			end_date: this.state.end_date,
		});

		Alert.alert("修改成功", "任务的内容已经修改完成", [
			{text: '知道了', onPress: () => this.setState({ isEditing: false }) },
		]);
	}
	_scroll(offset) {
		this.scrollView.scrollTo({
			y: offset
		})
	}
	_onSelect(date) {
		this.setState({
			end_date: date
		})
	}
	async _showPicker() {
		if(Platform.OS === 'android') {
			try {
			  const {action, year, month, day} = await DatePickerAndroid.open({
			    date: this.state.end_date ? new Date(this.state.end_date) : new Date()
			  });
			  if (action !== DatePickerAndroid.dismissedAction) {
				  const {action, hour, minute} = await TimePickerAndroid.open({
				    hour: parseInt(moment().format("hh")),
				    minute: parseInt(moment().format("mm")),
				    is24Hour: false,
				  });
			  	if (month < 10) { month = `0${month + 1}`; } else { month = `${month + 1}`; }
			  	if (day < 10) { day = `0${day}`; }

				  if (action !== DatePickerAndroid.dismissedAction) {
				  	if (hour < 10) { hour = `0${hour}`; }
				  	if (minute < 10) { hour = `0${hour}`; }
				  	const date = `${year}/${month}/${day} ${hour}:${minute}:00`;
				  	this.setState({ end_date: new Date(date) });
				  }else {
				  	const date = `${year}/${month}/${day}`;
				  	this.setState({ end_date: new Date(date) });
				  }
			  }
			} catch ({code, message}) {
			  console.warn('Cannot open date picker', message);
			}
		}else if(Platform.OS === 'ios') {
			this.setState({ showPicker: true});
		}
	}
	render() {
		const todo = this.state;
		return (
			<View style={[styles.container, { backgroundColor: '#EFEFEF' }]}>
				<BackStep navigator={this.props.navigator} title={"任务编辑"} />

				<ScrollView 
					contentContainerStyle={{ backgroundColor: '#FFFFFF', margin: 10, padding: 10, borderRadius: 5 }}
					ref={scrollView => this.scrollView = scrollView}>
					<FormRow>
						<Input
							value={todo.task_name}
							onChangeText={(text) => this.setState({ task_name: text }) }
							placeholder={"任务说明"} />
					</FormRow>

					<FormRow>
						<SoftInput
							style={{ height: 200 }}
							scroll={this._scroll.bind(this)}
							value={todo.task_detail}
							multiline={true}
							onChangeText={(text) => this.setState({ task_detail: text })}
							placeholder={"关于这个任务里详细的要求"} />
					</FormRow>

					
					<FormRow style={{ marginVertical: 10 }}>
						<Label>截止日期</Label>
						<Selectable onPress={this._showPicker.bind(this)}>
							{ todo.end_date ? moment(todo.end_date).format('YYYY年MM月DD日 a hh:mm:ss') : "选择日期"  }
						</Selectable>



					</FormRow>

					<FormBlock>
						{ 
							this.state.isEditing ?
							<Loading />
							:
							<PureButton onPress={this._save.bind(this)}>保存</PureButton>
						}
					</FormBlock>

				</ScrollView>
					

				<DateTimePicker 
						close={() => this.setState({ showPicker: false })}
						isVisible={this.state.showPicker} 
						onSelect={this._onSelect.bind(this)} />

			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	}
})

export default connect(
	state=>({}),
	dispatch=>({
		updateTask: (data) => dispatch(update(data))
	})
)(TodoEdit);