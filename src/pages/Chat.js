import React, {
	View,
	Text,
	ListView,
	RefreshControl,
	TouchableOpacity,
} from 'react-native';
import Image from '../components/Image';
import { connect } from 'react-redux';
import styles from '../styles';
import asset from '../assets';
import { BackStep } from '../components/View';
import { load, pass } from '../redux/modules/message';
import { loadUser } from '../redux/modules/session';
import Loading from './Loading';
import ChatMenu from '../components/ChatMenu';
import ChatPage from './ChatPage';
import ChatContact from './ChatContact';
import ChatMessage from './ChatMessage';
import AlphabetListView from 'react-native-alphabetlistview';
import { toPY } from '../utils/lib';
import { loadFriends } from '../redux/modules/friend';
class SectionHeader extends React.Component {
  render() {
    var textStyle = {
      textAlign:'center',
      color:'#666666',
      fontWeight:'700',
      fontSize: 16
    };
    var viewStyle = {
      backgroundColor: '#EFEFEF',
      height: 30,
      paddingHorizontal: 20,
      alignItems: 'flex-start',
      justifyContent: 'center'
    };
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{this.props.title}</Text>
      </View>
    );
  }
}
class SectionItem extends React.Component {
  render() {
    return (
      <Text style={{color:'#111111', fontSize: 15 }}>{this.props.title}</Text>
    );
  }
}
class Cell extends React.Component {
  _chatWith(user) {
    nav.push({
      title: '联系方式',
      component: ChatPage,
      params: {
        object: user
      }
    })
  }
  render() {
  	const user = this.props.item;
    return (
      <TouchableOpacity 
        onPress={this._chatWith.bind(this, user)}
        style={{ backgroundColor: '#FFFFFF', marginTop: 1, flexDirection: 'row', height:50, alignItems: 'center'}}>
      		
      	{ 
      		user.photo ? 
      		<Image source={{ uri: `${user.photo}?imageView2/1/w/80/h/80` }} style={{ margin: 5, height: 40, width: 40 }} />
      		:  
      		<View style={{ alignItems: 'center', justifyContent: 'center', margin: 5, height: 40, width: 40, backgroundColor: '#F06199' }}>
      			<Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: '500' }}>{ user.name ? user.name.substr(0, 1) : '匿' }</Text>
      		</View>
      	}
        
        <Text style={{ fontSize: 18, fontWeight: '500', color: '#666666' }}>{user.name}</Text>
      </TouchableOpacity>
    );
  }
}

class Chat extends React.Component {
	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1!==r2 });
		var chats = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1!==r2 });
		this.state = {
			badge: 0,
      contacts: [],
      isRefreshing: false,
		}

		this.contacts = this.getInitial();
	}
	getInitial() {
		return {
			'*': [],
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: [],
      K: [],
      L: [],
      M: [],
      N: [],
      O: [],
      P: [],
      Q: [],
      R: [],
      S: [],
      T: [],
      U: [],
      V: [],
      W: [],
      X: [],
      Y: [],
      Z: [],			
		};
	}
	async componentDidMount() {
  	try {
	  	const { friend } = this.props;
	  	Object.keys(friend).map((key) => {
	  		let charater = '';

	  		if(friend[key].name === null || friend[key].name === '') {
	  			this.contacts['*'].push(friend[key]);
	  			return ;
	  		}

        let s = friend[key].name.charAt(0);
        if(/[a-zA-Z0-9]+/.test(s)) {
        	charater = s.substr(0);
        	if(typeof this.contacts[charater] === 'undefined') {
        		this.contacts['*'].push(friend[key]);
        	} else {
        		this.contacts[charater].push(friend[key]);
        	}
        } else {
        	charater = toPY(s);
        	this.contacts[charater.acronym.toUpperCase()].push(friend[key]);
        }
	  	});
	  	this.setState({
	  		contacts: this.contacts
	  	});
  	} catch(e) {
  		console.warn('error:', e);
  	}
	}
	componentWillReceiveProps(nextProps) {
  	try {
  		this.contacts = this.getInitial();
	  	const { friend } = nextProps;
	  	Object.keys(friend).map((key) => {
	  		let charater = '';
        let s = friend[key].name.charAt(0);
        if(/[a-zA-Z0-9]+/.test(s)) {
        	charater = s.substr(0);
        	if(typeof this.contacts[charater] === 'undefined') {
        		this.contacts['*'].push(friend[key]);
        	} else {
        		this.contacts[charater].push(friend[key]);
        	}
        } else {
        	charater = toPY(s);
        	this.contacts[charater.acronym.toUpperCase()].push(friend[key]);
        }
      });
  	} catch(e) {
  		console.warn('error:', e);
  	}
	}
	_addContacts() {
		this.props.navigator.push({
			component: ChatContact
		})
	}
	_onMenuPress(id) {
		const { navigator } = this.props;
		switch(id) {
			case 2: {
				navigator.push({
					title: '添加好友',
					component: ChatContact
				});
				break;
			}
			case 3: {
				this.props.navigator.push({
					title: '通知消息',
					component: ChatMessage
				})
				break;
			}
		}
	}
	_onRefresh() {
		this.setState({ isRefreshing: true });
		setTimeout(() => {
			this.props.loadFriends();
			this.setState({ isRefreshing: false });
		}, 2000);
	}
	render() {
		const { marry, message, unread } = this.props;
		if(typeof message === 'object') {
			return (
				<View style={[styles.container, {backgroundColor: '#EFEFEF'}]}>
					<ChatMenu 
						unread={unread > 0 ? unread : null}
						onPress={this._onMenuPress.bind(this)} 
						navigator={this.props.navigator} />
		      <AlphabetListView
		        data={this.state.contacts}
		        cell={Cell}
		        cellHeight={50}
		        sectionListItem={SectionItem}
		        sectionHeader={SectionHeader}
		        sectionHeaderHeight={30}
		        sectionListStyle={{ width: 30 }}
		        onCellSelect={() => console.warn('selected')}
		        refreshControl={
		          <RefreshControl
		            refreshing={this.state.isRefreshing}
		            onRefresh={this._onRefresh.bind(this)}
                tintColor="#EEEEEE"
                title="更新联系人"
                colors={['#F06199']}
                progressBackgroundColor="#FFFFFF"
		          />
		        }
		      />

				</View>
			);
		} else {
			return (
				<View style={[styles.container, {backgroundColor: '#EFEFEF'}]}>
					<View style={{ flex: 1 }}>
						<Loading />
					</View>
				</View>
			)
		}
	}
}



export default connect(
	state=>({
		friend: state.friend,
		marry: state.marry, 
		me: state.session, 
		message: state.message,
		invitation: state.invitation 
	}),
	dispatch=>({
		loadMessage: () => dispatch(load()),
		loadSession: () => dispatch(loadUser()),
		loadFriends: () => dispatch(loadFriends()),
	})
)(Chat);