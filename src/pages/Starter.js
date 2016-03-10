import React, {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import LogIn from './LogIn';
import Swiper from 'react-native-swiper2';

class Starter extends React.Component {
	_enter() {
		this.props.navigator.push({ component: LogIn })
	}
	render() {
		return (
      <Swiper style={styles.wrapper} showsButtons={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>婚格 1</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>婚格 2</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>进入婚格</Text>
          <View style={{ height: 20 }}/>
          <TouchableOpacity 
          	onPress={this._enter.bind(this)}
          	style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, borderWidth: 2, borderColor: '#769AE4' }}>
          	<Text style={{ color: '#769AE4', fontSize: 18, fontWeight: '500' }}>进入</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
		)
	}
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

export default Starter;