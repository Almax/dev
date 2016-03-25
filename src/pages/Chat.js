import React, {
	View,
	Text,
	Image,
	ListView,
	RefreshControl,
	TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux';
import styles from '../styles';
import asset from '../assets';
import { BackStep } from '../components/View';
import { load, pass } from '../redux/modules/message';
import { loadUser } from '../redux/modules/session';
import Loading from './Loading';
class Chat extends React.Component {
	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1!==r2 });
		this.state = {
			objects: [],
			dataSource,
			isRefreshing: false,
		}
	}
	componentDidMount() {
		const { message } = this.props;
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(message)
		});
		this.setInterval(() => {
			this.props.loadMessage();
		}, 10000);
	}
	componentWillReceiveProps(nextProps) {
		const { message } = nextProps;
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(message)
		});
	}
  setInterval() {
    this.intervals.map(clearInterval);
    this.intervals.push(setInterval.apply(null, arguments));
  }
  clearInterval() {
  	this.intervals.map(clearInterval);
  }
  componentWillMount() {
    this.intervals = [];
  }
	componentWillUnmount() {
		this.clearInterval()
	}
	_passRequest(invitation) {
		this.props.pass(invitation.id);
		this.props.loadSession();
	}
	_onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
     	this.props.loadSession();
      this.setState({
        isRefreshing: false
      })
    }, 2000);
	}
	renderRow(row, sectionId, rowId) {
		const { fromUser, toUser } = row;

		if(this.props.me.id === fromUser.id) {
			return (
				<View style={{ backgroundColor: '#FFFFFF', marginBottom: 1, flexDirection: 'row' }}>
					<Image source={{ uri: toUser.photo }} style={{ height: 50, width: 50, borderRadius: 25, margin: 10, }} />
						
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<TouchableOpacity style={{ flex: 1, height: 70, justifyContent: 'center' }}>
							<Text style={{ fontSize: 18, color: '#666666', fontWeight: '500' }}>{toUser.name}</Text>
							<View style={{ height: 10, }} />
							<Text style={{ fontSize: 14, color: '#999999' }}>我是{toUser.role}{toUser.name},我已经看到了你的邀请</Text>
						</TouchableOpacity>

						<View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', height: 70, width: 80 }}>
							
							{ row.pass ? 
								<TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 5 }}>
									<Text style={{ fontSize: 14, color: '#999999' }}>已通过</Text>
								</TouchableOpacity>
								: 
								<TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 5 }}>
									<Text style={{ fontSize: 14, color: '#666666' }}>等待通过</Text>
								</TouchableOpacity>
							}

						</View>
					</View>

				</View>
			);
		}else if(this.props.me.id === toUser.id) {
			return (
				<View style={{ backgroundColor: '#FFFFFF', marginBottom: 1, flexDirection: 'row' }}>
					<Image source={{ uri: fromUser.photo }} style={{ height: 50, width: 50, borderRadius: 25, margin: 10, }} />
						
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<TouchableOpacity style={{ flex: 1, height: 70, justifyContent: 'center' }}>
							<Text style={{ fontSize: 18, color: '#666666', fontWeight: '500' }}>{fromUser.name}</Text>
							<View style={{ height: 10, }} />
							<Text style={{ fontSize: 14, color: '#999999' }}>我是{fromUser.role}{fromUser.name},你快加入到婚礼里来</Text>
						</TouchableOpacity>

						<View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', height: 70, width: 80 }}>
							
							{ row.pass ? 
								<TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 5 }}>
									<Text style={{ fontSize: 14, color: '#999999' }}>已加入</Text>
								</TouchableOpacity>
								: 
								<TouchableOpacity onPress={this._passRequest.bind(this, row)} style={{ backgroundColor: '#5DC01D', padding: 10, borderRadius: 5 }}>
									<Text style={{ color: '#FFFFFF' }}>通过</Text>
								</TouchableOpacity>
							}

						</View>
					</View>

				</View>
			);
		}
	}
	render() {
		const { marry, message } = this.props;
		if(typeof message === 'object') {
			return (
				<View style={[styles.container, {backgroundColor: '#EFEFEF'}]}>
					<BackStep title={"聊天"} />

					<ListView
						automaticallyAdjustContentInsets={false}
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
						refreshControl={
	            <RefreshControl
	              refreshing={this.state.isRefreshing}
	              onRefresh={this._onRefresh.bind(this)}
	              tintColor="#EEEEEE"
	              title="更新消息"
	              colors={['#F06199']}
	              progressBackgroundColor="#FFFFFF"
	            />} />
				</View>
			);
		} else {
			return (
				<View style={[styles.container, {backgroundColor: '#EFEFEF'}]}>
					<BackStep title={"聊天"} />

					<View style={{ flex: 1 }}>
						<Loading />
					</View>

				</View>
			)
		}
	}
}

export default connect(
	state=>({ marry: state.marry, me: state.session, message: state.message }),
	dispatch=>({
		pass: (id) => dispatch(pass(id)),
		loadMessage: () => dispatch(load()),
		loadSession: () => dispatch(loadUser()),
	})
)(Chat);