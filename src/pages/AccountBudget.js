import React, {
	View,
	ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { BackStep } from '../components/View';

class AccountBudget extends React.Component {
	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1!==r2 })
		this.state = {
			dataSource
		};
	}
	_renderRow(row) {
		return (
			<View><Text>{JSON.stringify(row)}</Text></View>
		)
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<BackStep navigator={this.props.navigator} />


			</View>
		);
	}
}

export default connect(
	state=> ({}),
	dispatch=> ({})
)(AccountBudget);