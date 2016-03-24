import React, {
	View,
	Text,
	Image,
	ListView,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import asset from '../assets';
import moment from 'moment';
import { connect } from 'react-redux';
import { init } from '../redux/modules/task';
import CatalogSection from '../components/View/CatalogSection';
import PureText from '../components/View/PureText';
import TodoAction from './TodoAction';
import { update } from '../redux/modules/task';
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
    this.props.updateTask({ id: row.id, status: true, index });
    this.props.init();
  }
  _cancelWork(row, index) {
    this.props.updateTask({ id: row.id, status: false, index });
    this.props.init();
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
			dataSource
		};
	}
	componentDidMount() {
		this.props.init();
	}
	componentWillReceiveProps(nextProps) {
		var group = {};
		if(typeof this.props.state === 'object') {
			const todos = this.props.state;
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
	_getSectionHeaderData(dataBlob, sectionID) {
		return sectionID;
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
				renderSectionHeader={this._renderSectionHeader.bind(this)}
				renderFooter={() => <View style={{ height: 50 }} />}
				renderRow={this._renderRow.bind(this)} />
		);
	}
}

export default connect(
	state => ({ state: state.task }),
	dispatch => ({
		init: () => dispatch(init())
	})
)(TodoCate);