import React, {
	ListView,
	View,
	Text,
	Image,
} from 'react-native';
class TodoMember extends React.Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1!==r2 });
		this.state = {
			ds: ds.cloneWithRows(props.users)
		}
	}
	_renderRow(user) {
		return (
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 1, backgroundColor: '#FFFFFF' }}>
				<Image source={{ uri: user.photo }} style={{ height: 50, width: 50, borderRadius: 25 }} />
				<Text>{user.name}</Text>
			</View>
		);
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<ListView 
					dataSource={this.state.ds}
					renderRow={this._renderRow.bind(this)}/>
			</View>
		);
	}
}
export default TodoMember;