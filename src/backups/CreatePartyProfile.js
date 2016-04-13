import React, {
	ScrollView,
	View,
	Text
} from 'react-native'

import styles from '../styles';

import { FormBlock, FormRow, Input, PureButton } from '../components/Form';
import { Caption, BackStep } from '../components/View';

import CreatePartyMemory from './CreatePartyMemory';

class CreatePartyProfile extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			my_name: null,
			partner_name: null
		}
	}

	render() {
		return (
			<ScrollView style={styles.container}>	
				
				<BackStep navigator={this.props.navigator} />

				<Caption>婚礼名字 - 让大家知道这是你们的婚礼</Caption>

				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<View style={innerStyle.nameWrapper}>
						<Text style={innerStyle.name}>{this.state.my_name}</Text>
					</View>

					<Text>&</Text>
					<View style={innerStyle.nameWrapper}>
						<Text style={innerStyle.name}>{this.state.partner_name}</Text>
					</View>

					<Text>的婚礼</Text>
				</View>

				<FormRow>
					<Input 
						onChangeText={ (my_name) => this.setState({my_name}) }
						placeholder={"我的名字,建议用真名"} />
				</FormRow>

				<FormRow>
					<Input 
						onChangeText={ (partner_name) => this.setState({partner_name}) }
						placeholder={"另一半的名字,建议用真名"} />
				</FormRow>
				
				<FormBlock>
					<PureButton onPress={ 
							() => this.props.navigator.push({ component: CreatePartyMemory, 
									params: { 
										my_name: this.state.my_name,
										partner_name: this.state.partner_name
									} 
								}) 
							}>保存,下一步</PureButton>
				</FormBlock>

			</ScrollView>
		)
	}
}

const innerStyle = {
	nameWrapper: {
		borderBottomWidth: 1,
		borderBottomColor: '#EEEEEE'
	},
	name: {
		textAlign: 'center',
		fontSize: 16,
		fontWeight: '500',
		color: '#666666',
		width: 80,
	}
}

export default CreatePartyProfile