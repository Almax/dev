import TimeAgo from 'react-native-timeago';

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
  InteractionManager,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import moment from 'moment'
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
import Loading from './Loading';

class Todo extends React.Component {

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2 });
    this.refCache = [];
    this.state = {
      isRefreshing: false,
      loaded: 0,
      dataSource: dataSource
    }
  }
  componentDidMount() {
    this.props.init()
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.state !== this.props.state) {
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.state)
        });
      });
    }
  }
  _finishWork(row, index) {
    this.props.updateTask({ id: row.id, status: true, index })
  }
  _cancelWork(row, index) {
    this.props.updateTask({ id: row.id, status: false, index })
  }
  renderRow(row, sectionId, rowId) {
  	return (
  		<View style={innerStyles.row}>
        {
          row.status ?
          <TouchableOpacity onPress={this._cancelWork.bind(this, row, rowId)} activeOpacity={0.8} style={{  alignItems: 'center', marginTop: -25 }}>
            <Image source={asset.work_done} style={{ height: 50 }} resizeMode={"contain"} />
          </TouchableOpacity>
           : 
          <TouchableOpacity onPress={this._finishWork.bind(this, row, rowId)} activeOpacity={0.8} style={{  alignItems: 'center', marginTop: -25 }}>
            <Image source={asset.work_in_progress} style={{ height: 50 }} resizeMode={"contain"} />
          </TouchableOpacity>
        }

        <View style={{ flexDirection: 'row', marginTop: -10, alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: row.master.photo }} style={{ height: 40, width: 40, borderRadius: 20 }} />
            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: '#666666' }}>{row.master.name}</Text>
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
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Image source={asset.taskDesc} />
              <View style={{ flex: 1, marginHorizontal: 5, flexWrap: 'wrap' }}>
                <Text style={{ fontSize: 14, color: '#666666' }}>{row.task_detail}</Text> 
              </View>
            </View>
            : 
            null 
        }

        <View style={{ height: 30 }} />

        { row.users.length &&
          (
          <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              { Object.keys(row.users).map((key) => <MemberHeader key={"_"+key} headimg={{ uri: row.users[key].photo }} name={row.users[key].name} /> ) }
            </View>

            <View style={{ backgroundColor: '#F4F4F4', padding: 10, borderRadius: 5, justifyContent: 'center' }}>
              <Text style={{fontSize: 12, color: '#666666', fontWeight: '300'}}>截止 {moment(row.end_date).format("YYYY.MM.DD")}</Text>
            </View>
          </View>
          )
        }
        
  		</View>
  	)
  }

  renderFooter() {
    return (
      <View style={{ height: 60 }} />
    )
  }

  render() {
    const { state } = this.props;
    if(state === 'initial state') {
      return (
        <Loading />
      )
    }else {
      return (
        <ListView
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderFooter={this.renderFooter}
          initialListSize={1}
          pageSize={5}
          scrollRenderAheadDistance={2}
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingBottom: 5,
    marginHorizontal: 10,
    marginTop: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',

  }
}

module.exports = connect(
  state => ({ state: state.task }),
  dispatch => ({
    init: () => dispatch(init()),
    updateTask: (data) => dispatch(update(data))
  })
)(Todo)