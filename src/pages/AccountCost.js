import React, {
	ScrollView,
	View,
	Text,
	Switch,
	TouchableOpacity,
	Alert,
	DatePickerAndroid,
	TimePickerAndroid,
	Platform,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from '../styles'
import { FormBlock, FormRow, Selectable, SubmitButton, Input, SoftInput, PureButton } from '../components/Form'
import { CatalogSection, Caption, Subtitle, HorizontalView, BackStep, SegmentedControl } from '../components/View';
import { test } from '../redux/modules/money';
import NumberPad from '../components/Form/NumberPad';
import TodoCatalog from './TodoCatalog';
import { load } from '../redux/modules/money';
import { createMoney, updateMoney } from '../utils/syncdata';
import DateTimePicker from '../components/Widget/DateTimePicker'

class Cost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPicker: false,
			success: false,
			pay_status: false,
			value: 0,
			catalog_id: 0,
			description: null,
			isVisible: true,
			expired_at: new Date(),
		}
	}
	componentDidMount() {
		this.scrollView.scrollResponderIsAnimating = (e) => {
			this.setState({
				isVisible: false,
				showPicker: false,
			});
		}
		if(this.props.data) {
			const data = this.props.data;
			this.setState({
				...data
			});
		}
	}
	_onScroll(y) {
		this.scrollView.scrollTo({ y });
		this.setState({ isVisible: false, showPicker: false });
	}
	_selectCatalog() {
		this.props.navigator.push({
			component: TodoCatalog,
			params: {
				update: (catalog) => {
					this.setState({
						catalog_id: catalog.id
					})
				}
			}
		})
	}
	_onSelectDate(date) {
		this.setState({
			expired_at: date
		});
	}
	_toggleNumberPad() {
		this.setState({ 
			isVisible: !this.state.isVisible
		});
	}
	async _submit() {
		const cost = {
			description: this.state.description,
			value: this.state.value,
			catalog_id: this.state.catalog_id,
			compute_sign: -1,
			pay_status: this.state.pay_status,
			expired_at: this.state.expired_at,
		};
		await createMoney(this.props.marry, cost);
		
		this.props.load(this.props.marry);

		this.setState({
			success: true
		});
	}
	async _update() {
		const cost = {
			id: this.state.id,
			description: this.state.description,
			value: this.state.value,
			catalog_id: this.state.catalog_id,
			compute_sign: -1,
			pay_status: this.state.pay_status,
			expired_at: this.state.expired_at,
		};
		await updateMoney(this.props.marry, cost);
		if(this.props.reload) {
			await this.props.reload();
		}
		Alert.alert('编辑完成', '已经成功编辑账本');
		this.props.navigator.pop();
	}
	_resetData() {
		this.setState({
			success: false,
			pay_status: false,
			value: 0,
			catalog_id: 0,
			description: null,
			showPicker: false,
			isVisible: false,
			expired_at: new Date(),
		});
	}
	async _showPicker() {
		if (Platform.OS === 'android') {
			try {
			  const {action, year, month, day} = await DatePickerAndroid.open({
			    date: this.state.expired_at ? new Date(this.state.expired_at) : new Date()
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
				  	this.setState({ expired_at: new Date(date) });
				  }else {
				  	const date = `${year}/${month}/${day}`;
				  	this.setState({ expired_at: new Date(date) });
				  }
			  }
			} catch ({code, message}) {
			  console.warn('Cannot open date picker', message);
			}
		} else if (Platform.OS === 'ios') {
			this.setState({
				showPicker: true
			});
		}
	}
	_back() {
		this.props.navigator.pop();
	}
	render() {
		const { money } = this.props;
		if(this.state.success === false) {
			return (
				<View style={{ flex: 1 }}>
					
					<ScrollView
						ref={scrollView => this.scrollView = scrollView }
						contentContainerStyle={innerStyles.container}>
						
						<View style={{ flexDirection: 'row', height: 50, padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
							<Subtitle>支出类别</Subtitle>
							<CatalogSection id={this.state.catalog_id} onPress={this._selectCatalog.bind(this)} />
						</View>

						<View style={{ height: 1, backgroundColor: '#EFEFEF' }} />

						<View style={{ flexDirection: 'row', height: 50, padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
							<Subtitle>金额</Subtitle>

							<TouchableOpacity onPress={this._toggleNumberPad.bind(this)} style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text style={{ color: '#E1759C', fontSize: 32, fontWeight: '500' }}>￥</Text>
								<Text style={{ color: '#E1759C', fontSize: 32, fontWeight: '500' }}>
									{ parseFloat(this.state.value).toFixed(2) }
								</Text>
							</TouchableOpacity>
						</View>

						<View style={{ height: 1, backgroundColor: '#EFEFEF' }} />
						
						<View style={{ flexDirection: 'row', height: 50, padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
							<Subtitle>已经支付?</Subtitle>
			        <Switch
			          onValueChange={(value) => this.setState({ pay_status: value })}
			          value={this.state.pay_status ? true : false} />
						</View>

						<View style={{ height: 1, backgroundColor: '#EFEFEF' }} />

						<View style={{ flexDirection: 'row', height: 50, padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
							<Subtitle>到期时间</Subtitle>
							{ 
								this.state.pay_status ? 
								null 
								:
								<Selectable onPress={this._showPicker.bind(this)}>{this.state.expired_at ? moment(this.state.expired_at).format('YYYY-MM-DD') : "选择日期"}</Selectable>

							}
						</View>

						<View style={{ height: 1, backgroundColor: '#EFEFEF' }} />

						<Subtitle>用途说明</Subtitle>
						<FormRow>
							<SoftInput 
								scroll={this._onScroll.bind(this)}
								value={this.state.description}
								onChangeText={(description) => this.setState({ description })}
								placeholder={"花费说明"} />
						</FormRow>

						<FormBlock>
							{ this.props.data ? 
								<PureButton onPress={this._update.bind(this)}>更新支出</PureButton>
								: 
								<PureButton onPress={this._submit.bind(this)}>添加支出</PureButton>
							}
						</FormBlock>

					</ScrollView>

					<NumberPad 
						onChange={(value) => this.setState({ value })}
						isVisible={this.state.isVisible} />

					<DateTimePicker 
						close={() => this.setState({ showPicker: false })}
						isVisible={this.state.showPicker} 
						onSelect={this._onSelectDate.bind(this)} />

				</View>
			);
		}else {
			if(this.props.data) {
	 			return (
					<View style={innerStyles.container}>
							<Subtitle>更新完成</Subtitle>
							<FormBlock>
								<PureButton onPress={this._back.bind(this)}>返回</PureButton>
							</FormBlock>
					</View>
				)
			}else {
	 			return (
					<View style={innerStyles.container}>
							<Subtitle>添加完成</Subtitle>
							<FormBlock>
								<PureButton onPress={this._resetData.bind(this)}>继续添加</PureButton>
							</FormBlock>
					</View>
				)
			}
		}

	}
}

const innerStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		borderRadius: 5,
		margin: 10,
		padding: 10,
	},
	segmented: { 
		marginVertical: 10, 
		paddingHorizontal: 10 
	},
})

export default connect(
	state=>({ marry: state.marry }),
	dispatch=>({
		load: (marry) => dispatch(load(marry))
	})
)(Cost);