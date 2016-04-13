import moment from 'moment';

import React, {
	View,
	Text
} from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';

import Calendar from '../components/Widget/Calendar';

import { FormBlock, FormRow, Input, PureButton } from '../components/Form';
import { Caption, BackStep } from '../components/View';

import  CreatePartyAccount from './CreatePartyAccount';
import CreatePartyProfile from './CreatePartyProfile';

class CreatePartyDate extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			marry_date: null
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.state !== this.props.state) {
			this.props.navigator.push({ component: CreatePartyProfile })
		}
	}

	render() {
		return (
			<View style={styles.container}>	
				<BackStep navigator={this.props.navigator} title={"设置结婚日期"} />

				<View style={{ padding: 10 }}>
					<Caption>你们打算在哪一天结婚</Caption>
					<View style={{ flexDirection: 'row', alignItems: 'center'}}>
						<Text style={{ fontSize: 18, color: '#999999' }}>我的结婚日: </Text>
						<Text style={{ fontSize: 18, color: '#666666', fontWeight: '600' }}>{ moment(this.state.marry_date).format("YYYY年MM月DD日")}</Text>
					</View>
				</View>

				<Calendar onSelect={(marry_date) => this.setState({ marry_date })} />

				<FormBlock>
					<PureButton onPress={ 
							() => this.props.navigator.push({ component: CreatePartyAccount, params: { marry_date: this.state.marry_date } }) }>确定日期,下一步</PureButton>
				</FormBlock>


			</View>
		)
	}
}

export default connect(
	state => ({ state: state.session })
)(CreatePartyDate)