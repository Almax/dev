import React, {
	ScrollView,
	View,
	Text,
	StyleSheet,
} from 'react-native';
import styles from '../styles';
import { BackStep } from '../components/View';
import AccountCost from './AccountCost';
import AccountIncome from './AccountIncome';
class AccountEdit extends React.Component {
	render() {
		if(this.props.data.compute_sign === 1) {
			return (
				<View style={[styles.container, innerStyles.container]}>
					<BackStep navigator={this.props.navigator} title={"编辑收入"} />
					<AccountIncome
						reload={this.props.reload}
						data={this.props.data}
						navigator={this.props.navigator} />

				</View>
			);
		}else if(this.props.data.compute_sign === -1) {
			return (
				<View style={[styles.container, innerStyles.container]}>
					<BackStep navigator={this.props.navigator} title={"编辑支出"} />

					<AccountCost
						reload={this.props.reload}
						data={this.props.data}
						navigator={this.props.navigator} />

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
		backgroundColor: '#EFEFEF',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		paddingVertical: 20,
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
});

export default AccountEdit