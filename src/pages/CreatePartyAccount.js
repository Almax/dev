import moment from 'moment';

import React, {
	ScrollView,
	View,
	Text
} from 'react-native';

import styles from '../styles';

import { FormBlock, FormRow, Input, PureButton } from '../components/Form';
import { Caption, BackStep } from '../components/View';

import CreatePartyFinished from './CreatePartyFinished';

class CreatePartyAccount extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			marry_date: null,
			username_1: null,
			username_2: null,
			password: null
		}
	}

	componentDidMount() {
		const { marry_date } = this.props;

		this.setState({ 
			username_1: '',
			username_2: '',
			password: '',
			marry_date 
		})
	}

	render() {
		return (
		<View style={styles.container}>
			<BackStep navigator={this.props.navigator} />
			<ScrollView 
				bounces={false}
				contentContainerStyle={{ padding: 10 }}>	
				<Caption>联接你跟你的另一半</Caption>

				<FormRow>
					<Input value={`结婚日期 ${moment(this.state.marry_date).format("YYYY年MM月DD日")}`} />
				</FormRow>	

				<FormRow>
					<Input 
						onChangeText={ (username_1) => this.setState({ username_1 }) }
						placeholder={"输入你的手机号"} />
				</FormRow>

				<FormRow>
					<Input 
						onChangeText={ (username_2) => this.setState({ username_2 }) }
						placeholder={"输入你另一半的手机号"} />
				</FormRow>

				<FormRow>
					<Input
						onChangeText={ (password) => this.setState({ password }) }
						secureTextEntry={true}
						placeholder={"输入你们共同的登陆密码"} />
				</FormRow>

				<FormBlock>
					<PureButton onPress={() => 
						this.props.navigator.push(
							{ 
								component: CreatePartyFinished,
								params: {
									marry_date: this.state.marry_date,
									username_1: this.state.username_1,
									username_2: this.state.username_2,
									password: this.state.password,
								}
							}) 
					}>
					创建我们两人的婚礼
					</PureButton>

				</FormBlock>

			</ScrollView>
		</View>
		)
	}
}

export default CreatePartyAccount