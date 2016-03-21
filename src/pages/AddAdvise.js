import React, {
	ListView,
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';
import MenuList from '../components/View/MenuList';
import { FormRow, PureButton, SoftInput } from '../components/Form';
import { BackStep } from '../components/View';
import data from './mock.json';
import { colors } from '../styles';
import AddDate from './AddDate';

class AddAdvise extends React.Component {

	constructor(props) {
		super(props)

		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})

		this.state = {
			dataSource,
      text: "",
		}
	}

	componentDidMount() {
		const { task } = data;
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(task)
		})
	}

	select(task) {
		const { getResult } = this.props;
		getResult(task);
		this.props.navigator.pop();
	}

	renderRow(row, sid, rid) {
		return (
			<TouchableOpacity onPress={this.select.bind(this, row.task)} activeOpacity={0.7} style={styles.row}>
				<Text style={styles.text}>{rid+1}. {row.task}</Text>
			</TouchableOpacity>
		)
	}
  
  _onScroll(offset) {
    
  }
  
  _onSubmit() {
    const { getResult } = this.props;
		getResult(this.state.text);
		this.props.navigator.pop();
  }
  
  _renderHeader() {
    return (
      <View style={{ backgroundColor: '#FFFFFF',  paddingVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
         <View style={{ padding: 10,  borderRadius: 5, backgroundColor: '#EFEFEF',  }}>
         <Text style={{ fontSize: 14, fontWeight: '500' }}>从下面选择来快速创建任务</Text>
          </View>
      </View>
    )
  }

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<BackStep navigator={this.props.navigator} />
        
        <FormRow style={{ backgroundColor: '#FFFFFF', paddingLeft: 10 }}>
          <SoftInput 
            placeholder={"输入一个任务名称"}
            onChangeText={(text) => this.setState({ text })}
            scroll={this._onScroll} />
            
          <PureButton onPress={this._onSubmit.bind(this)} size={"small"}>添加</PureButton>
        </FormRow>
        
				<ListView
					dataSource={this.state.dataSource}
          renderHeader={this._renderHeader.bind(this)}
					renderRow={this.renderRow.bind(this)} />
          
        
          
			</View>
		)
	}
}

const styles = StyleSheet.create({
	row: {
		padding: 20, justifyContent: 'center', backgroundColor: '#FFFFFF', marginBottom: 1
	},
	text: {
		fontSize: 16, fontWeight: '500', color: '#666666', lineHeight: 20
	}
})

export default AddAdvise;