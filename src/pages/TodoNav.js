import React, {
	TouchableOpacity,
	View,
	Text,
	Platform,
} from 'react-native'

import TodoGeneral from './TodoGeneral';

class Badge extends React.Component {
	render() {
		const { number, color } = this.props;	
		return (
			<View style={{ marginHorizontal: 5, height: 18, width: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: color, borderRadius: 2 }}>
				<Text style={{ fontSize: 12, color: '#FFFFFF' }}>{number}</Text>
			</View>
		)
	}
}

class TodoNav extends React.Component {


	_lookUp(name) {
		this.props.navigator.push({ 
			component: TodoGeneral,
			params: {
				title: name
			}
		})
	}


	render() {
		return (
			<View style={{ 
				flexDirection: 'row', 
				alignItems: 'center', 
				justifyContent: 'space-between', 
				backgroundColor: '#FFFFFF', 
				height: 40,
				borderBottomWidth: 1,
				borderBottomColor: '#EEEEEE' 
			}}>

				<TouchableOpacity onPress={() => this._lookUp("我进行中") } style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					
					<Badge color={"#5294DF"} number={50} />

					<Text>我进行中</Text>
					
				</TouchableOpacity>

				<View style={{ height: 30, width: 1, backgroundColor: '#EEEEEE' }} />

				<TouchableOpacity onPress={() => this._lookUp("我已完成")} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					
					<Badge color={"#52AB0A"} number={15} />

					<Text>我已完成</Text>
					
				</TouchableOpacity>

				<View style={{ height: 30, width: 1, backgroundColor: '#EEEEEE' }} />

				<TouchableOpacity onPress={() => this._lookUp("分配给我")} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					
					<Badge color={"#DFD97B"} number={5} />
					
					<Text>分配给我</Text>
					
				</TouchableOpacity>

			</View>
		)
	}
}

export default TodoNav