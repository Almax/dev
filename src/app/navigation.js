import React, {
  AppRegistry,
  StatusBar,
  View,
  Text,
  Platform,
  BackAndroid,
  Navigator,
  ProgressViewIOS,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import SplashScreen from '@remobile/react-native-splashscreen';
import NavigatorSceneConfigs from '../components/NavigatorSceneConfigs'
import Splash from '../pages/Splash';
const { height, width } = Dimensions.get('window');
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: null,
      showTabBar: false,
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
    this.navigator.navigationContext.addListener('willfocus', (event) => {
      if(event.currentTarget.currentRoute.__navigatorRouteID === 0) {
        this.setState({ showTabBar: false });
      } else {
        this.state.showTabBar === false ? this.setState({ showTabBar: true }) : null;
      }
    })

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
          return null
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
          backgroundColor: '#F06199'
        }}
        routeMapper={routeMapper}
      />
    );
  }
  _renderTitle() {
    const styles = {
      button: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
      },
      buttonText: {
        fontSize: 18, color: '#FFFFFF', fontWeight: '400'
      }
    }

    var routeMapper = {
      LeftButton(route, navigator, index, navState) {
        return null;
      },
      RightButton(route, navigator, index, navState) {
        return null;
      },
      Title(route, navigator, index, navState) {
        return (
          <View style={styles.button}>
            <Text style={styles.buttonText}>婚格</Text>
          </View>
        );
      }
    };  

    return (
      <Navigator.NavigationBar
        style={{
          alignItems: 'center',
          backgroundColor: '#F06199'
        }}
        routeMapper={routeMapper}
      />
    );
  }
  render() {
    if(this.state.showTabBar) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar
            translucent={true}
            backgroundColor="rgba(0,0,0,0)"
            barStyle="light-content" />
          <Navigator
            ref={(nav) => this.navigator = nav}
            initialRoute={this.initialRoute}
            configureScene={(route) => this.configureScene(route)}
            renderScene={(route, navigator) => this.renderScene(route, navigator)}
            sceneStyle={{paddingTop: (Platform.OS === 'android' ? 56 : 64)}}
            navigationBar={this._renderNavBar()} />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar
            translucent={true}
            backgroundColor="rgba(0,0,0,0)"
            barStyle="light-content" />
          <Navigator
            ref={(nav) => this.navigator = nav}
            initialRoute={this.initialRoute}
            configureScene={(route) => this.configureScene(route)}
            renderScene={(route, navigator) => this.renderScene(route, navigator)}
            sceneStyle={{paddingTop: (Platform.OS === 'android' ? 56 : 64)}}
            navigationBar={this._renderTitle()}
            />
        </View>
      );
    }

  }
}

export default Navigation;