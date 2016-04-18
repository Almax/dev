import React, {
	TouchableOpacity,
	ListView,
	Image,
	View,
	Text,
	CameraRoll,
	Dimensions,
} from 'react-native';
import asset from '../assets';
import { connect } from 'react-redux';
import { updateFriends, resetContacts } from '../redux/modules/friend';
import { SubmitButton } from '../components/Form';
const { width } = Dimensions.get('window');
const marginRight = ( width - 220 ) / 5;
class PickContacts extends React.Component {
	constructor(props) {
		super(props);
		const { friends } = this.props;
		const dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			dataSource: dataSource.cloneWithRows(friends)
		};
	}
	async componentDidMount() {
		
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(nextProps.friends)
		})
	}
	_onSelect(contact) {
		let newContact = { ...contact };
		newContact.selected = newContact.selected ? false : true;
		this.props.updateFriends(newContact);
	}
	_renderRow(contact, sectionId, rowId) {
		if(contact.selected) {
			return (
				<TouchableOpacity
					activeOpacity={1}
					onPress={this._onSelect.bind(this, contact)}
					style={{ marginTop: marginRight, marginRight: marginRight, alignItems: 'center' }}>
					
					
					<Image source={{ uri: contact.photo }} style={{ backgroundColor: '#EEEEEE', height: 50, width: 50, borderRadius: 25 }}>
						<View style={{ backgroundColor: 'rgba(0,0,0,0.4)', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
							<Image source={asset.ok} />
						</View>
					</Image>
					<View style={{ height: 5 }} />
					<Text style={{ fontSize: 16, fontWeight: '500', color: '#49D25C' }}>{ contact.name }</Text>

				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity 
					activeOpacity={1}
					onPress={this._onSelect.bind(this, contact)}
					style={{ marginTop: marginRight, marginRight: marginRight, alignItems: 'center' }}>
					
					<Image source={{ uri: contact.photo }} style={{ backgroundColor: '#EEEEEE', height: 50, width: 50, borderRadius: 25 }} />
					<View style={{ height: 5 }} />
					<Text style={{ fontSize: 16, fontWeight: '500', color: '#666666' }}>{ contact.name }</Text>

				</TouchableOpacity>
			);
		}
	}
	_onSubmit() {
		let selected = [];
		const { friends } = this.props;
		Object.keys(friends).map(key => {
			if(friends[key].selected === true) {
				selected.push(friends[key]);
			}
		});
		this.props.resetContacts();
		this.props.pickContacts(selected);
		this.props.navigator.pop();
	}
	render() {
		let count = 0;
		const { friends } = this.props;
		Object.keys(friends).map(key => {
			if(friends[key].selected === true) {
				count = count + 1;
			}
		});
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				
				<View style={{ flex: 1, margin: 10, backgroundColor: '#FFFFFF', borderRadius: 5 }}>

					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: marginRight }}>
						<View>
							<Text style={{ fontWeight: '500', color: '#999999', fontSize: 18 }}>目前有{friends.length}个联系人</Text>
							<Text style={{ fontWeight: '500', color: '#999999', fontSize: 18 }}>选择了{count}个人</Text>
						</View>

						<SubmitButton size={'small'} onPress={this._onSubmit.bind(this)}>选择当前{count}个人</SubmitButton>
					</View>

					<ListView 
						initialListSize={20}
						contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: marginRight }}
						dataSource={this.state.dataSource}
						renderRow={this._renderRow.bind(this)} />
				</View>

			</View>
		);
	}
}
export default connect(
	state=>({
		friends: state.friend
	}),
	dispatch=>({
		updateFriends: (friend) => dispatch(updateFriends(friend)),
		resetContacts: () => dispatch(resetContacts())
	})
)(PickContacts);