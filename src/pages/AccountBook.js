import React, {
	ListView,
	View,
	Text,
	TouchableOpacity,
	PixelRatio,
	InteractionManager,
	RefreshControl,
	StyleSheet,
} from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { BackStep, CatalogSection } from '../components/View';
import { load } from '../redux/modules/money';
import AccountBudget from './AccountBudget';
import AccountItem from './AccountItem';
class AccountBook extends React.Component {
	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({ 
			getSectionHeaderData: this._getSectionHeaderData,
			rowHasChanged: (r1, r2) => r1!==r2,
			sectionHeaderHasChanged: (s1, s2) => s1!==s2
		});
		this.state = {
			dataSource,
			budget: 0.0,
			cost: 0.0,
			a: 100,
			isRefreshing: false,
		};
	}
	async componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.load(this.props.marry);
		});
	}
	componentWillReceiveProps(nextProps) {
		var ds = {};
		var { budget, cost } = this.state;
		Object.keys(nextProps.money).map((key) => {
			var value = parseFloat(nextProps.money[key].value);
			if(nextProps.money[key].compute_sign === 1) {
				budget=budget+value;
			}else if(nextProps.money[key].compute_sign === -1) {
				cost=cost+value;
			}
			this.setState({
				budget,
				cost
			});
			if(ds[nextProps.money[key].catalog_id]) {	
				ds[nextProps.money[key].catalog_id].push(nextProps.money[key])
			}else {
				ds[nextProps.money[key].catalog_id] = [nextProps.money[key]];
			}
		});
		this.setState({
			dataSource: this.state.dataSource.cloneWithRowsAndSections(ds)
		});
	}
	sectionHeaderHasChanged(dataBlob, sectionID) {
		return sectionID;
	}
	_renderSectionHeader(sectionData, sectionID) {
		return (
		<View style={{ backgroundColor: '#EFEFEF' }}>
			<CatalogSection id={sectionID} />
		</View>
		)
	}
	_renderRow(row, sectionId, rowId) {
		if(row.compute_sign === -1) {
			return (
				<TouchableOpacity onPress={this._viewItem.bind(this,row)} style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 10, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }}>
					<Text style={innerStyles.item}>{row.description}</Text>
					<Text style={innerStyles.cost}>￥{row.value * parseFloat(row.compute_sign)}</Text>
				</TouchableOpacity>
			)
		}else if(row.compute_sign === 1) {
			return (
				<TouchableOpacity onPress={this._viewItem.bind(this,row)} style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 10, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }}>
					<Text style={innerStyles.item}>{row.description}</Text>
					<Text style={innerStyles.income}>￥+{row.value * parseFloat(row.compute_sign)}</Text>
				</TouchableOpacity>
			)
		}
	}
	_viewItem(item) {
		this.props.navigator.push({
			component: AccountItem,
			params: {
				data: item
			}
		})
	}
	_onRefresh() {
    this.setState({
    	isRefreshing: true
    });
    setTimeout(() => {
    	this.setState({
				budget: 0.0,
				cost: 0.0,
				a: 100,
    	});

     	this.props.load(this.props.marry);
      this.setState({
        isRefreshing: false
      })
    }, 2000);
	}
	render() {
		return (
			<View style={[styles.container, { backgroundColor: '#EFEFEF' }]}>
				<BackStep navigator={this.props.navigator} title={"账本"} />

				<View style={{ height: 1/PixelRatio.get() }} />
				<View style={innerStyles.buttonRow}>
					<TouchableOpacity onPress={() => this.props.navigator.push({ component: AccountBudget })} style={innerStyles.button}>
						<Text style={innerStyles.key}>我的预算</Text>
						<Text style={innerStyles.value}>{ this.state.budget } 元</Text>
					</TouchableOpacity>

					<View style={{ width: 1/PixelRatio.get(), height: 150 }} />

					<TouchableOpacity style={innerStyles.button}>
						<Text style={innerStyles.key}>已花费</Text>
						<Text style={innerStyles.value}>{ this.state.cost } 元</Text>
					</TouchableOpacity>
				</View>	

				<View style={{ height: 1/PixelRatio.get() }} />
				
				<View style={innerStyles.oneline}>
					<Text style={innerStyles.helper}>剩余金额</Text>
					<Text style={innerStyles.reversedValue}>{ this.state.budget - this.state.cost }</Text>
					<Text>元</Text>
				</View>

				<ListView
					automaticallyAdjustContentInsets={false}
					initialListSize={1}
					pageSize={8}
					dataSource={this.state.dataSource}
					renderSectionHeader={this._renderSectionHeader.bind(this)}
					renderRow={this._renderRow.bind(this)}					
					refreshControl={
          	<RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#EEEEEE"
              title="更新账本"
              colors={['#F06199']}
              progressBackgroundColor="#FFFFFF"
            />
          } />

			</View>
		)
	}
}

const innerStyles = StyleSheet.create({
	buttonRow: {
		flexDirection: 'row',
		height: 120,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F06199',
	},
	key: {
		fontSize: 16,
		fontWeight: '300',
		color: '#FFFFFF',
	},
	value: {
		fontSize: 28,
		fontWeight: '500',
		color: '#FFFFFF',
	},
	reversedValue: {
		fontSize: 34,
		fontWeight: '500',
		color: '#F06199',
	},
	helper: {
		fontSize: 16,
		color: '#C0C0C0',
	},
	oneline: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFEFF5',
		height: 50,
	},
	item: {
		fontSize: 16,
		fontWeight: '500',
		color: '#666666',
	},
	cost: {
		fontSize: 18,
		fontWeight: '500',
		color: '#E1759C',
	},
	income: {
		fontSize: 18,
		fontWeight: '500',
		color: '#6AA216',
	},
})

export default connect(
	state=>({ money: state.money, marry: state.marry }),
	dispatch=>({
		load: (marry) => dispatch(load(marry))
	})
)(AccountBook);