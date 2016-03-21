import React, {
	ScrollView,
	View,
	Text,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import {
	FormRow,
	SoftInput,
	Label,
	WaitButton,
	SubmitButton,
	FormBlock,
	Link
} from '../components/Form';
import { Logo, BackStep } from '../components/View';
import styles from '../styles';
import asset from '../assets';
import { findPassword, findPasswordConfirm } from '../utils/session';
import { store } from '../redux/modules/session';

const SMS_EXPIRED_TIME = 60;
class FindPassword extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			send: false,
			timer: SMS_EXPIRED_TIME,
			username: null,
			password: null,
			password_confirmation: null,
			code: null,
		}
	}
	componentWillReceiveProps(nextProps) {
		const user = nextProps.state;
		if(user.id) {
			this.props.navigator.popToTop();
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
			await findPassword({ username: this.state.username });
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
		if(this.state.password == null ||
			 this.state.password !== this.state.password_confirmation ||
			 this.state.password.length<6) {
			Alert.alert('重新填写密码','密码太短或者两次输入密码不一致');
			return ;
		}
		var resp = await findPasswordConfirm({
			username: this.state.username,
			password: this.state.password,
			code: 		this.state.code,
		});
		if (resp.error) {
			Alert.alert('注册出错',resp.error);
		} else {
			this.props.loginUser(resp);
			Alert.alert('修改成功', '你的密码已经修改成功，请记住你的新密码');
		}
	}
	_scroll(offset) {
		this.scrollView.scrollTo({ y: offset });
	}
	render() {
		return (
			<View style={styles.container}>

				<BackStep navigator={this.props.navigator} title={"找回密码"} />
				<ScrollView
					ref={scrollView => this.scrollView = scrollView}
					bounces={false}
					keyboardDismissMode={"interactive"}
					contentContainerStyle={[styles.wall, {padding: 10 , justifyContent: 'center'}]}>
	        
		        <View style={{ marginTop: 10 }}>
		          <Logo source={asset.logo} />
		        </View>
						<FormRow>
							<Label>手机号</Label>
							<SoftInput
								scroll={this._scroll.bind(this)}
								style={styles.input}
								keyboardType={"numeric"}
								onChangeText={(username)=>this.setState({ username })}
								placeholder={"请输入你的手机号"}/>
						</FormRow>
						<FormRow>
							<Label>验证码</Label>
							<SoftInput
								scroll={this._scroll.bind(this)}
								style={styles.input}
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
							<Label>新的密码</Label>
							<SoftInput
								scroll={this._scroll.bind(this)}
								style={styles.input}
								secureTextEntry={true}
								onChangeText={(password)=>this.setState({ password })}
								placeholder={"输入密码"}/>
						</FormRow>
						<FormRow>
							<Label>确认密码</Label>
							<SoftInput
								scroll={this._scroll.bind(this)}
								style={styles.input}
								secureTextEntry={true}
								onChangeText={(password_confirmation)=>this.setState({ password_confirmation })}
								placeholder={"再次输入密码"}/>
						</FormRow>
            
            <View style={{ height: 20 }} />
					  <SubmitButton onPress={this._signup.bind(this)}>修改密码</SubmitButton>

						<FormBlock>
							<Link onPress={() => { this.props.navigator.pop() }}>使用已有账号登录</Link>
						</FormBlock>
				</ScrollView>
			</View>
		);
	}
}

module.exports = connect(
	state => ({ state: state.session }),
	dispatch => ({
		loginUser: (user) => dispatch(store(user))
	})
)(FindPassword)