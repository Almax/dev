import React, {
	View,
	Text,
  TabBarIOS
} from 'react-native'
import { connect } from 'react-redux';
import asset from '../assets';
import Loading from './Loading';
import Home from './Home';
import Schedule from './Schedule';
import Add from './Add';
import Chat from './Chat';
import More from './More';
import FindPartner from './FindPartner';
class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "home",
      badge: 0,
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.marry === null) {
      this.props.navigator.push({
        component: FindPartner
      })
    } else {
      if(nextProps.message && nextProps.invitation) {
        let { invitation, message } = nextProps;
        if(message && message.length && message[0].pass === false) {
          this.setState({
            badge: invitation.length+1
          });
        } else {
          this.setState({
            badge: invitation.length
          });
        }
      }
    }
  }
	render() {
    const { navigator } = this.props;
    if(this.props.marry === 'initial state') {
      return (
        <Loading />
      )
    }else {
      const { chat } = this.props;
      return (
        <TabBarIOS
          tintColor="#F06199"
          barTintColor="#FEFEFE">

          <TabBarIOS.Item
            title="首页"
            icon={ asset.home }
            selected={this.state.selectedTab === 'home'}
            onPress={() => {
              this.setState({
                selectedTab: 'home',
              });
            }}>
            <Home navigator={navigator} />
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="待办"
            icon={ asset.task }
            selected={this.state.selectedTab === 'task'}
            onPress={() => {
              this.setState({
                selectedTab: 'task',
              });
            }}>
            <Schedule navigator={navigator} />
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title=""
            icon={ asset.write }
            selected={this.state.selectedTab === 'write'}
            onPress={() => {
              this.setState({
                selectedTab: 'write',
              });
            }}>
            <Add navigator={navigator} />
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="联系人"
            badge={this.state.badge > 0 ? this.state.badge : null }
            icon={ asset.chat }
            selected={this.state.selectedTab === 'chat'}
            onPress={() => {
              this.setState({
                selectedTab: 'chat',
              });
            }}>
            <Chat navigator={navigator} unread={this.state.badge} />
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="更多"
            icon={ asset.more }
            selected={this.state.selectedTab === 'more'}
            onPress={() => {
              this.setState({
                selectedTab: 'more',
              });
            }}>
            <More navigator={navigator} />
          </TabBarIOS.Item>

        </TabBarIOS>
      )
    }
	}
}

export default connect(
  state => ({ 
    marry: state.marry,
    message: state.message,
    invitation: state.invitation,
  }),
  dispatch => ({
    
  })
)(Navigator)