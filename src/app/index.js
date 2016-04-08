import { Provider } from 'react-redux';
import store from '../redux/store';
import codePush from "react-native-code-push";
import SplashScreen from '@remobile/react-native-splashscreen';

import React, {
  AppRegistry,
  View,
  Text,
  Platform,
  BackAndroid,
  Navigator,
  ProgressViewIOS,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NavigatorSceneConfigs from '../components/NavigatorSceneConfigs'
import Splash from '../pages/Splash';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: null,
      finished: true,
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
  async componentDidMount() {
    // if (Platform.OS === 'ios') {
    //   codePush.sync();
    // }else if(Platform.OS === 'android') {
    if(Platform.OS === 'ios') {
      let result = await codePush.checkForUpdate();
      if(result) {
        codePush.sync({ 
           updateDialog: {
            title: "发现婚格有更新",
            optionalUpdateMessage: "小主，app更新啦~快来更新",
            optionalInstallButtonLabel: "安装",
            optionalIgnoreButtonLabel: "下次再说",
            appendReleaseDescription: true,
            descriptionPrefix: "\n\n本次更新:\n"   
           },
          installMode: codePush.InstallMode.IMMEDIATE 
        }, (status) => {
          switch (status) {
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({ finished: false });
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                Alert.alert("更新完成", "正在重启");
                break;
            case codePush.SyncStatus.SYNC_IN_PROGRESS: 
                
                break;
          }
        }, (progress) => {
          this.setState({ progress });
        });
      }
    }

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
    if(this.state.finished) {
      return (
        <Provider store={store} key="provider">
          <Navigator
            ref={(nav) => this.navigator = nav}
            initialRoute={this.initialRoute}
            configureScene={(route) => this.configureScene(route)}
            renderScene={(route, navigator) => this.renderScene(route, navigator)} />
        </Provider>
      );
    }else {
      const { progress } = this.state;
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F06199' }}>

          { 
            progress && progress.receivedBytes ? 
              <View style={{ alignItems: 'center' }}>
                

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 16, color: '#FFFFFF' }}>
                    { parseInt((progress.receivedBytes / progress.totalBytes) * 100) } %
                  </Text>
                </View>

                <View style={{ width: 200, height: 20, backgroundColor: '#EEEEEE' }}>
                  <View style={{ width: 200*(progress.receivedBytes/progress.totalBytes), height: 20, backgroundColor: '#FFFFFF' }}></View>
                </View>


                <View style={{ marginTop: 20, flexDirection: 'row' }}>
                  
                  <TouchableOpacity onPress={() => this.setState({ finished: true })}>
                    <Text style={{ fontSize: 16, color: '#FFFFFF' }}>后台更新</Text>
                  </TouchableOpacity>
                  <View style={{ width: 100 }} />
                  <TouchableOpacity onPress={() => codePush.restartApp(false) }>
                    <Text style={{ fontSize: 16, color: '#FFFFFF' }}>取消</Text>
                  </TouchableOpacity>

                </View>

              </View>
            : 
              <Text style={{ fontSize: 16, color: '#FFFFFF' }}>等待更新...</Text>
          }
          
        </View>
      )
    }
  }
}

AppRegistry.registerComponent('MarryGuard_v2', () => App);