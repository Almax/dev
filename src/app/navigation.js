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
import { connect } from 'react-redux';
import SplashScreen from '@remobile/react-native-splashscreen';
import NavigatorSceneConfigs from '../components/NavigatorSceneConfigs'
import Splash from '../pages/Splash';
import Feedback from '../pages/FeedBack';
//import QRScan from '../pages/QRScan';
const { height, width } = Dimensions.get('window');
import Swiper from 'react-native-swiper2';
import { loadUser } from '../redux/modules/session';
const swiperStyles = {
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#36C89F',
  },
  titleWrap: {
    marginTop: 60,
    alignItems: 'center'
  },
  title: {
    fontSize: 19,
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 20,
  },
  photo: {
    flex: 1,
    width: width-40
  },
};

class Step extends React.Component {
  _enter() {
    const { onPress } = this.props;
    onPress();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
        <Swiper
          index={0}
          loop={false}
          dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          activeDot={<View style={{backgroundColor: '#36C89F', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          height={height}
          pagingEnabled={true}
          showsButtons={false} 
          showsPagination={true} 
          bounces={true}>
          
          <View style={swiperStyles.page}>
            <View style={swiperStyles.titleWrap}>
              <Text style={swiperStyles.title}>理清结婚思路从未如此简单</Text>
              <Text style={swiperStyles.title}>只需三分钟</Text>
              <Text style={swiperStyles.subtitle}>手把手理清结婚思路</Text>
            </View>
            <Image source={asset.step_1} style={swiperStyles.photo} resizeMode="stretch" />
          </View>

          <View style={swiperStyles.page}>
            <View style={swiperStyles.titleWrap}>
              <Text style={swiperStyles.title}>想有人来帮忙一起筹备婚礼？</Text>
              <Text style={swiperStyles.title}>一键召唤基友，闺蜜</Text>
              <Text style={swiperStyles.subtitle}></Text>
            </View>
            <Image source={asset.step_2} style={swiperStyles.photo} resizeMode="stretch" />
          </View>

          <View style={swiperStyles.page}>
            <View style={swiperStyles.titleWrap}>
              <Text style={swiperStyles.title}>两个人的婚礼，两个人的回忆</Text>
              <Text style={swiperStyles.title}>开启照片共享模式</Text>
              <Text style={swiperStyles.subtitle}>支持批量上传</Text>
            </View>
            <Image source={asset.step_3} style={swiperStyles.photo} resizeMode="stretch" />
          </View>


          <View style={swiperStyles.page}>
            <View style={swiperStyles.titleWrap}>
              <Text style={swiperStyles.title}>官方《新娘小课堂》</Text>
              <Text style={swiperStyles.title}>简单、轻松的筹备小知识</Text>
              <Text style={swiperStyles.subtitle}></Text>
            </View>
            <Image source={asset.step_4} style={swiperStyles.photo} resizeMode="stretch" />
          </View>

          <View style={swiperStyles.page}>
            <View style={swiperStyles.titleWrap}>
              <Text style={swiperStyles.title}>官方《婚格物语》婚礼绘本</Text>
              <Text style={swiperStyles.title}>开始预售</Text>
              <Text style={swiperStyles.subtitle}>婚礼筹备DIY绘本</Text>
            </View>
            <Image source={asset.step_5} style={swiperStyles.photo} resizeMode="stretch" />
          </View>
        
        </Swiper>

        <View style={{ position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}> 
          <TouchableOpacity onPress={this._enter.bind(this)} style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 10, paddingHorizontal: 50, borderRadius: 5 }}>
            <Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: '500' }}>进入</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: null,
      showModal: false,
      showSwiper: true,
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
    this.props.loadSession();
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
        flex: 1, width: 40, alignItems: 'center', justifyContent: 'center'
      },
      buttonText: {
        fontSize: 18, color: '#FFFFFF', fontWeight: '100'
      }
    }

    var routeMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0) {
          return (
            <TouchableOpacity 
              onPress={() => {
                  if(global.webview && global.webViewState) {
                    if(global.webViewState.canGoBack) {
                      global.webview.goBack();
                    } else {
                      navigator.pop();
                    }
                  } else {
                    navigator.pop();
                  }
                }
              }
              style={styles.button}>
              <Image source={asset.backButton} style={{ height:20}} resizeMode={'contain'} />
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity 
              onPress={() => _this.setState({ showModal: true })}
              style={styles.button}>
              <Image source={asset.menuButton} style={{ height:15 }} resizeMode={'contain'} />
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
    if(this.state.showSwiper) {
      return <Step onPress={() => this.setState({ showSwiper: false })} />;
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          <Navigator
            ref={(nav) => { this.navigator = nav;global.nav = nav;} }
            initialRoute={this.initialRoute}
            configureScene={(route) => this.configureScene(route)}
            renderScene={(route, navigator) => this.renderScene(route, navigator)}
            sceneStyle={{paddingTop: (Platform.OS === 'android' ? 56 : 64)}}
            navigationBar={this._renderNavBar()} />

          { this.state.showModal ? 
            <View style={styles.modal}>
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
  },
}

export default connect(
  state => ({ 
    user: state.session
  }), 
  dispatch => ({
    loadSession: () => dispatch(loadUser())
  })
)(Navigation);

