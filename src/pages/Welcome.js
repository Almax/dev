import React, {
	ScrollView,
	View,
	Text,
	Image,
	Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');

import asset from '../assets';
import { connect } from 'react-redux';
import { BackStep } from '../components/View';
import { FormBlock, SubmitButton, Input,FormRow } from '../components/Form';
class Welcome extends React.Component {
	_enter() {
		this.props.navigator.popToTop();
	}
	componentDidMount() {
		
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<View 
					style={{ flex: 1, margin: 10, padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF' }}>

					<View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
						<Text style={{ fontSize: 20, fontWeight: '400', color: '#666666' }}>欢迎使用婚格</Text>
					</View>

					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Image source={asset.team} style={{ height: 300  }} resizeMode={"contain"} />
					</View>


					<SubmitButton onPress={this._enter.bind(this)}>进入</SubmitButton>

				</View>	
			</View>
		);
	}
}

export default connect(

)(Welcome);