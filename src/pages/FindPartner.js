import React, {
	ScrollView,
	View,
	Text,
	Image,
	Dimensions,
	Alert,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import asset from '../assets';
import styles from '../styles';
import { FormBlock, SubmitButton, Input,FormRow } from '../components/Form';
import { BackStep } from '../components/View';
import { findUser } from '../utils/session';
import FillMyProfile from './FillMyProfile';
import { createInvitation } from '../utils/syncdata';
import { load } from '../redux/modules/message';
class FindPartner extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			account: null,
		}
	}
	componentDidMount() {
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(/\d{11}/.test(nextState.account) == false) {
			return false;
		}else {
			return true;
		}
	}
	async _search() {
		if(this.state.account === this.props.session.username) {
			Alert.alert("无法匹配自己", "请更换搜索的账号");
			return ;
		}
		var target = await findUser(this.state.account);
		if(target && target.error) {
			Alert.alert(
				'没有找到用户', 
				`原因: ${target.error}`,
				[
					{text: '重试', onPress: () => true },
					{text: '跳过', onPress: () => this.props.navigator.push({ title: '完善资料', component: FillMyProfile }) }
				]
			);
		}else {
			Alert.alert('找到用户', `是否邀请${this.state.account}加入我的婚礼?`, [
        {text: '取消', onPress: () => console.log('Cancel Pressed!')},
        {text: '邀请', onPress: () => this._sendInvitation(target) },
			]);
		}
	}
	async _sendInvitation(target) {
		var resp = await createInvitation({ 
			from_user_id: this.props.session.id, 
			to_user_id: target.id 
		});
		this.props.loadMessage();
		Alert.alert('发送成功','进入一下一步继续完善资料', 
		[
			{	text: '下一步', 
				onPress: () => this.props.navigator.push({
					title: '完善我的资料',
					component: FillMyProfile 
				}) 
			}
		]);
	}
	render() {
		return (
			<View style={{ flex: 1, height: height, backgroundColor: '#EFEFEF' }}>					
				<ScrollView 
					bounces={false}
					style={{ flex: 1, margin: 10, padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF' }}>

					<View style={{ flex: 1 }}>
						<FormRow>
							<Image source={asset.search} />
							<View style={{ width: 5 }} />

							<Input
								keyboardType={"numeric"}
								onChangeText={(account) => this.setState({account})}
								style={{ fontSize: 16, color: '#666666' }}
								placeholder={"他\/她的手机号"}/>
						</FormRow>

						<View>
						{ this.state.target ?
							<View>
								<Text style={{ fontSize: 14, color: '#666666' }}>找到了{this.state.account}，给他/她发送匹配邀请?</Text>
								<PureButton onPress={this._sendInvitation.bind(this)}>发送</PureButton>
						 	</View>
						 : null }
						</View>
					</View>

					<View style={[{ flex: 1, flexDirection: 'row', height: 80, alignItems: 'center' }, styles.yellow_box]}>
						<Image source={asset.couple} style={{ height: 40 }} resizeMode={"contain"} />
						<View style={{ flex: 1, }}>
							<Text style={styles.smallText}>你现在是单人模式 , 邀请另一半加入婚礼</Text>
							<Text style={styles.smallText}>双人模式 筹备婚礼更简单哦~</Text>
						</View>
					</View>

					<SubmitButton onPress={this._search.bind(this)}>查找</SubmitButton>

				</ScrollView>
			</View>
		)
	}
}

export default connect(
	state=>({ session: state.session, marry: state.marry }),
	dispatch=>({
		loadMessage: () => dispatch(load())
	})
)(FindPartner);
