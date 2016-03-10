import React, {
	View,
	TouchableOpacity,
	Text,
	Image,
	ListView,
	Dimensions,
	PanResponder,
	StyleSheet,
} from 'react-native'
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');
import Time from '../components/View/Time';
import moment from 'moment';
import { 
  PureText, 
} from '../components/View';
import TodoAction from './TodoAction';
import Loading from './Loading';

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
  render() {
    const { master, task_name, created_at } = this.props.data;

    return (
      <View style={styles.card}>
      	<View style={styles.layout}>
        	
        	<View style={{ width: 50, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
        		<Image source={{ uri: master.photo }} style={{ height: 50, width: 50, borderRadius: 25 }} />
        		<Text style={styles.name}>{master.name}</Text>
        	</View>

        	<View style={{ flex: 1 }}>

        		{/*

	        		<View style={{ flexDirection: 'row', marginBottom: 10 }}>
	            	<Text style={{ fontSize: 12, color: '#999999' }}>提醒: </Text> 
	            	<PureText color={"#769AE4"}>
	              	{ moment(created_at).format('YYYY年MM月DD日 a') }
	            	</PureText>
	            </View>

        		*/}

        		<TouchableOpacity 
        			onPress={this._open.bind(this, this.props.data)}
        			style={{ flex: 1, justifyContent: 'center' }}>

        				<Text style={styles.task}>{task_name}</Text>
        		
        		</TouchableOpacity>
        	</View>

      	</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#FFFFFF',
		marginBottom: 1,
		padding: 10,
	},
	layout: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	task: {
		fontSize: 18,
		lineHeight: 20,
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
			var data = [];
			Object.keys(state).map((key) => {
				if(moment(state[key].end_date).format('YYYY-MM') === moment().format('YYYY-MM')) {
					data = data.concat([state[key]])
				}
			})
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(data)
			})
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
			<TodoCard navigator={this.props.navigator} data={row} rowId={rowId} />
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
							style={{ backgroundColor: '#FFFFFF', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
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