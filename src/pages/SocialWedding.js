import React, {
	ListView,
	TouchableOpacity,
	View,
	Text,
	Image,
	Dimensions,
	StyleSheet,
} from 'react-native';
import asset from '../assets';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import moment from 'moment';
import MarryDash from './MarryDash';
class User extends React.Component {
	render() {
		const { user } = this.props;
		return (
			<View style={{ alignItems: 'center' }}>
				<Image source={{ uri: `${user.photo}?imageView2/1/w/100/h/100` }} style={{ borderWidth: 2, borderColor: '#FFFFFF', height: 50, width: 50, borderRadius: 25 }} />
			</View>
		);
	}
}
class SocialWedding extends React.Component {
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1!==r2 });
		this.state = {
			dataSource: dataSource,
			friends: []
		};
		this.renderCounter = 0;
	}
	componentDidMount() {
		if(this.props.friend.length) {
			let friends = this.props.friend;
			let renders = [];
			for(key in friends) {
				if(friends[key].marry == null) {
					break;
				}
				const { marry_date, marry_name, users } = friends[key].marry;
				if(users.length < 2) {
					break;
				}

				if(users[0].uid === this.props.me.uid|| users[1].uid === this.props.me.uid) {
					break;
				}
				renders.push(friends[key]);
			}

			this.setState({
				friends,
				dataSource: this.state.dataSource.cloneWithRows(renders)
			});
		}
	}
	componentWillReceiveProps(nextProps) {

		if(nextProps.friend.length) {
			let friends = nextProps.friend;
			let renders = [];
			for(key in friends) {
				if(friends[key].marry == null) {
					break;
				}
				const { marry_date, marry_name, users } = friends[key].marry;
				if(users.length < 2) {
					break;
				}

				if(users[0].uid === this.props.me.uid|| users[1].uid === this.props.me.uid) {
					break;
				}
				renders.push(friends[key]);
			}

			this.setState({
				friends,
				dataSource: this.state.dataSource.cloneWithRows(renders)
			});
		}

		// if(nextProps.friend.length) {
		// 	let friends = nextProps.friend;
		// 	this.setState({
		// 		friends,
		// 		dataSource: this.state.dataSource.cloneWithRows(friends)
		// 	});
	}
	_goto(marry) {
		this.props.navigator.push({
			title: '参加婚礼',
			component: MarryDash,
			params: {
				marry
			}
		})
	}
	_renderMarry(friend) {
		const { marry } = friend;
		if(marry == null) {
			return null;
		}
		const { marry_date, marry_name, users } = marry;
		if(users.length < 2) {
			return null;
		}

		if(users[0].uid === this.props.me.uid|| users[1].uid === this.props.me.uid) {
			return null;
		}
		
		this.renderCounter++;

		return (
			<Image source={asset.card} style={styles.marry}>
				<TouchableOpacity onPress={this._goto.bind(this, marry)} style={styles.rowGroup}>

					<View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
						<User user={users[0]} />
						<User user={users[1]} />
					</View>

					<View style={{ backgroundColor: 'transparent', alignItems: 'center', height: 50 }}>
						<Text style={{ fontSize: 16, fontWeight: '500', color: '#9A804A' }}>{users[0].name} & {users[1].name}</Text>
						<Text style={{ fontSize: 14, color: '#9A804A' }}>{ moment(marry_date).format('YYYY-MM-DD') }</Text>
					</View>
				</TouchableOpacity>
			</Image>
		);
	}
	render() {
		const { friends } = this.state;
		if(this.state.dataSource.getRowCount() > 0) {
			return (
				<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
					<ListView
						initialListSize={6}
						contentContainerStyle={styles.row}
						dataSource={this.state.dataSource}
						renderRow={this._renderMarry.bind(this)} />
				</View>
			);
		} else {
			return (
				<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
						
					<View style={{ backgroundColor: '#FFFFFF', alignItems: 'center' }}>
						<Image source={asset.weddingTips} style={{ width: width-20, height: 80 }} resizeMode={'contain'} />
					</View>

					<View style={{ flex: 1, marginTop: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around' }}>
						<Image source={asset.weddingA} style={{ height: 200, width: (width-40)/2 }} resizeMode={'contain'} />
						<Image source={asset.weddingB} style={{ height: 200, width: (width-40)/2 }} resizeMode={'contain'} />
					</View>

				</View>
			);
		}
	}
}
const styles = StyleSheet.create({
	row: {

		flexWrap: 'wrap',
		flexDirection: 'row',
		paddingLeft: 10,
		paddingBottom: 10,
	},
	rowGroup: {
		flex: 1,
		borderRadius: 10,
	},
	marry: {
		marginTop: 10,
		borderWidth: 1,
		borderColor: '#E6E4C0',
		borderRadius: 10,
		height: 220,
		width: (width - 30)/2,
		marginRight: 10,
	},
	couple: {
		flexDirection: 'row',
	},
	user: {

	},
	avatar: {
		height: 50,
		width: 50,
		borderRadius: 25,
	}
})
export default connect(
	state=>({
		me: state.session,
		friend: state.friend
	})
)(SocialWedding);