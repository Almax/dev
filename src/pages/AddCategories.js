import React, {
	ListView,
	View,
	TouchableOpacity,
	Text,
	Image,
	Alert,
	Dimensions,
	InteractionManager,
	StyleSheet,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import asset from '../assets';
import { BackStep } from '../components/View'
import Catalogs from '../utils/constant';
import { connect } from 'react-redux';
class AddCategories extends React.Component {
	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1!==r2 })
		this.state = {
			dataSource
		};
	}
	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(Catalogs)
			});
		});
	}
	_select(catalog) {
		const { getResult } = this.props;
		getResult(catalog);
		this.props.navigator.pop();
	}
	_renderRow(row,sectionId,rowId) {
		return (
			<View style={{ width: width/3, height: width/3 }}>
				<TouchableOpacity onPress={this._select.bind(this, row)} style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
					
					<View style={{ backgroundColor: '#9DE5FC', alignItems: 'center', justifyContent: 'center', height: 60, width: 60, borderRadius: 30 }}>
						<Image source={row.icon} style={{ width: 40, height: 40 }} />
					</View>

					<View style={{ height: 5 }}/>
					<Text style={{ fontSize: 14, fontWeight: '500', color: '#666666' }}>{row.name}</Text>
				</TouchableOpacity>
			</View>
		)
	}
	render() {
		if(this.state.dataSource.getRowCount() > 0) {
			return (
				<View style={styles.container}>
					<BackStep navigator={this.props.navigator} />
					<ListView
						contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
						initialSize={20}
						pageSize={20}
					  dataSource={this.state.dataSource}
					  renderRow={this._renderRow.bind(this)} />
				</View>
			);
		}else {
			return (
				<View style={styles.container}>
					<BackStep navigator={this.props.navigator} />
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text>正在加载数据...</Text>
					</View>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF'
	}
})
export default connect()(AddCategories);