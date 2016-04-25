import React, {
	View,
	Text,
	Image,
	ListView,
	TouchableOpacity,
	InteractionManager,
	StyleSheet,
} from 'react-native';
import asset from '../assets';
import moment from 'moment';
import { connect } from 'react-redux';
import { init } from '../redux/modules/task';
import CatalogSection from '../components/View/CatalogSection';
import TodoAction from './TodoAction';
import { update } from '../redux/modules/task';
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
import TodoImport from './TodoImport';
class TodoCard extends React.Component {
	_open(row, index) {
		this.props.navigator.push({ 
	    component: TodoAction, 
	    params: {
	      todo: row,
	      index
	    }
		});
	}
  _finishWork(row, index) {
    this.props.update({ id: row.id, status: true, index });
  }
  _cancelWork(row, index) {
    this.props.update({ id: row.id, status: false, index });
  }
  shouldComponentUpdate(nextProps, nextState) {
  	if(nextProps === this.props) {
  		return false;
  	} else {
  		return true;
  	}
  }
  render() {
    const { master, task_name, status, created_at } = this.props.data;
    return (
      <View style={styles.card}>
        { 
        	status ?
          <TouchableOpacity activeOpacity={0.8} onPress={this._cancelWork.bind(this, this.props.data, this.props.rowId)}>
            <Image source={asset.work_done} style={{ height: 28, width: 28, marginRight: 10 }} /> 
          </TouchableOpacity>
          :
          <TouchableOpacity activeOpacity={0.8} onPress={this._finishWork.bind(this, this.props.data, this.props.rowId)}>
            <Image source={asset.work_in_progress} style={{ height: 28, width: 28, marginRight: 10 }} />
          </TouchableOpacity>
        }
        <TouchableOpacity
          onPress={this._open.bind(this, this.props.data, this.props.rowId)}
          style={{ flex: 1 }}>
          <Text style={styles.task}>{task_name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const TodoCardRedux = connect(
	state=>({}),
	dispatch=>({
    init: () => dispatch(init()),
		update: (data) => dispatch(update(data))
	})
)(TodoCard);

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		flexWrap: 'wrap',
    alignItems: 'center',
		backgroundColor: '#FFFFFF',
		marginBottom: 1,
		padding: 10,
	},
	task: {
		fontSize: 16,
		lineHeight: 20,
		color: '#666666'
	},
	name: {
		fontSize: 12,
		color: '#999999',
		fontWeight: '500'
	}
});

class TodoCate extends React.Component {
	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({
			getSectionHeaderData: this._getSectionHeaderData,
			rowHasChanged: (r1, r2) => r1!==r2,
			sectionHeaderHasChanged: (s1, s2) => s1!==s2
		});
		this.state = {
			group: {},
			dataSource
		};
	}
	componentDidMount() {
		var group = {};
		InteractionManager.runAfterInteractions(() => {
			const todos = this._filter(this.props.task);

			Object.keys(todos).map((key) => {
				const catalog_id = todos[key].catalog_id;
				if(group[catalog_id]) {
					group[catalog_id] = group[catalog_id].concat([todos[key]]);
				}else {
					group[catalog_id] = [todos[key]];
				}
			});
			this.setState({
				group,
				dataSource: this.state.dataSource.cloneWithRowsAndSections(group)
			});
		});
	}
	componentWillReceiveProps(nextProps) {
		var group = {};
		if(typeof nextProps.task === 'object') {
			const todos = this._filter(nextProps.task);
			Object.keys(todos).map((key) => {
				const catalog_id = todos[key].catalog_id;
				if(group[catalog_id]) {
					group[catalog_id] = group[catalog_id].concat([todos[key]]);
				}else {
					group[catalog_id] = [todos[key]];
				}
			});
			this.setState({
				dataSource: this.state.dataSource.cloneWithRowsAndSections(group)
			});
		}
	}
  _filter(todos) {
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
	_getSectionHeaderData(dataBlob, sectionID) {
		return sectionID;
	}
	_renderHeader() {
    const { dataSource } = this.state;
    if(dataSource.getRowCount()===0) {
      return (
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

          <Title onPress={() =>  this.props.navigator.push({ component: TodoImport })}>
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
      );
    }
	}
	_renderRow(row, sectionId, rowId) {
		return (
			<TodoCardRedux navigator={this.props.navigator} data={row} rowId={rowId} />
		);
	}
	_renderSectionHeader(sectionData, sectionID) {
		return (
			<View style={{ backgroundColor: '#EFEFEF' }}>
				<CatalogSection id={sectionData} />
			</View>
		);
	}
	render() {
		return (
			<ListView
        initialListSize={20}
        pageSize={15}
        scrollRenderAheadDistance={2}
        removeClippedSubviews={true}
				automaticallyAdjustContentInsets={false}
				dataSource={this.state.dataSource}
				renderHeader={this._renderHeader.bind(this)}
				renderSectionHeader={this._renderSectionHeader.bind(this)}
				renderFooter={() => <View style={{ height: 50 }} />}
				renderRow={this._renderRow.bind(this)} />
		);
	}
}

export default connect(
	state => ({ task: state.task, marry: state.marry, me: state.session }),
	dispatch => ({
		init: () => dispatch(init())
	})
)(TodoCate);