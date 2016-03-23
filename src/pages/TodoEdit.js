import React, {
	ScrollView,
	View,
	Text,
	Alert,
	StyleSheet,
} from 'react-native';
import moment from 'moment';
import DatePickerIOS from '../components/CustomPicker';
import { connect } from 'react-redux';
import {
	Label,
	Selectable,
	FormRow,
	FormBlock,
	PureButton,
	Input,
	SoftInput,
} from '../components/Form';
import { 
  BackStep,
} from '../components/View';
import { update } from '../redux/modules/task';
import DateTimePicker from '../components/Widget/DateTimePicker'

class TodoEdit extends React.Component {
	constructor(props) {
		super(props);
		const { todo } = this.props;
		this.state = {
			...todo,
			showPicker: false,
			timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
		};
	}
	componentDidMount() {
	}
	async _save() {
		await this.props.updateTask({
			id: this.state.id,
			task_name: this.state.task_name,
			task_detail: this.state.task_detail,
			end_date: this.state.end_date,
		});

		Alert.alert("修改成功", "任务的内容已经修改完成", [
			{text: '知道了', onPress: () => this.props.navigator.pop()},
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
						<Selectable onPress={() => this.setState({ showPicker: true})}>
							{ todo.end_date ? moment(todo.end_date).format('YYYY年MM月DD日 a hh:mm:ss') : "选择日期"  }
						</Selectable>



					</FormRow>
					<FormBlock>
						<PureButton onPress={this._save.bind(this)}>保存</PureButton>
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