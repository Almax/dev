const TIMES = [0,1,2,3,4,5]

import React, {
	ScrollView,
	View,
	TouchableOpacity,
	Text,
	Image,
	PushNotificationIOS,
	Platform,
	StyleSheet
} from 'react-native'

import moment from 'moment'

import { Caption, Subtitle, HorizontalView, BackStep } from '../components/View'
import HorizontalList from '../components/View/HorizontalList'
import { FormBlock, SubmitButton } from '../components/Form'
import { connect } from 'react-redux'
import { create, load } from '../redux/modules/task'

class AddPerson extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			done: false,
			users: []
		}
	}

	pickUser(user) {
		const { users } = this.state
		var index = users.indexOf(user)
		if(index === -1) {
			this.state.users.push(user)
		}else {
			this.state.users.splice(index, 1)
		}

		this.setState({
			users: this.state.users
		})
	}

	submit() {
		const { task, taskCate, date } = this.props;

		this.props.create({
			task_name: task,
			//taskCate,
			status: false,
			end_date: date,
			users: this.state.users
		})
		
		this.setState({
			done: true
		});

		this.props.load();

		if(Platform.OS === 'ios') {
			PushNotificationIOS.requestPermissions();
			PushNotificationIOS.scheduleLocalNotification({
				fireDate: moment(date).toISOString(),
				alertBody: "婚格提醒: "+task,
				soundName: 'default'
			})
		}else if(Platform.OS === 'android') {

		}

	}

	render() {
		const { task, taskCate, date, state, navigator } = this.props;

		const { users } = state

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
				<View	style={{ flex: 1, backgroundColor: '#FFFFFF'}}>
					<BackStep navigator={this.props.navigator} />
					<ScrollView contentContainerStyle={{ padding: 10 }}>
						<Caption>这是我刚刚添加的待办事项</Caption>

						<Subtitle>事项描述: </Subtitle>
						<Text style={{ fontSize: 18, fontWeight: '500', color: '#666666' }}>{task}</Text>

						<Subtitle>事项提醒: </Subtitle>
						<Text style={{ fontSize: 18, fontWeight: '500', color: '#666666' }}>{moment(date).format('YYYY MMMM Do, h:mm a')}</Text>
						
						<Subtitle>事项分配给: </Subtitle>

						<View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
							{Object.keys(this.state.users).map((key) => {
								return (
									<Text key={"user_"+key} style={{ fontSize: 16, color: '#666666', fontWeight: '500', marginRight: 10 }}>
										{this.state.users[key].name}
									</Text>
								)
							})}
						</View>

						<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>	
							{Object.keys(users).map((key) => {
								return (
									<TouchableOpacity style={styles.user} key={"_"+key} onPress={this.pickUser.bind(this, users[key])}>
										<Image source={{ uri: users[key].photo }} style={{ height: 60, width: 60, borderRadius: 30 }} />
										<Text style={{ fontSize: 16, color: '#666666', fontWeight: '500' }}>{users[key].name}</Text>
									</TouchableOpacity>
								)
							})}
						</View>
						<FormBlock>
							<SubmitButton onPress={this.submit.bind(this)}>完成</SubmitButton>
						</FormBlock>
					</ScrollView>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	user: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	headimg: {
		width: 50, 
		height: 50, 
		borderRadius: 25, 
		backgroundColor: '#EEEEEE'
	}
})

export default connect(
	state => ({ state: state.marry }),
	dispatch => ({
		create: (data) => dispatch(create(data)),
		load: () => dispatch(load()),
	})
)(AddPerson)