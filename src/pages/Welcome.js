import React, {
	ScrollView,
	View,
	Text,
	Image,
} from 'react-native';
import { connect } from 'react-redux';
import { BackStep } from '../components/View';
import { FormBlock, PureButton, Input,FormRow } from '../components/Form';
class Welcome extends React.Component {
	_enter() {
		this.props.navigator.popToTop();
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<BackStep navigator={this.props.navigator} title={"完善我的资料"} />
				<ScrollView 
					bounces={false}
					style={{ flex: 1, margin: 10, padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF' }}>

					<View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
						<Text style={{ fontSize: 20, fontWeight: '400', color: '#666666' }}>欢迎使用婚格</Text>
					</View>
					
					<FormBlock>
						<PureButton onPress={this._enter.bind(this)}>进入</PureButton>
					</FormBlock>

				</ScrollView>	
			</View>
		);
	}
}

export default connect(

)(Welcome);