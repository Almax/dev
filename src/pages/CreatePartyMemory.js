import React, {
	ScrollView,
	Text
} from 'react-native';

import styles from '../styles';

import { connect } from 'react-redux';
import { update } from '../redux/modules/session';

import { FormBlock, FormRow, Input, PureButton } from '../components/Form';
import { Caption, BackStep } from '../components/View';

class CreatePartyMemory extends React.Component {

	componentDidMount() {
		const { my_name, partner_name, state } = this.props;
		this.props.updateName(my_name, partner_name, state)
	}

	render() {
		return (
			<ScrollView style={styles.container}>	
				<BackStep navigator={this.props.navigator} />
				<Caption>上传一些照片 - 比如里有你们难忘的回忆</Caption>
			</ScrollView>
		)
	}
}

export default connect(
	state => ({ state: state.session }),
	dispatch => ({
		updateName: (my_name, partner_name, session) => dispatch(update(my_name, partner_name, session))
	})
)(CreatePartyMemory)