import React, {
	ScrollView,
	View,
	Text,
	Image,
	Switch,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles';
import icons from '../assets';
import moment from 'moment';
import { Subtitle, BackStep, CatalogSection, PureText } from '../components/View';
import { FormBlock, FormRow, SoftInput, PureButton } from '../components/Form';
import AccountEdit from './AccountEdit';
import { findMoney, deleteMoney } from '../utils/syncdata';
import { load } from '../redux/modules/money';

import TimeAgo from 'react-native-timeago';
class AccountItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props.data };
	}
	_onScroll(offset) {
		this.scrollView.scrollTo({ y: offset });
	}
	_onValueChange(value) {
		this.setState({
			pay_status: value
		});
	}
	_editItem() {
		this.props.navigator.push({
			component: AccountEdit,
			params: {
				data: this.props.data,
				reload: this._reloadItem.bind(this)
			}
		});
	}
	_deleteItem() {
		deleteMoney(this.props.marry, this.props.data);
		this.props.load(this.props.marry);
		this.props.navigator.pop();
	}
	async _reloadItem() {
		var money = await findMoney(this.props.marry, this.props.data);
		this.setState({
			...this.state,
			...money,
		});

		this.props.load(this.props.marry);
	}
	render() {
		const { navigator } = this.props;
		const { value, catalog_id, compute_sign, description, pay_status, expired_at, user, created_at } = this.state;
		var title = '';
		if(compute_sign === 1) {
			title = '收入详情';
		}else {
			title = '支出详情';
		}
		return (
			<View style={[styles.container, innerStyles.container]}>
				<BackStep navigator={navigator} title={title} />
				<ScrollView 
					ref={scrollView => this.scrollView = scrollView}
					contentContainerStyle={innerStyles.card}>
						
					<View style={innerStyles.userCard}>
						<Image source={{ uri: user.photo }} style={innerStyles.avatar} />
						<View>
							<Text style={innerStyles.name}>{user.name}</Text>
		            
		          <View style={innerStyles.date}>
		            <Text style={innerStyles.helper}>添加于  </Text> 
		            <PureText color={"#769AE4"}>
		              { moment(created_at).format('YYYY-MM-DD h:mm a') }
		            </PureText>
		          </View>
						</View>
					</View>

					<View style={{ height: 1, backgroundColor: '#EFEFEF' }} />

					<View style={innerStyles.row}>
						<CatalogSection id={catalog_id} />
						<View style={{ flex: 1, justifyContent: 'flex-end' }}>
							<Text style={innerStyles.text}>{ description }</Text>
						</View>
					</View>

					<View style={{ height: 1, backgroundColor: '#EFEFEF' }} />

					<View style={innerStyles.row}>
						<View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
							<Text style={innerStyles.key}>金额</Text>
						</View>

						{ compute_sign > 0 ? 
							<Text style={[innerStyles.moneyValue,innerStyles.income]}>
								￥+{value}
							</Text>
							:
							<Text style={[innerStyles.moneyValue,innerStyles.cost]}>
								￥-{value}
							</Text>
						}
					</View>


					<View style={{ height: 1, backgroundColor: '#EFEFEF' }} />
					<View style={innerStyles.row}>
						<View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
							<Text style={innerStyles.key}>已经支付?</Text>
						</View>
						<Switch
							onValueChange={this._onValueChange.bind(this)}
	            value={pay_status ? true : false} />
					</View>

					{ 
						pay_status ? null : 
						<View>
							<View style={{ height: 1, backgroundColor: '#EFEFEF' }} />
							<View style={innerStyles.row}>
								<View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
									<Text style={innerStyles.key}>到期日</Text>
								</View>	
								{ expired_at ?
									<View style={{ flexDirection: 'row' }}>
										<Text style={{ fontSize: 16, color: '#666666' }}>{moment(expired_at).format('YYYY-MM-DD')}</Text>
										<View style={{ width: 10 }} />
										<TimeAgo time={expired_at} style={{ fontSize: 16, color: '#769AE4' }} />
									</View>
								 : 
								 	<Text style={{ fontSize: 16, color: '#666666' }}>{"还没设置"}</Text>
								}
							</View>
						</View>
					}


					<View style={{ height: 1, backgroundColor: '#EFEFEF' }} />

					<FormBlock>
						<PureButton onPress={this._editItem.bind(this)} size={"small"}>编辑</PureButton>
						<PureButton onPress={this._deleteItem.bind(this)} size={"small"}>删除</PureButton>
					</FormBlock>

					<View style={{ height: 1, backgroundColor: '#EFEFEF' }} />

					{/*
						<View style={innerStyles.msg}>
							<Subtitle>留言区</Subtitle>
							<FormRow>
								<SoftInput
									scroll={this._onScroll.bind(this)}
									mutiline={true}
									placeholder={"留言"} />

								<PureButton size={"small"}>留言</PureButton>
							</FormRow>
						</View>
					*/}

				</ScrollView>
			</View>
		);
	}
}

const innerStyles = StyleSheet.create({
	container: {
		backgroundColor: '#EFEFEF',
	},
	row: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		paddingVertical: 10,
		height: 50,
	},
	text: {
		fontSize: 16,
		color: '#666666',
		fontWeight: '300',
	},
	key: {
		fontSize: 14, fontWeight: '500', color: '#666666',
	},
	card: {
		margin: 10,
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#FFFFFF',
	},
	avatar: {
		height: 50,
		width: 50,
		borderRadius: 25,
		marginRight: 10,
	},
	userCard: {
		flexDirection: 'row', 
		alignItems: 'center', 
		marginVertical: 10,
	},
	name: { fontSize: 16, color: '#666666', fontWeight: '500' },
	helper: { fontSize: 12, color: '#999999' },
	date: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
	moneyValue: {
		fontSize: 30,
		fontWeight: '400',
	},
	cost: {
		color: '#E1759C',
	},
	income: {
		color: '#6AA216',
	},
	icon: {
		width: 20,
		height: 20,
	},
	msg: {
		borderTopColor: '#EFEFEF',
		borderTopWidth: 1,
	},
});

export default connect(
	state=>({ money: state.money, marry: state.marry }),
	dispatch=>({
		load: (marry) => dispatch(load(marry))
	})
)(AccountItem);