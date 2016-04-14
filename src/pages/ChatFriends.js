import React, {
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native';
import AlphabetListView from 'react-native-alphabetlistview';
import { connect } from 'react-redux';
import pinyin from 'pinyin';
import { toPY } from '../utils/lib';
import { listFriends } from '../utils/chat';
import ChatPage from './ChatPage';
class SectionHeader extends React.Component {
  render() {
    var textStyle = {
      textAlign:'center',
      color:'#fff',
      fontWeight:'700',
      fontSize: 18
    };

    var viewStyle = {
      backgroundColor: '#CCCCCC',
      paddingVertical: 5,
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
      <Text style={{color:'#F06199', fontSize: 16, fontWeight: '500'}}>{this.props.title}</Text>
    );
  }
}
class Cell extends React.Component {
  _chatWith(user) {
    nav.push({
      title: '聊天',
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
        style={{ flexDirection: 'row', height:70, alignItems: 'center'}}>
      	<Image source={{ uri: user.photo }} style={{ margin: 10, height: 50, width: 50 }} />
        <Text style={{ fontSize: 18, fontWeight: '500', color: '#666666' }}>{user.name}</Text>
      </TouchableOpacity>
    );
  }
}

class ChatFriends extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      contacts: {
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
      }
    };
  }
  async componentDidMount() {
  	try {
	  	const { friend } = this.props;
	  	Object.keys(friend).map((key) => {
        let s = friend[key].name.charAt(0);
	  		let charater = toPY(s);
	  		this.state.contacts[charater.acronym.toUpperCase()].push(friend[key]);
	  	});
	  	this.setState({
	  		contacts: this.state.contacts
	  	});
  	} catch(e) {
  		console.warn('error:', e);
  	}
  }
  render() {
    return (
      <AlphabetListView
        data={this.state.contacts}
        cell={Cell}
        cellHeight={70}
        sectionListItem={SectionItem}
        sectionHeader={SectionHeader}
        sectionHeaderHeight={22}
        onCellSelect={() => console.warn('selected')}
      />
    );
  }
}

export default connect(
	state=>({ user: state.session, friend: state.friend })
)(ChatFriends);