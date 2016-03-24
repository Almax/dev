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
	ProgressViewIOS,
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
		Alert.alert('更新成功', '我的资料 更新成功')
	}

	render() {
		return (
			<View style={styles.container}>
				<BackStep title={"我的婚礼信息"} navigator={this.props.navigator} />
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

						<FormRow>
							<Label>婚礼城市</Label>
							<SoftInput
								scroll={this.viewScroll.bind(this)}
								value={this.state.marry_city}
								onChangeText={(marry_city) => this.setState({ marry_city })}
								placeholder={"婚礼举办的城市"} />
						</FormRow>

						<FormRow>
							<Label>婚礼日期</Label>
							<Selectable
								onPress={ () => this.setState({ showPicker: true }) } >
								{ this.state.marry_date ? 
										moment(this.state.marry_date).format('YYYY-MM-DD')
										: 
										"选择" 
								}
							</Selectable>
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