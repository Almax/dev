import React, {
	ScrollView,
	View,
	TouchableWithoutFeedback,
	Alert,
	Text,
	StyleSheet
} from 'react-native';

import {
	FormRow,
	SoftInput,
	Label,
	SubmitButton,
	FormBlock,
	Link
} from '../components/Form';

import { connect } from 'react-redux';
import { Logo, BackStep } from '../components/View';
import styles from './LogIn.styles';
import asset from '../assets';
import { login } from '../redux/modules/session';
import Register from './Register';
import CreatePartyDate from './CreatePartyDate';

class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: null,
			password: null
		}
	}
	componentDidMount() {
		// this.props.navigator.push({
		// 	component: Register
		// })
	}
	componentWillReceiveProps(nextProps) {
		const user = nextProps.state;
	}
	async _loginUser() {
		const { loginUser } = this.props;
		await loginUser(this.state.username, this.state.password)
	}
	_scroll(offset) {
		this.scrollView.scrollTo({ y: offset })
	}
	render() {
		return (
		<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
			<BackStep title={"登陆到婚格"}/>
			<ScrollView
				ref={scrollView=>this.scrollView = scrollView}
				bounces={false}
				keyboardDismissMode={"interactive"}
				contentContainerStyle={[styles.wall, {padding: 10 , justifyContent: 'center'}]}>
	      <TouchableWithoutFeedback>
	        <View>
	          <Logo source={asset.logo} />
	        </View>
	      </TouchableWithoutFeedback>
				<FormRow>
					<Label>用户名</Label>
					
					<SoftInput
						scroll={this._scroll.bind(this)} 
						onChangeText={(username) => this.setState({ username })}
						placeholder={"手机号"} />

				</FormRow>
				<FormRow>
					<Label>密码</Label>
					<SoftInput
						scroll={this._scroll.bind(this)} 
						secureTextEntry={true}
						onChangeText={(password) => this.setState({ password })}
						placeholder={"请输入你的密码"} />
				</FormRow>
				<FormBlock>
					<SubmitButton onPress={this._loginUser.bind(this)}>登陆</SubmitButton>
				</FormBlock>
				<Link onPress={() => this.props.navigator.push({ component: Register, params: { ...this.state } })}>还没有注册? 立即注册</Link>
				<Link onPress={() => this.props.navigator.push({ component: CreatePartyDate })}>创建我的婚礼</Link>
			</ScrollView>
		</View>
		)
	}

}

module.exports = connect(
	state => ({ state: state.session }),
	dispatch => ({
		loginUser: (username, password) => dispatch(login(username, password))
	})
)(Login)
//export default Login