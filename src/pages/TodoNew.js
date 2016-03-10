import React, {
	ScrollView,
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	Platform,
	PushNotificationIOS,
	StyleSheet,
} from 'react-native'
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

import { create, load } from '../redux/modules/task';

class TodoNew extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			done: false,
			task_name: null,
			catalog_id: null,
			end_date: null,
		};
	}
	viewScroll(offset) {
		this.scrollView.scrollTo({ x:0 ,y: offset, animated: true })
	}
	setValue(key, value) {
		this.setState({key: value});
	}
	nextStep() {
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

		}
	}
	render() {
		const { navigator } = this.props;
		if(this.state.done === true) {
			return (
				<View	style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
					<Text>任务分配好了</Text>
					<TouchableOpacity 
						onPress={() => navigator.popToTop()} 
						style={{ alignItems: 'center', justifyContent: 'center', height: 100, width: 100 }}>						
						<Text>返回</Text>
					</TouchableOpacity>

				</View>
			)
		}else {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<BackStep navigator={this.props.navigator} title={"添加任务"} />
				<ScrollView
					bounces={false}
					ref={scrollView => this.scrollView = scrollView}
					contentContainerStyle={[styles.container, {margin: 10, padding: 10, backgroundColor: '#FFFFFF', borderRadius: 5}]}>
					
					<Subtitle>描述</Subtitle>
					<FormRow>
						<SoftInput 
							ref={textInput => this.textInput = textInput}
							multiline={true}
							value={this.state.task_name}
							onChangeText={ task_name => this.setState({ task_name }) }
							style={innerStyles.textInput}
							scroll={this.viewScroll.bind(this)}
							placeholder={"简单描述一下做什么"} />
					</FormRow>
					
					<Subtitle>描述参考</Subtitle>
					<FormRow>
						<Selectable
							onPress={() => this.props.navigator.push({ 
								component: AddAdvise,
								params: {
									getResult: (value) => {
										this.setState({ task_name: value });
									},
								},
							})}
							indicator={<Image source={asset.arrowRight}  />}>选择</Selectable>
					</FormRow>

					<Subtitle>任务类别</Subtitle>
					<FormRow>
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

							{ this.state.catalog_id ? <CatalogSection id={this.state.catalog_id} /> : "选择"  }

							</Selectable>
					</FormRow>
					<Subtitle>提醒日期</Subtitle>
					<FormRow>
						<Selectable
							onPress={() => this.props.navigator.push({ 
								component: AddDate,
								params: {
									getResult: (value) => {
										this.setState({ end_date: value });
									},
								},
							})}
							indicator={<Image source={asset.arrowRight}  />}>
							{ this.state.end_date ? 
									<Text style={innerStyles.date}>
										{moment(this.state.end_date).format("YYYY年MM月DD日")}
									</Text> 
									: 
									"选择" 
							}
							</Selectable>
					</FormRow>

					<FormBlock>
						<SubmitButton onPress={this.nextStep.bind(this)}>添加任务</SubmitButton>
					</FormBlock>
				</ScrollView>
			</View>
			);
		}
	}
}


const innerStyles = StyleSheet.create({
	textInput: {
		color: '#666666',
		fontSize: 14,
		fontWeight: '500',
		backgroundColor: '#FFFFFF',
		height: 100,
	},
	date: {
		marginHorizontal: 15,
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