import React,{
  ListView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  PixelRatio,
  InteractionManager,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import moment from 'moment'
import TimeAgo from 'react-native-timeago';
import { connect } from 'react-redux'
import { init, update } from '../redux/modules/task';
import asset from '../assets';
import styles from '../styles';
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

import { PureButton, HideButton } from '../components/Form';
import TodoAction from './TodoAction';
import TodoImport from './TodoImport';
import TodoMember from './TodoMember';
import Loading from './Loading';

class Todo extends React.Component {

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2 });
    this.refCache = [];
    this.state = {
      isRefreshing: false,
      loaded: false,
      dataSource: dataSource
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if(this.props.task === 'initial state') {
        this.props.init();
      }else {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this._filter(this.props.task)),
          loaded: true,
        });
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.task !== this.props.task) {
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this._filter(nextProps.task)),
          loaded: true,
        });
      });
    }
  }
  _filter(todos) {
    if(typeof todos !== 'object') {
      return [];
    }

    if(typeof marry === 'object') {
      const { users } = this.props.marry;
      if(users.length === 1) {
        return todos.filter((todo) => {
          return todo.master.uid === users[0].uid;
        });
      } else if(user.length === 2) {
        return todos.filter((todo) => {
          return todo.master.uid === users[0].uid || todo.master.uid === users[1].uid;
        });
      }
    } else {
      return todos.filter((todo) => {
        return todo.master.uid === this.props.me.uid;
      })
    }
  }
  _finishWork(row, index) {
    this.props.updateTask({ id: row.id, status: true, index })
  }
  _cancelWork(row, index) {
    this.props.updateTask({ id: row.id, status: false, index })
  }
  renderRow(row, sectionId, rowId) {
    let justifyContent = '';
    if(row.users.length > 5) {
      justifyContent = 'space-around';
    } else {
      justifyContent = 'flex-start'
    }
  	return (
  		<View style={innerStyles.row}>

        <View style={{ backgroundColor: '#FFFFFF', paddingTop: 20, paddingBottom: 10, paddingHorizontal: 10, borderRadius: 5 }}>

          <View style={{ flexDirection: 'row', marginTop: -10, alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              
              { 
                row.master.photo ? 
                <Image source={{ uri: `${row.master.photo}?imageView2/1/w/80/h/80` }} style={{ height: 40, width: 40, borderRadius: 20 }} />
                :
                <View style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: '#B6DFDF' }} />
              }
              
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

              <TouchableOpacity 
                onPress={() => this.props.navigator.push({ component: TodoMember, params: { users: row.users } })}
                style={{ width: 100, flexDirection: 'row', justifyContent: justifyContent, marginVertical: 10 }}>
                {Object.keys(row.users).map(key => {
                  return (
                    <View key={`selected_${key}`} style={{ alignItems: 'center', justifyContent: 'center', padding: 2, height: 34, width: 34, borderWidth: 1/PixelRatio.get(), borderRadius: 17, borderColor: '#CCCCCC', backgroundColor: '#FFFFFF' }}>
                      { row.users[key].photo ? 
                          <Image source={{ uri: `${row.users[key].photo}?imageView2/1/w/60/h/60` }} style={{ height: 30, width: 30, borderRadius: 15 }} />
                        :
                          <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#B6DFDF' }} />
                      }
                    </View>
                  );
                })}
              </TouchableOpacity>

              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ color: '#999999' }}>{`有${row.users.length}个人参与这个任务`}</Text>
              </View>

            </View>
            )
          }
        </View>
        

        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
        {
          row.status ?
          <TouchableOpacity onPress={this._cancelWork.bind(this, row, rowId)} activeOpacity={0.8} style={{ alignItems: 'center', }}>
            <Image source={asset.work_done} style={{ height: 50 }} resizeMode={"contain"} />
          </TouchableOpacity>
           : 
          <TouchableOpacity onPress={this._finishWork.bind(this, row, rowId)} activeOpacity={0.8} style={{  alignItems: 'center' }}>
            <Image source={asset.work_in_progress} style={{ height: 50 }} resizeMode={"contain"} />
          </TouchableOpacity>
        }
        </View>

  		</View>
  	)
  }

  renderFooter() {
    return (
      <View style={{ height: 60 }} />
    )
  }

  _renderStarter() {
    const { dataSource } = this.state;
    if(dataSource.getRowCount()===0) {
      return (
        <View>
        <View style={{ height: 50, width: 1 }} />
        <View style={{ margin: 10, padding: 10, borderRadius: 10, backgroundColor: '#FBFFDF' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={asset.girl} style={{ height: 40, width: 40, borderRadius: 20 }} />
              <View>
                <Text style={{ fontSize: 16 }}>格小格</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontSize: 12, color: '#769AE4' }}>1分钟前</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image source={asset.i_41} style={{ width: 30, height: 30 }} />
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#666666' }}>新手任务</Text>
            </TouchableOpacity>
          </View>
          <Title onPress={() => 
              this.props.navigator.push({ 
                component: TodoImport, 
              })}>
            格小格的简单婚礼筹备流程攻略
          </Title>
          <TouchableOpacity onPress={() =>  this.props.navigator.push({ component: TodoImport, title: '设置婚礼任务' })} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Image source={asset.taskDesc} />
            <View style={{ flex: 1, marginHorizontal: 5, flexWrap: 'wrap' }}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: '#666666' }}>
                快速生成你的婚礼待办事项列表,我们将会一步步教你筹备婚礼
              </Text> 
            </View>
          </TouchableOpacity>

        </View>
        </View>
      );
    } 
  }

  render() {
    const { task } = this.props;
    if(task === 'initial state' || this.state.loaded === false ) {
      return (
        <Loading />
      )
    }else {
      return (
        <View style={{ flex: 1 }}>
          { this._renderStarter() }
          <ListView
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            renderHeader={() => <View style={{ height: 50, width: 1 }} />}
            renderFooter={this.renderFooter}
            
            initialListSize={5}
            pageSize={3}
            removeClippedSubviews={true}

            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh.bind(this)}
                tintColor="#EEEEEE"
                title="更新我的婚礼进度"
                colors={['#F06199']}
                progressBackgroundColor="#FFFFFF"
              />
            } />
        </View>
      );
    }
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.props.init()
      this.setState({
        isRefreshing: false
      })
    }, 2000);
  }
}

const innerStyles = {
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
}

module.exports = connect(
  state => ({ task: state.task, marry: state.marry, me: state.session }),
  dispatch => ({
    init: () => dispatch(init()),
    updateTask: (data) => dispatch(update(data))
  })
)(Todo)