import React, {
	ScrollView,
	View,
	Text,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import {
	FormRow,
	Input,
	Label,
	WaitButton,
	SubmitButton,
	FormBlock,
	Link
} from '../components/Form';
import { Logo, BackStep } from '../components/View';
import asset from '../assets';
import { sendActivation, doActivation } from '../utils/session';
import { store } from '../redux/modules/session';

const SMS_EXPIRED_TIME = 60;
class Register extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			send: false,
			timer: SMS_EXPIRED_TIME,
			username: null,
			password: null,
			code: null,
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.username !== nextState.username ||
			 this.state.password !== nextState.password ||
			 this.state.code !== nextState.code
		) {
			return false;
		}
		return true;
	}
  setInterval() {
    this.intervals.map(clearInterval);
    this.intervals.push(setInterval.apply(null, arguments));
  }

  clearInterval() {
  	this.intervals.map(clearInterval);
  }

  componentWillMount() {
    this.intervals = [];
  }

	componentWillUnmount() {
		this.clearInterval()
	}

	async sendCode() {
		if(/\d{11}/.test(this.state.username)) {
			this.setState({send: true});
			await sendActivation(this.state.username);
			this._startCount();
		}else {
			Alert.alert('账号不正确', '请填写正确的11位手机号');
			return ;
		}
	}

	_startCount() {
		let _this = this;
		this.setInterval(() => {
			if(_this.state.timer == 1) {
				_this.setState({ 
					timer: SMS_EXPIRED_TIME,
					send: false,
				});
			  return _this.clearInterval();
			}else {
			  _this.setState({
			    timer: _this.state.timer-1
			  });
			}
		}, 1000);
	}
	async _signup() {
		var resp = await doActivation({
			username: this.state.username,
			password: this.state.password,
			code: this.state.code,
		});

		if(resp.error) {
			Alert.alert("注册出错",resp.error);
		}else {
			this.props.loginUser(resp);
		}
	}
	render() {
		return (
			<View style={styles.container}>

				<BackStep navigator={this.props.navigator} title={"注册婚格"} />
				<ScrollView
					bounces={false}
					keyboardDismissMode={"interactive"}
					contentContainerStyle={[styles.wall, {padding: 10 , justifyContent: 'center'}]}>
	        
		        <View style={{ marginTop: 20 }}>
		          <Logo source={asset.logo} />
		        </View>
						<FormRow>
							<Label>手机号</Label>
							<Input
								keyboardType={"numeric"}
								onChangeText={(username)=>this.setState({ username })}
								placeholder={"请输入你的手机号"}/>
						</FormRow>
						<FormRow>
							<Label>验证码</Label>
							<Input
								keyboardType={"numeric"}
								onChangeText={(code)=>this.setState({ code })}
								placeholder={"请输入验证码"}/>

								{ this.state.send ?
									<WaitButton size={"small"}>{this.state.timer}秒后</WaitButton>
									:
									<SubmitButton onPress={this.sendCode.bind(this)} size={"small"}>发送验证码</SubmitButton>
								}
						</FormRow>
						<FormRow>
							<Label>密码</Label>
							<Input
								secureTextEntry={true}
								onChangeText={(password)=>this.setState({ password })}
								placeholder={"输入密码"}/>
						</FormRow>
						<FormBlock>
							<SubmitButton onPress={this._signup.bind(this)}>注册</SubmitButton>
						</FormBlock>
						<FormBlock>
							<Link onPress={() => { this.props.navigator.pop() }}>使用已有账号登录</Link>
						</FormBlock>
						<View style={{ padding: 20 }}>
							<Text style={{ color: '#999999' }}>注意: 如果是即将结婚的用户，推荐请使用上一页的“创建我的婚礼”使用主动邀请协作功能,当前为普通注册</Text>
						</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF'
	}
}

module.exports = connect(
	state => ({ state: state.session }),
	dispatch => ({
		loginUser: (user) => dispatch(store(user))
	})
)(Register)