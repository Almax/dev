import React, {
	ListView,
	View,
	Text
} from 'react-native'

class Flow extends React.Component {
		
	constructor(props) {
		super(props)

		var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

		this.state = {
			queue: [],
			dataSource: dataSource
		}
	}

	push(text) {
		this.state.queue.push(text)
		this.setState({
			queue: this.state.queue,
			dataSource: this.state.dataSource.cloneWithRows(this.state.queue)
		})
	}

	render() {
		return (
			<ListView
				contentContainerStyle={{ alignItems: 'center', backgroundColor: '#EEEEEE', height: 100 }}
			  dataSource={this.state.dataSource}
			  renderRow={(rowData) => <Text>{rowData}</Text>} />
			
		)
	}
}

export default Flow