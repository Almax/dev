import React, {
	ScrollView,
	View,
	Text,
	Image,
  Alert,
	TextInput,
	TouchableOpacity,
	Platform,
	PushNotificationIOS,
	DatePickerAndroid,
	TimePickerAndroid,
  Dimensions,
	StyleSheet,
} from 'react-native';
const { width } = Dimensions.get('window');
import asset from '../assets';
import styles from '../styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { FormBlock, FormRow, Selectable, SubmitButton, Input, SoftInput, PureButton } from '../components/Form';
import { CatalogSection, Caption, Subtitle, HorizontalView, BackStep } from '../components/View';
import HorizontalList from '../components/View/HorizontalList';
import AddAdvise from './AddAdvise';
import AddDate from './AddDate';
import AddPhoto from './AddPhoto';
import AddCategories from './AddCategories';
import data from './mock.json';
import DateTimePicker from '../components/Widget/DateTimePicker';
import { create, load } from '../redux/modules/task';
import Notification from 'react-native-system-notification';

class TodoNew extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			done: false,
			task_name: null,
			catalog_id: 0,
			end_date: new Date(),
			showPicker: false,
		};
	}
	viewScroll(offset) {
		this.scrollView.scrollTo({ x:0 ,y: offset, animated: true })
	}
	setValue(key, value) {
		this.setState({key: value});
	}
	_onSelect(date) {
		this.setState({end_date: date});
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
		} else if (Platform.OS === 'ios') {
			this.setState({
				showPicker: true
			})
		}
	}
	nextStep() {
    if(this.state.task_name && this.state.end_date && this.state.catalog_id !== null) {
      this.props.create({
        task_name: this.state.task_name,
        status: false,
        end_date: this.state.end_date,
        catalog_id: this.state.catalog_id,
        users: this.props.marry.users
      });
      this.setState({
        done: true
      });
      
      this.props.load();
      
      if(Platform.OS === 'ios') {
        PushNotificationIOS.requestPermissions();
        PushNotificationIOS.scheduleLocalNotification({
          fireDate: moment(this.state.end_date).toISOString(),
          alertBody: "婚格提醒: "+this.state.task_name,
          soundName: 'default'
        })
      }else if(Platform.OS === 'android') {
				Notification.create({
				  subject: `我的提醒`,
				  message: `任务: ${this.state.task_name}`,
				  sendAt: new Date(moment(this.state.end_date).format('YYYY/MM/DD hh:mm:ss'))
				});
      }
    }else {
      Alert.alert("添加失败","任务信息还没有完善");
    }
	}

	render() {
		const { navigator } = this.props;
		if(this.state.done === true) {
			return (
				<View	style={{
					flex: 1,
					backgroundColor: '#FFFFFF',
					borderRadius: 5,
					margin: 10,
					padding: 10,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
					<Subtitle>任务分配好了</Subtitle>
					<FormBlock>
						<PureButton onPress={() => navigator.popToTop()} >返回</PureButton>
					</FormBlock>
				</View>
			)
		}else {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<ScrollView
					bounces={false}
					ref={scrollView => this.scrollView = scrollView}
					contentContainerStyle={[styles.container, {margin: 10, padding: 10, backgroundColor: '#FFFFFF', borderRadius: 5}]}>
					
					<Subtitle>描述</Subtitle>         
          <Selectable
            style={{ width: width-50, color: '#5DC01D' }}
            onPress={() => this.props.navigator.push({ 
              component: AddAdvise,
              params: {
                getResult: (value) => {
                  this.setState({ task_name: value });
                },
              },
            })}
            indicator={<Image source={asset.arrowRight}  />}>
            
            { this.state.task_name ? this.state.task_name : "输入一个任务名称" }
              
          </Selectable>
					
          <FormRow />

					<Subtitle>任务类别</Subtitle>
          <Selectable
            onPress={() => this.props.navigator.push({ 
              component: AddCategories,
              params: {
                getResult: (value) => {
                  this.setState({ catalog_id: value.id });
                },
              },
            })}
            indicator={<Image source={asset.arrowRight}  />}>

            { this.state.catalog_id !== null ? <CatalogSection id={this.state.catalog_id} /> : "选择"  }

            </Selectable>

					<FormRow />

					<Subtitle>提醒日期</Subtitle>
					<Selectable
						onPress={this._showPicker.bind(this)}
						indicator={<Image source={asset.arrowRight}  />}>
						{ this.state.end_date ? 
								<Text style={innerStyles.date}>
									{moment(this.state.end_date).format("YYYY年MM月DD日 a hh:mm:ss")}
								</Text> 
								: 
								"选择" 
						}
						</Selectable>
					<FormRow />


					<View style={{ height: 20 }} />
					<SubmitButton onPress={this.nextStep.bind(this)}>添加任务</SubmitButton>

				</ScrollView>

				<DateTimePicker 
						close={() => this.setState({ showPicker: false })}
						isVisible={this.state.showPicker} 
						onSelect={this._onSelect.bind(this)} />

			</View>
			);
		}
	}
}


const innerStyles = StyleSheet.create({
	textInput: {
		color: '#666666',
		fontSize: 14,
		fontWeight: '600',
		backgroundColor: '#FFFFFF',
		height: 100,
	},
	date: {
		fontSize: 16, 
		fontWeight: '500', 
		color: '#666666',
	},
})

export default connect(
	state=>({
		marry: state.marry,
	}),
	dispatch=>({
		create: (data) => dispatch(create(data)),
		load: () => dispatch(load()),
	})
)(TodoNew);