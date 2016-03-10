const MONTH_FORMAT = 'YYYY-MM';
const DAY_FORMAT = 'YYYY-MM-DD';
const CALENDAR_FORMAT = 'MMMM Do YYYY, h:mm:ss a';
const WEEK_FORMAT = 'dddd';
const WEEK_FORMAT_SHORT = 'ddd';


import React, { Dimensions, Component, View, Text, Image, ListView, Alert, TouchableOpacity } from 'react-native';
import moment from 'moment';
import locale from 'moment/locale/zh-cn';
import DateRange from 'moment-range';
import styles from './styles';

const { width } = Dimensions.get('window');


export default class Calendar extends Component {

	constructor(props) {
		super(props);

		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2		
		})

		this.state = {
			highlightDate: moment(),
			calendar: [],
			dataSource
		}
	}

	componentDidMount() {
		this._refreshCalendar(0);

		this.props.onSelect(this.state.highlightDate);
	}

	_refreshCalendar(step) {
		const { short } = this.props;
		const format = short ? WEEK_FORMAT_SHORT : WEEK_FORMAT;

		if(step === -1) {
			this.state.highlightDate.subtract(1,'months')
		}else if(step === 1) {
			this.state.highlightDate.subtract(-1,'months')
		}

		const locale = moment.localeData();
		const weeks = short ? locale._weekdaysShort : locale._weekdays;

		let startDate = moment(this.state.highlightDate, 'YYYY-MM').startOf('month');
		let endDate = moment(this.state.highlightDate, 'YYYY-MM').endOf('month');

		let calendar = [...weeks];
		let weekCount = 0;
		let beforeFlag = false;

		moment.range(startDate, endDate).by('days',(day) => {
			var no = moment(day)
			if(beforeFlag === false) {
				var weekCursor = parseInt(moment(day).format('e')) + 1;
				Array.from(new Array(weekCursor)).map((v,k) => calendar.push(0));
				beforeFlag = true;
			}
			calendar.push({ date: no, selected: false })
		});
		this.setState({
			calendar: calendar,
			dataSource: this.state.dataSource.cloneWithRows(calendar)
		})
	}

	_onSelect(date) {
		this.setState({ highlightDate: date })
		this.props.onSelect(date);
	}

	renderRow(row, sectionId, rowId) {
		if(row === 0) {
			return (<View style={calStyle.atom} />)
		}else if(typeof row == 'object') {
			return (
				<TouchableOpacity onPress={this._onSelect.bind(this, row.date)} style={calStyle.atom}>
					<Text style={calStyle.text}>{moment(row.date).format('DD')}</Text>
				</TouchableOpacity>
			)	
		}else {
			return (
				<View style={calStyle.atom}>
					<Text style={calStyle.text}>{row}</Text>
				</View>
			)	
		}

	}

	renderSectionHeader(section) {
		return (
			<View />
		)
	}

	renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
		return (
			<View key={Math.random(0, 9999)}></View>
		);
	}

	render() {
		const { short } = this.props;

		const locale = moment.localeData();

		const weeks = short ? locale._weekdaysShort : locale._weekdays;

		const currentDate = this.state.highlightDate.format('YYYY-MM-DD');

		return (
			<View style={styles.container}>

					<View style={styles.month}>
						<TouchableOpacity onPress={this._refreshCalendar.bind(this, -1)} style={styles.monthButton}>
							<Image source={require('./arrowLeft.png')} resizeMode={"stretch"} style={styles.monthArrow} />
							<Text style={styles.monthText}>上个月</Text>
						</TouchableOpacity>

						<TouchableOpacity>
							<Text style={styles.calendarTitle}>当前 [ {this.state.highlightDate.format(DAY_FORMAT)} ]</Text>
						</TouchableOpacity>
						
						<TouchableOpacity onPress={this._refreshCalendar.bind(this, 1)} style={styles.monthButton}>
							<Text style={styles.monthText}>下个月</Text>
							<Image source={require('./arrowRight.png')} resizeMode={"stretch"} style={styles.monthArrow} />
						</TouchableOpacity>
					</View>

					<ListView
						initialListSize={42}
						contentContainerStyle={styles.list}
						renderRow={this.renderRow.bind(this)}
						renderSeparator={this.renderSeparator.bind(this)}
						dataSource={this.state.dataSource} />

			</View>
		)
	}
}


Calendar.propTypes = {
	onSelect: React.PropTypes.func.isRequired,
	short: React.PropTypes.bool
}

Calendar.defaultProps = {
	onSelect: (date) => { console.log(date) },
	short: true
}

const calStyle = {
	atom: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		width: width / 7 - 1,
		height: width / 7 - 1 ,
	},
	text: {
		fontSize: 18
	}
}
