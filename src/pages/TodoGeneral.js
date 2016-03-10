import React, {
	View,
	Text
} from 'react-native'

import styles from '../styles';

import { Caption, BackStep } from '../components/View';

class TodoGeneral extends React.Component {


	render() {
		return (
			<View style={styles.container}>
				<BackStep navigator={this.props.navigator} />
				<Caption>婚礼进度总览: {this.props.title}</Caption>
				
			</View>
		)
	}
}

export default TodoGeneral