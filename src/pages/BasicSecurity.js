import React, {
	ScrollView,
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { BackStep, Subtitle } from '../components/View';
import FindPassword from './FindPassword';
import {
	FormRow,
	SoftInput,
	Label,
} from '../components/Form';
class BasicSecurity extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={styles.container}>
				<ScrollView contentContainerStyle={{ padding: 10, }}>
					<Subtitle>安全信息</Subtitle>
					<View style={styles.form}>

						<FormRow>
							<Label>手机号</Label>
							<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', height: 40 }}>
								<Text style={styles.text}>{this.props.user.username}</Text>
							</TouchableOpacity>
						</FormRow>

						<FormRow>
							<Label>密码</Label>
							<TouchableOpacity 
									onPress={() => this.props.navigator.push({ component: FindPassword })} 
									style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', height: 40 }}>
								
								<Text style={styles.text}> 修改密码 </Text>
								
							</TouchableOpacity>
						</FormRow>

						<View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
							<Text style={{ fontSize: 16 }}>账号已经激活</Text>
						</View>

					</View>
				</ScrollView>	
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EFEFEF',
	},
	form: {
		padding: 10,
		backgroundColor: '#FFFFFF',
		borderRadius: 5,
	},
	text: {
		fontSize: 16,
		color: '#666666'
	},
});

export default connect(
	state=>({ user: state.session })
)(BasicSecurity);