import React, {
	ScrollView,
	View,
	Text,
	Switch,
	TouchableOpacity,
	SegmentedControlIOS,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles'
import { FormBlock, FormRow, Selectable, SubmitButton, Input, SoftInput, PureButton } from '../components/Form'
import { CatalogSection, Caption, Subtitle, HorizontalView, BackStep, SegmentedControl } from '../components/View';
import { test } from '../redux/modules/money';
import NumberPad from '../components/Form/NumberPad';
import TodoCatalog from './TodoCatalog';
import { createMoney, updateMoney } from '../utils/syncdata';
class Income extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			success: false,
			value: 0,
			catalog_id: 0,
			description: null,
			isVisible: true
		}
	}
	componentDidMount() {
		this.scrollView.scrollResponderHandleTouchStart = (e) => {
			this.setState({
				isVisible: false
			});
		}

		if(this.props.data) {
			const data = this.props.data;
			this.setState({
				...data
			});
		}
	}
	_onScroll(y) {
		this.scrollView.scrollTo({ y });
		this.setState({ isVisible: false });
	}
	_selectCatalog() {
		this.props.navigator.push({
			component: TodoCatalog,
			params: {
				update: (catalog) => {
					this.setState({
						catalog_id: catalog.id
					})
				}
			}
		})
	}
	_toggleNumberPad() {
		this.setState({ isVisible: !this.state.isVisible });
	}
	async _submit() {
		const cost = {
			description: this.state.description,
			value: this.state.value,
			catalog_id: this.state.catalog_id,
			compute_sign: 1,
		};
		//console.warn(JSON.stringify(cost));
		await createMoney(this.props.marry, cost);
		this.setState({
			success: true
		});
	}
	_resetData() {
		this.setState({
			success: false,
			value: 0,
			catalog_id: 0,
			description: null,
			isVisible: true
		});
	}
	async _update() {
		const income = {
			id: this.state.id,
			description: this.state.description,
			value: this.state.value,
			catalog_id: this.state.catalog_id,
			compute_sign: 1,
		};
		await updateMoney(this.props.marry, income);
		if(this.props.reload) {
			await this.props.reload();
		}
		this.props.navigator.pop();
	}
	render() {
		const { money } = this.props;
		if(this.state.success === false) {
			return (
				<View style={{ flex: 1 }}>
					
					<ScrollView
						ref={scrollView => this.scrollView = scrollView }
						contentContainerStyle={innerStyles.container}>
						<Subtitle>收入类别</Subtitle>
						<View>
							<CatalogSection id={this.state.catalog_id} onPress={this._selectCatalog.bind(this)} />
						</View>
						<Subtitle>具体金额</Subtitle>
						<FormRow>
							<TouchableOpacity onPress={this._toggleNumberPad.bind(this)} style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text style={{ color: '#E1759C', fontSize: 32, fontWeight: '500' }}>￥</Text>
								<Text style={{ color: '#E1759C', fontSize: 32, fontWeight: '500' }}>
									{ parseFloat(this.state.value).toFixed(2) }
								</Text>
							</TouchableOpacity>
						</FormRow>
						<Subtitle>收入来源说明</Subtitle>
						<FormRow>
							<SoftInput 
								scroll={this._onScroll.bind(this)}
								value={this.state.description}
								onChangeText={(description) => this.setState({ description })}
								placeholder={"收入来源说明/备注"} />
						</FormRow>
						
						<FormBlock>
							{ 
								this.props.data ? 
								<PureButton onPress={this._update.bind(this)}>编辑收入</PureButton>
									:
								<PureButton onPress={this._submit.bind(this)}>添加收入</PureButton>
							 }
						</FormBlock>

					</ScrollView>

					<NumberPad 
						onChange={(value) => this.setState({ value })}
						isVisible={this.state.isVisible} />

				</View>
			);
		}else {
			return (
				<View style={innerStyles.container}>
					<Subtitle>添加完成</Subtitle>
					<FormBlock>
						<PureButton onPress={this._resetData.bind(this)}>继续添加</PureButton>
					</FormBlock>
				</View>
			);
		}

	}
}

const innerStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		borderRadius: 5,
		margin: 10,
		padding: 10,
	},
	segmented: { 
		marginVertical: 10, 
		paddingHorizontal: 10 
	},
})

export default connect(
	state=>({ marry: state.marry }),
	dispatch=>({})
)(Income);