import React, {
	ListView,
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';
import MenuList from '../components/View/MenuList';
import { BackStep } from '../components/View';
import data from './mock.json';
import { colors } from '../styles';
import AddDate from './AddDate';

class AddAdvise extends React.Component {

	constructor(props) {
		super(props)

		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})

		this.state = {
			dataSource
		}
	}

	componentDidMount() {
		const { task } = data;
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(task)
		})
	}

	select(task) {
		const { getResult } = this.props;
		getResult(task);
		this.props.navigator.pop();
	}

	renderRow(row, sid, rid) {
		return (
			<TouchableOpacity onPress={this.select.bind(this, row.task)} activeOpacity={0.7} style={styles.row}>
				<Text style={styles.text}>{row.task}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>

				<BackStep navigator={this.props.navigator} />

				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)} />

			</View>
		)
	}
}

const styles = StyleSheet.create({
	row: {
		padding: 20, justifyContent: 'center', backgroundColor: '#FFFFFF', marginBottom: 1
	},
	text: {
		fontSize: 16, fontWeight: '500', color: '#666666', lineHeight: 20
	}
})

export default AddAdvise;