import React, {
  AppRegistry,
  View,
  Text,
  Image,
  Platform,
  BackAndroid,
  Navigator,
  ProgressViewIOS,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import asset from '../assets';
import SplashScreen from '@remobile/react-native-splashscreen';
import NavigatorSceneConfigs from '../components/NavigatorSceneConfigs'
import Splash from '../pages/Splash';
import Feedback from '../pages/FeedBack';
const { height, width } = Dimensions.get('window');
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: null,
      showModal: false,
    }
  }
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentDidMount() {
    // this.navigator.navigationContext.addListener('willfocus', (event) => {
    //   if(event.currentTarget.currentRoute.__navigatorRouteID === 0) {
    //     this.setState({ showTabBar: false });
    //   } else {
    //     this.state.showTabBar === false ? this.setState({ showTabBar: true }) : null;
    //   }
    // })
    SplashScreen.hide();
  }
  onBackAndroid = () => {
    const nav = this.navigator;
    const routers = nav.getCurrentRoutes();
    if (routers.length > 1) {
      nav.pop();
      return true;
    }
    return false;
  };
  initialRoute = {
    component: Splash,
  };
  configureScene(route) {
    if(route.scene) {
      return route.scene;
    }
    if (Platform.OS === 'ios') {
      return NavigatorSceneConfigs.PushFromRight;
    }
    return NavigatorSceneConfigs.PushFromRight;
  }
  renderScene(route, navigator) {
    const Component = route.component;
    return (
      <Component {...route.params} navigator={navigator} />
    );
  }
  _renderNavBar() {
    let _this = this;
    const styles = {
      title: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
      },
      button: {
        flex: 1, width: 50, alignItems: 'center', justifyContent: 'center'
      },
      buttonText: {
        fontSize: 18, color: '#FFFFFF', fontWeight: '400'
      }
    }

    var routeMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0) {
          return (
            <TouchableOpacity 
              onPress={() => navigator.pop()}
              style={styles.button}>
              <Text style={styles.buttonText}>返回</Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity 
              onPress={() => _this.setState({ showModal: true })}
              style={styles.button}>
              <Image source={asset.menu} />
            </TouchableOpacity>
          );
        }
      },
      RightButton(route, navigator, index, navState) {
        if(index > 0 && route.rightButton) {
          return (
            <TouchableOpacity 
              onPress={() => navigator.pop()}
              style={styles.button}>
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
          );
        } else {
          return null
        }

      },
      Title(route, navigator, index, navState) {
        return (
          <View style={styles.title}>
            <Text style={styles.buttonText}>{route.title}</Text>
          </View>
        );
      }
    };  

    return (
      <Navigator.NavigationBar
        style={{
          alignItems: 'center',
          backgroundColor: '#F06199',
          shadowOffset:{
              width: 1,
              height: 0.5,
          },
          shadowColor: '#F06199',
          shadowOpacity: 0.8,          
          }}
        routeMapper={routeMapper}
      />
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          ref={(nav) => { this.navigator = nav;global.nav = nav;} }
          initialRoute={this.initialRoute}
          configureScene={(route) => this.configureScene(route)}
          renderScene={(route, navigator) => this.renderScene(route, navigator)}
          sceneStyle={{paddingTop: (Platform.OS === 'android' ? 56 : 64)}}
          navigationBar={this._renderNavBar()} />

        { this.state.showModal ? 
          <View style={styles.modal}>

            <TouchableOpacity style={styles.icon}>
              <Image source={asset.i_37} />
              <Text style={styles.iconText}>扫二维码</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={
                () =>  {
                  this.setState({ showModal: false });
                  this.navigator.push({ title: '吐槽产品', component: Feedback});
                } 
              } 
              style={styles.icon}>
              <Image source={asset.i_46} />
              <Text style={styles.iconText}>吐槽产品</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({ showModal: false })} style={styles.icon}>
              <Text style={styles.pureText}>关闭</Text>
            </TouchableOpacity>

          </View>
          : 
          null
        }
      </View>
    );
  }
}
const styles = {
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 120,
  },
  icon: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
    color: '#9A804A',
  },
  pureText: {
    fontSize: 14,
    color: '#9A804A',
  }
}
export default Navigation;