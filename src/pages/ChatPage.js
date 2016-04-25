import React, {
  View,
  Text,
  Image,
  PixelRatio,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class ChatPage extends React.Component {
  render() {
    const { object } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ margin: 10, borderRadius: 10, backgroundColor: '#FFFFFF' }}>
        
          <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: object.photo }} style={{ width: 80, height: 80, borderRadius: 40 }} />
            <Text style={{ color: '#666666', fontSize: 18, fontWeight: '500', marginLeft: 10 }}>{object.name} ({object.nickname})</Text>
          </View>

          <View style={styles.line} />
              
          <TouchableOpacity style={styles.row}>
            <Text style={styles.key}>联系方式</Text>
            <Text style={styles.value}>{object.username}</Text>
          </TouchableOpacity>

          <View style={styles.line} />

          <TouchableOpacity style={styles.row}>
            <Text style={styles.key}>签名</Text>
            <Text style={styles.value}>{object.signature}</Text>
          </TouchableOpacity>
        
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },  
  line: {
    marginHorizontal: 10,
    backgroundColor: '#EEEEEE',
    height: 1/PixelRatio.get(),
  },
  key: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999999',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
});
export default ChatPage;