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
import { CatalogSection, Caption, Subtitle, HorizontalView, BackStep, SegmentedControl } from '../components/View';
import AccountCost from './AccountCost';
import AccountIncome from './AccountIncome';

class Reminder extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>备注</Text>
			</View>
		)
	}
}

const ReminderRedux = connect(
	state=>({ money: state.money })
)(Reminder);

class AccountStore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: 0,
		}
	}
	_onViewChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
	}
	render() {
		if(this.state.selectedIndex === 0) {
			return (
				<View style={[styles.container, { backgroundColor: '#EFEFEF' }]}>
					<BackStep navigator={this.props.navigator} title={"记账"} />

					<View style={innerStyles.segmented}>
						<SegmentedControlIOS
							onChange={this._onViewChange.bind(this)}
							tintColor={"#F06199"}
							selectedIndex={this.state.selectedIndex}
							values={['支出', '收入', '备忘']} />
					</View>

					<AccountCost navigator={this.props.navigator} />

				</View>
			);
		}else if(this.state.selectedIndex === 1) {
			return (
				<View style={[styles.container, { backgroundColor: '#EFEFEF' }]}>
					<BackStep navigator={this.props.navigator} title={"记账"} />

					<View style={innerStyles.segmented}>
						<SegmentedControlIOS
							onChange={this._onViewChange.bind(this)}
							tintColor={"#F06199"}
							selectedIndex={this.state.selectedIndex}
							values={['支出', '收入', '备忘']} />
					</View>

					<AccountIncome navigator={this.props.navigator} />

				</View>
			);
		}else if(this.state.selectedIndex === 2) {
			return (
				<View style={[styles.container, { backgroundColor: '#EFEFEF' }]}>
					<BackStep navigator={this.props.navigator} title={"记账"} />
					
					<View style={innerStyles.segmented}>
						<SegmentedControlIOS
							onChange={this._onViewChange.bind(this)}
							tintColor={"#F06199"}
							selectedIndex={this.state.selectedIndex}
							values={['支出', '收入', '备忘']} />
					</View>

					<ReminderRedux navigator={this.props.navigator} />

				</View>
			);
		}else {
			return (
				<View />
			)
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

export default AccountStore;