const IMPORT_LIST = [
	5,6,7,8,9,12,14,19,21,24,30,31,34,44,50,52,56,57,65,74,80,86,87,91
];

import React, {
	View,
	Text,
	Image,
	DatePickerIOS,
	DatePickerAndroid,
	TimePickerAndroid,
	Platform,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import asset from '../assets';
import { FormRow, Selectable, SubmitButton } from '../components/Form';
import { BackStep, Subtitle } from '../components/View';
import { createTask } from '../utils/syncdata';
import { init } from '../redux/modules/task';
import FindPartner from './FindPartner';
import mock from './mock.json';
import Loading from './Loading';
class TodoImport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flag: false,
			date: new Date(),
			marry_date: new Date(),
			currentTask: null,
		}
	}
	componentDidMount() {
		if(typeof this.props.marry !== 'object') {
			this.props.navigator.push({ component: FindPartner })
		}
	}
	async _importMock() {
		this.setState({ flag: true });
		const { task } = mock;
		let keys = IMPORT_LIST.reverse();
		for(id in keys) {
			var key = keys[id];
			const newTask = {
				done: false,
				task_name: task[key].task,
				task_detail: task[key].taskDesc,
				catalog_id: 0,
				end_date: moment(this.state.marry_date).subtract(task[key].period.full, 'day').format("YYYY-MM-DD"),
				users: this.props.marry.users,
			};
			await createTask(newTask);
			this.setState({
				currentTask: newTask.task_name
			});
		}

		this.setState({ 
			flag: false,
			currentTask: "创建完成"
		});

		this.props.init();
	}
	_onDateChange(date) {
		this.setState({
			marry_date: date
		})
	}
	async _pickDate() {
		try {
		  const {action, year, month, day} = await DatePickerAndroid.open({
		    date: this.state.marry_date ? new Date(this.state.marry_date) : new Date()
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
			  	this.setState({ marry_date: new Date(date) });
			  }else {
			  	const date = `${year}/${month}/${day}`;
			  	this.setState({ marry_date: new Date(date) });
			  }
		  }
		} catch ({code, message}) {
		  console.warn('Cannot open date picker', message);
		}
	}
	_renderPicker() {
		if (Platform.OS === 'android') {
			return (
				<Selectable onPress={this._pickDate.bind(this)}>
					{ moment(this.state.marry_date).format("YYYY-MM-DD") }
				</Selectable>
			);
		} else if (Platform.OS === 'ios') {
			return (
				<DatePickerIOS
				  date={this.state.marry_date}
				  minuteInterval={10}
				  mode={'date'}
				  onDateChange={this._onDateChange.bind(this)} />
			);
		}
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<BackStep navigator={this.props.navigator} title={"设置婚礼流程任务"} />
				
				<View style={{ flex: 1, margin: 10, padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF' }}>
					<Subtitle>设置结婚日期</Subtitle>
					
					<View style={{ alignItems: 'center', justifyContent: 'center' }}>
						
					{ this._renderPicker() }
					
					</View>

					<FormRow />

					<View style={{ height: 50, padding: 10 }}>
						<Subtitle>{this.state.currentTask}</Subtitle>
					</View>

					{ this.state.flag ? <Loading /> : <SubmitButton onPress={this._importMock.bind(this)}>创建任务流程</SubmitButton> }

				</View>
			</View>
		);
	}
}

export default connect(
	state=>({ todo: state.todo, marry: state.marry }),
	dispatch=>({
		create: (data) => dispatch(create(data)),
		init: () => dispatch(init()),
	})
)(TodoImport);