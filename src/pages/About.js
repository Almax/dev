import React, {
  View,
  Text
} from 'react-native';
import { BackStep } from '../components/View';
class About extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', margin: 10, padding: 10, borderRadius: 5 }}>

        <View style={{ marginTop: 20 }}/>
        <Text style={{ fontSize: 18, color: '#999999' }}>关于我们</Text>
        <View style={{ marginTop: 10 }}/>
        <Text style={{ fontSize: 16, color: '#666666' }}>一个让结婚更简单的团队~</Text>

        <View style={{ marginTop: 20 }}/>
        <Text style={{ fontSize: 18, color: '#999999' }}>婚格</Text>
        <View style={{ marginTop: 10 }}/>
        <Text style={{ fontSize: 16, color: '#666666' }}>一个让结婚更简单的APP~ 帮助新人办一场省心的婚礼</Text>

        <View style={{ marginTop: 20 }}/>
        <Text  style={{ fontSize: 18, color: '#999999' }}>联系我们</Text>
        <View style={{ marginTop: 10 }}/>
        <Text style={{ fontSize: 16, color: '#666666' }}>hi@marrynovo.com</Text>

        <View style={{ marginTop: 20 }}/>
        <Text  style={{ fontSize: 18, color: '#999999' }}>软件版本</Text>
        <View style={{ marginTop: 10 }}/>
        <Text style={{ fontSize: 16, color: '#666666' }}>v1.1.0</Text>

        </View>
      </View>
    );
  }
}
export default About;