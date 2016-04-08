import React, {
	View,
	TouchableOpacity,
	Text,
	Image,
	ListView,
	Dimensions,
	PanResponder,
	InteractionManager,
	StyleSheet,
} from 'react-native'
import { connect } from 'react-redux';
import asset from '../assets';
const { width, height } = Dimensions.get('window');
import Time from '../components/View/Time';
import moment from 'moment';
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
import Loading from './Loading';
import { update } from '../redux/modules/task';
import TodoImport from './TodoImport';
class TodoCard extends React.Component {
	_open(row) {
		this.props.navigator.push({ 
	    component: TodoAction, 
	    params: {
	    	todo: row,
	      index: this.props.rowId 
	    }
		});
	}
  _finishWork(row, index) {
    this.props.updateTask({ id: row.id, status: true, index })
  }
  _cancelWork(row, index) {
    this.props.updateTask({ id: row.id, status: false, index })
  }
  render() {
    const { master, task_name, status, created_at } = this.props.data;
    return (
      <View style={styles.card}>        
      		{ status ?
      			<TouchableOpacity onPress={this._cancelWork.bind(this, this.props.data, this.props.rowId)}>
      				<Image source={asset.work_done} style={{ height: 28, width: 28, marginRight: 10 }} /> 
      			</TouchableOpacity>
      			:
      			<TouchableOpacity onPress={this._finishWork.bind(this, this.props.data, this.props.rowId)}>
      				<Image source={asset.work_in_progress} style={{ height: 28, width: 28, marginRight: 10 }} />
      			</TouchableOpacity>
      		}
        	
    			<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
	    			<TouchableOpacity style={{ justifyContent: 'center' }} onPress={this._open.bind(this, this.props.data)}>
	    				<Text style={styles.task}>{task_name}</Text>
	    			</TouchableOpacity>
    			</View>
        
      </View>
    )
  }
}

const TodoCardRedux = connect(
	state=>({}),
	dispatch=>({
		updateTask: (data) => dispatch(update(data))
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
		color: '#666666'
	},
	name: {
		fontSize: 12,
		color: '#999999',
		fontWeight: '500'
	}
})

class TodoTimeline extends React.Component {
	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1!==r2 })
		this.state = {
			dataSource,
			currentDate: moment().format('YYYY-MM'),
			offsetY: 0,
			offsetX: 0,
		}
	}
	componentWillMount() {		
	}
	componentDidMount() {

	}
	componentWillReceiveProps(nextProps) {
		const { state } = nextProps;
		if(typeof state === 'object') {
			InteractionManager.runAfterInteractions(() => {
				var data = [];
				Object.keys(state).map((key) => {
					if(moment(state[key].end_date).format('YYYY-MM') === this.state.currentDate) {
						data = data.concat([state[key]])
					}
				})
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(data)
				});
			});
		}
	}
	_onSelect(dateObject) {
		const { state } = this.props;
		this.setState({
			currentDate: dateObject.date
		})
		if(typeof state === 'object') {
			var data = [];
			Object.keys(state).map((key) => {

				if(state[key].end_date && moment(state[key].end_date).format('YYYY-MM') === dateObject.date) {
					data.push(state[key])
				}
			});
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(data)
			});
		}
	}
	_renderRow(row, sectionId, rowId) {
		return (
			<TodoCardRedux navigator={this.props.navigator} data={row} rowId={rowId} />
		);
	}
	_backToday() {
		this.timeline.moveTo(moment().format('YYYY-MM'));
	}
	_renderHeader() {
    const { state } = this.props;
    if(state.length===0) {
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

          <Title onPress={() => 
              this.props.navigator.push({ 
                component: TodoImport, 
              })}>
            格小格的简单婚礼筹备流程攻略
          </Title>

          <TouchableOpacity onPress={() =>  this.props.navigator.push({ component: TodoImport })} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
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
	render() {
		const { state } = this.props;
		if(state === 'initial state') {
			return (
				<Loading />
			);
		}else {
			return (
				<View style={{ flex: 1, backgroundColor: '#EFEFEF', height }}>
					<Time
						ref={(timeline) => this.timeline = timeline}
						onSelect={this._onSelect.bind(this)}
						backgroundColor={"#FFFFFF"}
						start={"2015-01-01"}
						end={"2018-12-31"} />

					{ 
						this.state.currentDate !== moment().format('YYYY-MM') ?
						<TouchableOpacity 
							onPress={this._backToday.bind(this)}
							style={{ backgroundColor: '#FFFFFF', padding: 10, marginBottom: 1, alignItems: 'center', justifyContent: 'center' }}>
							<Text>返回今天</Text>
						</TouchableOpacity>
						:
						null
					}

					<ListView
						bounces={true}
						dataSource={this.state.dataSource}
						renderHeader={this._renderHeader.bind(this)}
						renderRow={this._renderRow.bind(this)}
						renderFooter={() => <View style={{ height: 50 }} />} />
				</View>
			);
		}
	}
}

export default connect(
	state => ({ state: state.task }),
	dispatch => ({})
)(TodoTimeline);