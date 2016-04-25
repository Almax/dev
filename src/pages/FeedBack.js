import React, {
	ScrollView,
	View,
	Text,
	Image,
	TextInput,
	Alert,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from 'react-native';
const { width } = Dimensions.get('window');
import { SoftInput, SubmitButton, FormBlock } from '../components/Form';
import asset from '../assets';
import styles from '../styles';
import { postFeedback } from '../utils/syncdata';
import { connect } from 'react-redux';
class FeedBack extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			presents: [],
			suggestion: '',
			showModal: true,
		}
	}
	componentDidMount() {
		this.setState({
			presents:[
				'界面太红了',
				'好看的图标太少',
				'速度慢',
				'做的不错',
				'功能很实在',
				'需要新功能',
				'我喜欢这个APP',
				'准备卸载了',
				'加微信聊，我的微信是:'
			]
		})
	}
	_scrollTo(offset) {
		this.scrollView.scrollTo({ y: offset });
	}
	_append(text) {
		this.setState({
			suggestion: `${this.state.suggestion}${text}`
		})
	}
	async _submit() {
		if(this.state.suggestion) {
			await postFeedback({ type_id: 0, message: this.state.suggestion });
			this.setState({ suggestion: null })
			Alert.alert('谢谢你的吐槽');
		} else {
			Alert.alert('总要写点什么吧...');
		}
	}
	render() {
		return (
		<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
			<ScrollView ref={scrollView => this.scrollView = scrollView} style={{ flex: 1 }}>

				<View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
					<Image source={asset.i_23} />
					<Text>产品君</Text>
				</View>

				<View style={innerStyles.presentWrap}>
					{ Object.keys(this.state.presents).map(key => {
						return (
							<TouchableOpacity onPress={this._append.bind(this,this.state.presents[key])} key={key} style={innerStyles.present}>
								<Text>{this.state.presents[key]}</Text>
							</TouchableOpacity>
						)
					}) }
				</View>

				<View style={innerStyles.wrapper}>
					<SoftInput
						multiline={true}
						scroll={this._scrollTo.bind(this)}
						placeholder={'用婚格有什么不爽的地方？直接告诉我们，我们立马改'}
						underlineColorAndroid={'transparent'}
						value={this.state.suggestion}
						onChangeText={suggestion => this.setState({ suggestion })}
						style={innerStyles.editor} />
				</View>

				<FormBlock>
					<SubmitButton onPress={this._submit.bind(this)} size={'small'}>发给产品君</SubmitButton>
				</FormBlock>
			</ScrollView>

			{ this.state.showModal ?
				<View style={innerStyles.modal}>
					<View style={{ width: width-20, padding: 10, backgroundColor: '#FFFFFF', borderRadius: 5, }}>
						<View style={{ alignItems: 'center', marginBottom: 5 }}><Image source={asset.i_2} /></View>
						<Text>想到要做一个和你们互动的功能时候，第一个想到的就是给你们</Text>
						<Text>机会吊打产品君~ 想到这个反而有点兴奋…</Text>
						<Text>婚格的产品君有点自虐倾向</Text>
						<Text>婚格的初衷是帮助新人更简单的筹备婚礼, 大家把任何觉得用的</Text>
						<Text>不舒服的功能和感受写下来...也可以和我们说说你想要的功能...</Text>
						<Text>婚格团队成员会替你吊打产品经理的</Text>
						<Text>当然在这之后，我们会改进持续改进产品的功能和体验</Text>
						<Text>也希望你能继续使用我们的App继续帮助你筹备婚礼~~</Text>
						<Text>婚格团队在这里，先祝大家新婚快乐了</Text>
					</View>
					<TouchableOpacity onPress={() => this.setState({ showModal: false })} style={innerStyles.btnWrap}>
						<Text style={innerStyles.btn}>知道了</Text>
					</TouchableOpacity>
				</View>
				: null 
			}
		</View>
		);
	}
}
const innerStyles = StyleSheet.create({
	modal: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	btnWrap: {
		marginTop: 10,
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#FFFFFF',
	},
	btn: {
		fontSize: 16,
		color: '#FFFFFF',
	},
	wrapper: {
		margin: 10,
		padding: 5,
		height: 200, 
		backgroundColor: '#FFFFFF', 
		borderRadius: 5
	},
	editor: {
		flex: 1,
		padding: 5,
		textAlign: 'left',
		textAlignVertical: 'top',
	},
	presentWrap: {
		margin: 5,
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingLeft: 5,
	},
	present: {
		padding: 5,
		borderWidth: 1,
		borderColor: '#CCCCCC',
		borderRadius: 5,
		marginRight: 5,
		marginBottom: 5,
	},

});

export default connect(

)(FeedBack);