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
import { FormBlock, PureButton, Input,FormRow } from '../components/Form';
class Welcome extends React.Component {
	_enter() {
		this.props.navigator.popToTop();
	}
	componentDidMount() {
		
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<BackStep navigator={this.props.navigator} title={"完成，进入婚格"} />
				<ScrollView 
					bounces={false}
					style={{ flex: 1, margin: 10, padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF' }}>

					<View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
						<Text style={{ fontSize: 20, fontWeight: '400', color: '#666666' }}>欢迎使用婚格V2</Text>
					</View>

					<View style={{ alignItems: 'center', justifyContent: 'center' }}>
						<Image source={asset.team} style={{ height: 300  }} resizeMode={"contain"} />
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