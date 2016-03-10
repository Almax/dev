import React, {
	ScrollView,
	View,
	Text,
	Image,
	Alert,
} from 'react-native';
import { connect } from 'react-redux';
import asset from '../assets';
import { FormBlock, PureButton, Input,FormRow } from '../components/Form';
import { BackStep } from '../components/View';
import { findUser } from '../utils/session';
import FillMyProfile from './FillMyProfile';
import { createInvitation } from '../utils/syncdata';
class FindPartner extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			account: null,
			target: null,
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(/\d{11}/.test(nextState.account) == false) {
			return false;
		}else {
			return true;
		}
	}
	async _search() {
		if(this.state.account === this.props.user.username) {
			Alert.alert("无法匹配自己", "请更换搜索的账号");
			return ;
		}
		var target = await findUser(this.state.account);
		if(target.error) {
			Alert.alert('没有找到用户', '原因: '+JSON.stringify(target.error));
		}else {
			this.setState({
				target
			})
		}
	}
	async _sendInvitation() {
		var resp = await createInvitation({ 
			from_user_id: this.props.user.id, 
			to_user_id: this.state.target.id 
		});

		console.warn(JSON.stringify(resp));
		
		Alert.alert('发送成功','进入一下一步继续完善资料', 
		[
			{text: '下一步', onPress: () => this.props.navigator.push({ component: FillMyProfile }) }
		]);
	}
	_skip() {
		this.props.navigator.push({
			component: FillMyProfile
		});
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<BackStep title={"匹配另一半"} buttonTitle={"跳过"} buttonPress={this._skip.bind(this)} />
				<ScrollView 
					bounces={false}
					style={{ flex: 1, margin: 10, padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF' }}>
					<View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
						<Text style={{ fontSize: 20, fontWeight: '400', color: '#666666' }}>查找你的另一半(结婚对象)</Text>
					</View>
					<FormRow>
						<Image source={asset.search} />
						<View style={{ width: 5 }} />
						<Input 
							keyboardType={"numeric"}
							onChangeText={(account) => this.setState({account})}
							style={{ fontSize: 16, color: '#666666' }}
							placeholder={"他/她的手机号"} />
					</FormRow>
					<FormBlock>
						<PureButton onPress={this._search.bind(this)}>查找</PureButton>
					</FormBlock>

					<View>
					{ this.state.target ?
						<View>
							<Text style={{ fontSize: 14, color: '#666666' }}>找到了{this.state.account}，给他/她发送匹配邀请?</Text>
							<PureButton onPress={this._sendInvitation.bind(this)}>发送</PureButton>
					 	</View>
					 : null }
					</View>

				</ScrollView>
			</View>
		)
	}
}

export default connect(
	state=>({ user: state.session })
)(FindPartner);