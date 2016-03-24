import React, {
	ScrollView,
	View,
	Text,
	Switch,
	TouchableOpacity,
	SegmentedControlIOS,
	Platform,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles'
import { CatalogSection, Caption, Subtitle, HorizontalView, BackStep, SegmentedControl } from '../components/View';
import AccountCost from './AccountCost';
import AccountIncome from './AccountIncome';

class AccountStore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: 0,
		}
	}
	componentDidMount() {
		
	}
	_onViewChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
	}
	_setItemKey(key) {
		this.setState({
			selectedIndex: key
		})
	}
	_renderSegmentedControl() {
		if(Platform.OS === 'android') {
			if(this.state.selectedIndex === 0) {
				return (
					<View>
						<View style={innerStyles.segmentedContainer}>
							
							<TouchableOpacity onPress={() => this._setItemKey(0)} style={innerStyles.segmentedItemLeft}>
								<Text style={innerStyles.textWhite}>支出</Text>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => this._setItemKey(1)} style={innerStyles.segmentedItem}>
								<Text style={innerStyles.textRed}>预算</Text>
							</TouchableOpacity>
						
						</View>
					</View>
				);
			}else if(this.state.selectedIndex === 1) {
				return (
					<View>
						<View style={innerStyles.segmentedContainer}>
							
							<TouchableOpacity onPress={() => this._setItemKey(0)} style={innerStyles.segmentedItem}>
								<Text style={innerStyles.textRed}>支出</Text>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => this._setItemKey(1)} style={innerStyles.segmentedItemRight}>
								<Text style={innerStyles.textWhite}>预算</Text>
							</TouchableOpacity>
						
						</View>
					</View>
				);
			}
		} else if(Platform.OS === 'ios') {
			return (
				<SegmentedControlIOS
					onChange={this._onViewChange.bind(this)}
					tintColor={"#F06199"}
					selectedIndex={this.state.selectedIndex}
					values={['支出', '预算']} />
			);
		}
	}
	render() {
		if (this.state.selectedIndex === 0) {
			return (
				<View style={[styles.container, { backgroundColor: '#EFEFEF' }]}>
					<BackStep navigator={this.props.navigator} title={"支出"} />

					<View style={innerStyles.segmented}>
						
						{ this._renderSegmentedControl() }
							
					</View>

					<AccountCost navigator={this.props.navigator} />

				</View>
			);
		} else if (this.state.selectedIndex === 1) {
			return (
				<View style={[styles.container, { backgroundColor: '#EFEFEF' }]}>
					<BackStep navigator={this.props.navigator} title={"预算"} />

					<View style={innerStyles.segmented}>
						
						{ this._renderSegmentedControl() }

					</View>

					<AccountIncome navigator={this.props.navigator} />

				</View>
			);
		} else {
			return (
				<View />
			)
		}
	}
}

const innerStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		borderRadius: 5,
		margin: 10,
		padding: 10,
	},
	segmented: { 
		marginVertical: 10, 
		paddingHorizontal: 10 
	},
	segmentedContainer: { 
		flexDirection: 'row', 
		borderRadius: 5, 
		borderWidth: 1, 
		borderColor: '#F06199' 
	},
	segmentedItem: { 
		flex: 1, 
		height: 30,
		borderRadius: 5, 
		alignItems: 'center', 
		justifyContent: 'center' 
	},
	segmentedItemLeft: {
		flex: 1, 
		height: 30, 
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		backgroundColor: '#F06199',
		alignItems: 'center', 
		justifyContent: 'center' 
	},
	segmentedItemRight: {
		flex: 1, 
		height: 30, 
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		backgroundColor: '#F06199',
		alignItems: 'center', 
		justifyContent: 'center' 
	},
	textWhite: {
		fontSize: 16,
		color: '#FFFFFF',
	},
	textRed: {
		fontSize: 16,
		color: '#F06199',
	}
})

export default AccountStore;