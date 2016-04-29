import React, {
	ScrollView,
	View,
	Picker,
	TouchableOpacity,
	Text,
	Image,
	Alert,
	NativeModules,
	StyleSheet,
	DatePickerIOS,
	DatePickerAndroid,
	TimePickerAndroid,
	ProgressViewIOS,
	Platform,
} from 'react-native'
import moment from 'moment';
import { Caption, Subtitle, HorizontalView, BackStep } from '../components/View'
import {
	Selectable,
	FormRow,
	SoftInput,
	Label,
	PureButton,
	FormBlock,
	SubmitButton,
} from '../components/Form';
import asset from '../assets'
import { connect } from 'react-redux'
import { setMyMarry } from '../redux/modules/marry';
import TodoImport from './TodoImport';
import DateTimePicker from '../components/Widget/DateTimePicker';

class BasicMarry extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			marry_name: "",
			marry_date: new Date(),
			marry_city: "",
			showPicker: false,
		}
	}
	componentDidMount() {
		const { marry } = this.props;
		this.setState({
			marry_name: marry.marry_name,
			marry_date: marry.marry_date,
			marry_city: marry.marry_city,
		});
	}
	componentWillReceiveProps(nextProps) {
		const { marry } = nextProps;
		this.setState({
			marry_name: marry.marry_name,
			marry_date: marry.marry_date,
			marry_city: marry.marry_city,
		});
	}
	_onDateChange(date) {
		this.setState({
			marry_date: date
		})
	}

	viewScroll(offset) {
		this.scrollView.scrollTo({ x:0 ,y: offset, animated: true })
	}

	async changeMarry() {
		const marry = {
			id: this.props.marry.id,
			marry_name: this.state.marry_name,
			marry_city: this.state.marry_city,
			marry_date: this.state.marry_date,
		}
		await this.props.update(marry);
		Alert.alert('更新成功', '我的婚礼信息更新成功')
	}

	async _showPicker() {
		if(Platform.OS === 'android') {
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

		}else if(Platform.OS === 'ios') {
			this.setState({ showPicker: true });
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView
					ref={scrollView => this.scrollView = scrollView}
					contentContainerStyle={{ padding: 10, }}
					bounces={false}
					automaticallyAdjustContentInsets={false}>
					
					<Subtitle>我的婚礼信息</Subtitle>
					<View style={styles.form}>

						<FormRow>
							<Label>婚礼名</Label>
							<SoftInput
								scroll={this.viewScroll.bind(this)}
								value={this.state.marry_name}
								onChangeText={(marry_name) => this.setState({ marry_name })}
								placeholder={"我们的婚礼名称"} />
						</FormRow>

					
						<View style={{ backgroundColor: '#FFF7DD', marginVertical: 20, padding: 10, borderWidth: 1, borderColor: '#E0DBC0' }}>
							
							<Text style={{ lineHeight: 20, marginBottom: 10, fontSize: 14, color: '#666666' }}>
								注意: 邀请完另一半，并且选择完婚期之后，请点击下方同步任务来安排我的结婚筹备日程
							</Text>

							<PureButton onPress={() => this.props.navigator.push({ component: TodoImport })} size={"small"} style={{ backgroundColor: 'transparent' }}>生成婚礼任务</PureButton>
						</View>


						
						<SubmitButton onPress={this.changeMarry.bind(this)}>保存修改</SubmitButton>
						
					</View>
				</ScrollView>

				<DateTimePicker
						isDate={true}
						close={() => this.setState({ showPicker: false })}
						isVisible={this.state.showPicker} 
						onSelect={this._onDateChange.bind(this)} />

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EFEFEF',
	},
	form: {
		padding: 10,
		backgroundColor: '#FFFFFF',
		borderRadius: 5,
	}
})

export default connect(
	state => ({ marry: state.marry }),
	dispatch => ({
		update: (marry) => dispatch(setMyMarry(marry))
	})
)(BasicMarry)