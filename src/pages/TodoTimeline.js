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
  PureText, 
} from '../components/View';
import TodoAction from './TodoAction';
import Loading from './Loading';
import { update } from '../redux/modules/task';

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
		// this.offsetX = 0;
		// this.offsetY = 0;
	}
	componentWillMount() {
		// this._panResponder = PanResponder.create({
		// 	onStartShouldSetPanResponder: (evt, gestureState) => true,
		// 	onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
		// 	onMoveShouldSetPanResponder: (evt, gestureState) => true,
		// 	onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
		// 	onPanResponderGrant: (evt, gestureState) => {
		// 	},
		// 	onPanResponderMove: (evt, gestureState) => {

		// 	},
		// 	onPanResponderStart: (evt, gestureState) => {
		// 		//this.offsetX = gestureState.moveX;
		// 		// this.offsetY = gestureState.moveY;
		// 		this.setState({
		// 			offsetX: gestureState.moveX,
		// 			offsetY: gestureState.moveY,
		// 		})

		// 		console.warn(gestureState.moveX, gestureState.moveY)
		// 	},
		// 	onPanResponderEnd: (evt, gestureState) => {
		// 		if(gestureState.moveX - this.state.offsetX > 200) {
		// 			//this.setState({ currentDate: moment(this.state.currentDate).subtract(1, 'month').format('YYYY-MM') });
		// 			this.timeline.moveTo(moment(this.state.currentDate).format('YYYY-MM'));
		// 		}else {
		// 			//this.setState({ currentDate: moment(this.state.currentDate).add(1, 'month').format('YYYY-MM') });
		// 			this.timeline.moveTo(moment(this.state.currentDate).format('YYYY-MM'));
		// 		}
		// 	},
		// 	onPanResponderTerminationRequest: (evt, gestureState) => true,
		// 	onPanResponderRelease: (evt, gestureState) => {

		// 	},
		// 	onPanResponderTerminate: (evt, gestureState) => {

		// 	},
		// 	onShouldBlockNativeResponder: (evt, gestureState) => {
		// 		return true;
		// 	}
		// });		
	}
	componentDidMount() {

	}
	componentWillReceiveProps(nextProps) {
		const { state } = nextProps;
		if(typeof state === 'object') {
			InteractionManager.runAfterInteractions(() => {
				var data = [];
				Object.keys(state).map((key) => {
					if(moment(state[key].end_date).format('YYYY-MM') === moment().format('YYYY-MM')) {
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
				if(moment(state[key].end_date).format('YYYY-MM') === dateObject.date) {
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
						start={"2016-01-01"}
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