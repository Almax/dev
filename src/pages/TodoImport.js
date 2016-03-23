import React, {
	View,
	Text,
	Image,
	DatePickerIOS
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import asset from '../assets';
import { FormRow, Selectable, SubmitButton } from '../components/Form';
import { BackStep, Subtitle } from '../components/View';
import { createTask } from '../utils/syncdata';
import mock from './mock.json';

class TodoImport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flag: false,
			date: new Date(),
			marry_date: new Date(),
			currentTask: {},
		}
	}
	componentDidMount() {
		
	}
	async _importMock() {
		const { task } = mock;
		let keys = Object.keys(task);
		for(key in keys) {
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
				currentTask: newTask
			});
		}
	}
	_onDateChange(date) {
		this.setState({
			marry_date: date
		})
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<BackStep navigator={this.props.navigator} title={"设置婚礼流程任务"} />
				
				<View style={{ flex: 1, margin: 10, padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF' }}>
					<Subtitle>设置结婚日期</Subtitle>
					<View style={{ alignItems: 'center', justifyContent: 'center' }}>
						<DatePickerIOS
						  date={this.state.marry_date}
						  minuteInterval={10}
						  mode={'date'}
						  onDateChange={this._onDateChange.bind(this)} />
					</View>
					<FormRow />

					<Subtitle>{this.state.currentTask.task_name}</Subtitle>
					{ this.state.flag ? null : <SubmitButton onPress={this._importMock.bind(this)}>创建任务流程</SubmitButton> }
					

				</View>
			</View>
		);
	}
}

export default connect(
	state=>({ todo: state.todo, marry: state.marry }),
	dispatch=>({
		create: (data) => dispatch(create(data))
	})
)(TodoImport);