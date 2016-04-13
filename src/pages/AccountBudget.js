import React, {
	ScrollView,
	View,
	Text,
	ListView,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { AccountCatalog, BackStep, Subtitle } from '../components/View';
import accounts from '../utils/account';
import budgets from '../utils/budget';

class AccountBudget extends React.Component {
	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({ 
			rowHasChanged: (r1,r2) => r1!==r2,
		});
		var budgetSource = new ListView.DataSource({ 
			rowHasChanged: (r1,r2) => r1!==r2,
		});
		this.state = {
			dataSource,
			budgetSource,
			total: 0.0,
		};
	}
	componentDidMount() {
		const { money } = this.props;
		var maps = {};
		var total = 0.0;
		Object.keys(money).map((key) => {
			if(money[key].compute_sign === 1) {

				total += parseFloat(money[key].value);

				if(maps[money[key].catalog_id]) {
					maps[money[key].catalog_id] += parseFloat(money[key].value);
				}else {
					maps[money[key].catalog_id] = parseFloat(money[key].value);
				}
			}
		});
		this.setState({
			total,
			dataSource: this.state.dataSource.cloneWithRows(maps),
			budgetSource: this.state.budgetSource.cloneWithRows(budgets),
		});
	}
	componentWillReceiveProps(nextProps) {
		const { money } = nextProps;
		var maps = {};
		var total = 0.0;
		Object.keys(money).map((key) => {
			if(money[key].compute_sign === 1) {

				total += parseFloat(money[key].value);

				if(maps[money[key].catalog_id]) {
					maps[money[key].catalog_id] += parseFloat(money[key].value);
				}else {
					maps[money[key].catalog_id] = parseFloat(money[key].value);
				}
			}
		});
		this.setState({
			total,
			dataSource: this.state.dataSource.cloneWithRows(maps)
		});
	}
	_renderRow(row, sectionId, rowId) {
		return (
			<View style={styles.row}>
				<Text style={styles.title}>{accounts[rowId].name}</Text>
				<Text style={styles.value}>{row}</Text>
			</View>
		)
	}
	_renderFooter() {
		return (
			<View style={styles.row}>
				<Text style={styles.title}>总资金</Text>
				<Text style={styles.value}>{this.state.total}</Text>
			</View>
		);
	}
	_renderBudget(row) {
		if(row.percent == 0) {
			return (
				<View />
			);
		}
		return (
			<View style={styles.row}>
				<Text style={styles.title}>{row.name}</Text>
				<Text style={styles.value}>{parseFloat(this.state.total * row.percent).toFixed(2)}</Text>
			</View>
		)
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<ScrollView
					contentContainerStyle={{ padding: 10 }}>

					<Subtitle>预算</Subtitle>
					<View style={styles.form}>
						<ListView 
							dataSource={this.state.dataSource}
							renderFooter={this._renderFooter.bind(this)}
							renderRow={this._renderRow.bind(this)} />
					</View>


					<Subtitle>预算小贴士</Subtitle>
					<View style={styles.form}>

						<View style={{ marginVertical: 10 }}>
							<Text style={{ fontSize: 15, lineHeight: 25, color: '#666666' }}> 
								我们会根据你的总预算金额,帮您计算出,结婚筹备过程中需要的资金预算，记录你的支出，我们会根据你的预算对你进行提醒
							</Text>
						</View>

						<ListView 
							dataSource={this.state.budgetSource}
							renderRow={this._renderBudget.bind(this)} />
					</View>

				</ScrollView>

			</View>
		);
	}
}
const styles = StyleSheet.create({
	form: {
		paddingHorizontal: 10,
		backgroundColor: '#FFFFFF',
		borderRadius: 5,
	},
	title: {
		fontSize: 16,
		color: '#999999',
	},
	value: {
		fontSize: 16,
		color: '#666666',
	},
	row: { 
		height: 50, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between', 
		borderBottomWidth: 1,
		borderBottomColor: '#EFEFEF',
	},
})
export default connect(
	state=> ({ money: state.money }),
	dispatch=> ({})
)(AccountBudget);