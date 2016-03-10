import React, {
	TouchableOpacity,
	View,
	Text,
	ListView
} from 'react-native'

class HorizontalList extends React.Component {

	constructor(props) {
		super(props)

		var { data } = this.props;
		var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
		
		this.state = {
			dataSource: dataSource.cloneWithRows(data)
		}
	}

	renderRow(row, sid, rid) {
		const { keyName } = this.props;

		return (
			<TouchableOpacity onPress={ () => this.props.onSelect(row) } style={{ backgroundColor: '#FFFFFF', marginBottom: 1, padding: 10, justifyContent: 'center'}}>
				<Text style={{ fontSize: 16, color: '#999999' }}>{ keyName ? row[keyName] : row }</Text>
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<View style={{height: 100, borderTopWidth: 1, borderTopColor: '#EEEEEE', borderBottomWidth: 1, borderBottomColor: '#EEEEEE'}}>
				<ListView
					automaticallyAdjustContentInsets={false}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)} />
			</View>
		)
	}
}

export default HorizontalList