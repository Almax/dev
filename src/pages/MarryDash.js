import React, {
	ListView,
	TouchableOpacity,
	View,
	Image,
	Text,
	Dimensions,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import TimeAgo from 'react-native-timeago';
import Catalog from '../components/View/Catalog';
import { 
  Line, 
  Caption, 
  Subtitle, 
  Title, 
  Detail, 
  PureText, 
  MemberHeader, 
  PhotoPreview, 
  HorizontalLayout,
  ButtonGroup
} from '../components/View';
import TodoAction from './TodoAction';
const { width } = Dimensions.get('window');
import asset from '../assets';
class User extends React.Component {
	render() {
		const { user } = this.props;
		return (
			<View style={{ alignItems: 'center' }}>
				<Image source={{ uri: user.photo }} style={{ borderWidth: 2, borderColor: '#FFFFFF', height: 50, width: 50, borderRadius: 25 }} />
			</View>
		);
	}
}
class MarryDash extends React.Component {
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({ rowHasChanged: (r1,r2)=>r1!==r2 })
		this.state = {
			dataSource
		};
	}
	componentDidMount() {
		let targetTask = [];
		const { task, marry } = this.props;
		const { users } = marry;
		for(key in task) {
			if(task[key].master.uid === users[0].uid || task[key].master.uid === users[1].uid) {
				targetTask.push(task[key]);
			}
		}
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(targetTask)
		})
	}
  _renderTodo(row, sectionId, rowId) {
  	return (
  		<View style={styles.row}>

        <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 20, paddingHorizontal: 10, borderRadius: 5 }}>

          <View style={{ flexDirection: 'row', marginTop: -10, alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: row.master.photo }} style={{ height: 40, width: 40, borderRadius: 20 }} />
              <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: '#666666' }}>{row.master.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <TimeAgo time={row.created_at} style={{ fontSize: 12, color: '#769AE4' }} />
                </View>
              </View>
            </View>
            <Catalog id={row.catalog_id} />
          </View>

          <Title onPress={() => 
              this.props.navigator.push({ 
                component: TodoAction, 
                params: {
                  todo: row,
                  index: rowId 
                } 
              })}>
            {row.task_name}
          </Title>
        
          { row.task_detail ?  
              <TouchableOpacity onPress={() => 
                this.props.navigator.push({ 
                  component: TodoAction, 
                  params: {
                    todo: row,
                    index: rowId 
                  } 
                })} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Image source={asset.taskDesc} />
                <View style={{ flex: 1, marginHorizontal: 5, flexWrap: 'wrap' }}>
                  <Text style={{ fontSize: 16, color: '#666666' }}>{row.task_detail}</Text> 
                </View>
              </TouchableOpacity>
              : 
              null 
          }

          <View style={{ flexDirection: 'row', justifyContent:'flex-end' }}>
          <View style={{ backgroundColor: '#F4F4F4', padding: 10, borderRadius: 5 }}>
            <Text style={{fontSize: 12, color: '#666666', fontWeight: '300'}}>
              截止 {row.end_date ? moment(row.end_date).format("YYYY.MM.DD") : "未设置"}
            </Text>
          </View>
          </View>

          <Line color={"#EEEEEE"} />

          { row.users.length &&
            (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                { Object.keys(row.users).map((key) => <MemberHeader key={"_"+key} headimg={{ uri: row.users[key].photo }} name={row.users[key].name} /> ) }
              </View>
            </View>
            )
          }
        </View>
        
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
        {
          row.status ?
          <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center', }}>
            <Image source={asset.work_done} style={{ height: 50 }} resizeMode={"contain"} />
          </TouchableOpacity>
           : 
          <TouchableOpacity activeOpacity={0.8} style={{  alignItems: 'center' }}>
            <Image source={asset.work_in_progress} style={{ height: 50 }} resizeMode={"contain"} />
          </TouchableOpacity>
        }
        </View>

  		</View>
  	)
  }
	render() {
		const { marry } = this.props;
		const { marry_date, marry_name, marry_hotel_address, marry_hotel_name, users } = marry;
		if(users.length < 2) {
			return null;
		}
		return (
			<View style={styles.container}>
				<ListView
          renderHeader={() => (
              <Image source={asset.cardInfo} style={styles.card}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <User user={users[0]} />
                    <User user={users[1]} />
                  </View>
                  <Text style={{fontWeight: '500', color: '#9A804A'}}>{users[0].name} & {users[1].name}的婚礼</Text>
                </View>
                <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', justifyContent: 'space-around' }}>
                  <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={asset.wish} />
                  </TouchableOpacity>
                </View>
                <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1, flexWrap: 'wrap' }}>
                    <Text style={{ color: '#9A804A', fontSize: 14, }}>婚礼{moment(marry_date).format('YYYY年MM月DD日 h:mm')}开始</Text>
                    <Text style={{ color: '#9A804A', fontSize: 14, }}>{marry_hotel_address} {marry_hotel_name}</Text>
                  </View>
                  <View style={{ width: 60, alignItems: 'center' }}>
                    <Text style={{ fontSize: 36, fontWeight: '600', color: '#E6E4C0' }}>80</Text>
                    <Text style={{ fontSize: 14, color: '#E6E4C0' }}>来宾人数</Text>
                  </View>
                </View>
              </Image>
            )
          }
				  dataSource={this.state.dataSource}
				  renderRow={this._renderTodo.bind(this)} />
				

			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EFEFEF',
	},
	card: {
		marginTop: 10,
		padding: 10,
		height: 260,
		backgroundColor: 'rgba(0,0,0,0.3)',
		flexWrap: 'wrap',
		marginHorizontal: 10,
		width: width - 20,
		borderWidth: 1,
		borderColor: '#E6E4C0',
		borderRadius: 10,
	},
  row: { 
    flex: 1, 
    width: width - 20,  
    backgroundColor: '#EFEFEF',
    paddingBottom: 5,
    marginHorizontal: 10,
    paddingTop: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',

  }
})
export default connect(
	state=>({
		task: state.task
	})
)(MarryDash);