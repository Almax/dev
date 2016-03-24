import { Provider } from 'react-redux';
import store from '../redux/store';
import codePush from "react-native-code-push";
import SplashScreen from '@remobile/react-native-splashscreen';

import React, {
  AppRegistry,
  Platform,
  BackAndroid,
  Navigator
} from 'react-native';
import NavigatorSceneConfigs from '../components/NavigatorSceneConfigs'
import Splash from '../pages/Splash';

class App extends React.Component {
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
    codePush.sync();
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
    return NavigatorSceneConfigs.FloatFromBottomAndroid;
  }
  renderScene(route, navigator) {
    const Component = route.component;

    return (
      <Component {...route.params} navigator={navigator} />
    );
  }
  render() {
    return (
      <Provider store={store} key="provider">
        <Navigator
          ref={(nav) => this.navigator = nav}
          initialRoute={this.initialRoute}
          configureScene={(route) => this.configureScene(route)}
          renderScene={(route, navigator) => this.renderScene(route, navigator)} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MarryGuard_v2', () => App);