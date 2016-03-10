import React, {
	View,
	Text,
	Image,
	ListView,
	TouchableOpacity,
	StyleSheet,
} from 'react-native'
import moment from 'moment';
import { connect } from 'react-redux';
import { init } from '../redux/modules/task';
import CatalogSection from '../components/View/CatalogSection';
import PureText from '../components/View/PureText';
import TodoAction from './TodoAction';

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
  render() {
    const { master, task_name, created_at } = this.props.data;
    return (
  		<TouchableOpacity
  			onPress={this._open.bind(this, this.props.data, this.props.rowId)}
  			style={{ flex: 1 }}>

  			<View style={styles.card}>
      		{/*
						<View style={{ flexDirection: 'row', marginBottom: 10 }}>
							<Text style={{ fontSize: 12, color: '#999999' }}>提醒: </Text> 
							<PureText color={"#769AE4"}>
						  	{ moment(created_at).format('YYYY年MM月DD日 a') }
							</PureText>
						</View>
      		*/}
 

          <Text style={styles.task}>{task_name}</Text>
        </View>

    	</TouchableOpacity>
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
			})
		}
	}
	_getSectionHeaderData(dataBlob, sectionID) {
		return sectionID;
	}
	_renderRow(row, sectionId, rowId) {
		return (
			<TodoCard navigator={this.props.navigator} data={row} rowId={rowId} />
		)
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
		<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
			<ListView
				automaticallyAdjustContentInsets={false}
				dataSource={this.state.dataSource}
				renderSectionHeader={this._renderSectionHeader.bind(this)}
				renderRow={this._renderRow.bind(this)} />
			<View style={{ height: 50 }} />
		</View>
		);
	}
}

export default connect(
	state => ({ state: state.task }),
	dispatch => ({
		init: () => dispatch(init())
	})
)(TodoCate);