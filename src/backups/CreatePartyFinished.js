import React, {
	View,
	Text,
	Alert
} from 'react-native';

import styles from '../styles';

import { connect } from 'react-redux';

import { store } from '../redux/modules/session';

import { FormBlock, FormRow, Input, PureButton } from '../components/Form';
import { Caption, Subtitle, FinalStep, ActivityIndicator } from '../components/View';

import Flow from '../components/Widget/Flow';

import CreatePartyProfile from './CreatePartyProfile';
import Navigator from './Navigator';

class CreatePartyFinished extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			isPendding: true,
		}
	}

	componentDidMount() {
		const { marry_date, username_1, username_2, password, store } = this.props;

		if(!/\d{11}/.test(username_1) || !/\d{11}/.test(username_2) || password.length < 6 ) {
				Alert.alert('请先完善信息再继续', "可能有空缺信息或者密码太短", [
					{text: '知道了', onPress: () => this.props.navigator.pop() }
				])
		}

		fetch('http://192.168.199.152:3000/api/v1/users/signup_wedding', {
			method: 'post',
		  headers: {'Accept': 'application/json','Content-Type': 'application/json'},
			body: JSON.stringify({
				user: { marry_date, username_1, username_2, password }
			})
		})
		.then(response => response.json())
		.then(response => {
			if(response.error) {
				Alert.alert('账号不可用', response.error, [
					{text: '知道了', onPress: () => this.props.navigator.pop() }
				])
			}else {
				const { me, partner, marry } = response;
				store(me);
				this.setState({
					isPendding: false
				})
			}
		})
		.catch((error) => {
			console.log(error)
		});
	}

	render() {

		const { marry_date, username_1, username_2, password, state } = this.props;

		if(this.state.isPendding) {
			return (
			<View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
				
				<ActivityIndicator>正在处理</ActivityIndicator>
				
			</View>
			)
		}else {
			return (
				<View style={styles.container}>	
					<FinalStep stepName={"创建完成"} />
					<Caption color={"#3FAEEC"}>恭喜你，你与另一半的婚礼创建好了</Caption>


					<Text>{ JSON.stringify(state) }</Text>

					<Subtitle color={"#52AB0A"}>现在，你的另一半可以用 [账号{username_2}/共同密码{password}] 来登陆婚格，与你共享婚礼筹备了</Subtitle>
					{/*
						<Subtitle>选择进入婚格 / 继续创建 婚礼纪念日,婚礼回忆,许愿单</Subtitle>
						<FormBlock>
							<PureButton onPress={ () => this.props.navigator.push({ component: CreatePartyProfile }) }>继续创建</PureButton>
						</FormBlock>
					*/}

					<FormBlock>
						<PureButton onPress={ () => this.props.navigator.push({ component: Navigator }) }>直接进入婚格</PureButton>
					</FormBlock>
				</View>
			)
		}

	}
}

export default connect(
	state => ({ state: state.session }),
	dispatch => ({
		store: (session) => dispatch(store(session))
	}) 
)(CreatePartyFinished)
