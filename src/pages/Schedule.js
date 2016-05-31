import React, {
	View,
	Text
} from 'react-native'
import asset from '../assets'
import styles from '../styles'
import Switchtab from '../components/View/Switchtab'
import Todo from './Todo'
import { IconButton } from '../components/Form';
import TodoNav from './TodoNav';
import TodoNew from './TodoNew';

import TodoCate from './TodoCate';
import TodoTimeline from './TodoTimeline';

class TodoPage extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
        <Todo navigator={this.props.navigator} />
      	<View style={{ width: 1, height: 20, backgroundColor: 'transparent' }} />
      </View>
		)
	}
}

class Schedule extends React.Component {
	render() {
		const pagers = [
			{ index: 2, component: TodoPage, name: '我的' },
			{ index: 0, component: TodoCate, name: '分类'},
			{ index: 1, component: TodoTimeline, name: '时间线' },
		];
		return (
			<View style={styles.container}>
				<Switchtab 
					pager={pagers}
					backgroundColor={"transparent"}
					navigator={this.props.navigator} />
			</View>
		)
	}
}
export default Schedule;