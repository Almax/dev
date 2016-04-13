var options = {
  title: '选择照片', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: '从相册里选择...', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  maxWidth: 300, // photos only
  maxHeight: 300, // photos only
  aspectX: 1, // aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.8, // photos only
  angle: 0, // photos only
  allowsEditing: true, // Built in functionality to resize/reposition the image
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
    skipBackup: false, // image will NOT be backed up to icloud
    path: 'images' // will save image at /Documents/images rather than the root
  }
};
import React, {
	ScrollView,
	View,
	Picker,
	TouchableOpacity,
	Text,
	Image,
	Alert,
	NativeModules,
	StyleSheet
} from 'react-native'
const ImagePickerManager = NativeModules.ImagePickerManager;
import { Caption, Subtitle, HorizontalView, BackStep } from '../components/View'
import {
	FormRow,
	SoftInput,
	Label,
	SubmitButton,
	FormBlock,
} from '../components/Form';
import asset from '../assets';
import { connect } from 'react-redux';
import { updateProfile } from '../redux/modules/session';
import Loading from './Loading';
class BasicProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: true,
			option: 1,
			photo: null,
			role: "保密",
			name: "",
			nickname: "",
			call: "",
			signature: "",
		}
	}
	componentDidMount() {
		this.setState({
			name: this.props.state.name,
			nickname: this.props.state.nickname,
			call: this.props.state.call,
			role: this.props.state.role,
			photo: this.props.state.photo,
			signature: this.props.state.signature,
		})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ loaded: true });
		Alert.alert('更新成功', '我的资料更新成功');
	}
	viewScroll(offset) {
		this.scrollView.scrollTo({ x:0 ,y: offset, animated: true })
	}
	changeProfile() {
		this.setState({ loaded: false });
		if(/http\:\/\//.test(this.state.photo)) {
			this.props.save({
				name: this.state.name,
				nickname: this.state.nickname,
				call: this.state.call,
				role: this.state.role,
				signature: this.state.signature,
			})
		}else {
			this.props.save({
				name: this.state.name,
				nickname: this.state.nickname,
				call: this.state.call,
				role: this.state.role,
				photo: this.state.photo,
				signature: this.state.signature,
			});
		}
	}
	_takePhoto() {
		ImagePickerManager.showImagePicker(options, (response) => {
		  console.log('Response = ', response);

		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  }
		  else if (response.error) {
		    console.log('ImagePickerManager Error: ', response.error);
		  }
		  else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  }
		  else {
		    const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
		    this.setState({
		      photo: source.uri
		    });
		  }
		});		
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView
					ref={scrollView => this.scrollView = scrollView}
					contentContainerStyle={{ padding: 10, }}
					bounces={true}
					automaticallyAdjustContentInsets={false}>
					
					<Subtitle>基本资料</Subtitle>
					<View style={styles.form}>

						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image source={{ uri: this.state.photo }} style={{ height: 120, width: 120, borderRadius: 60 }} resizeMode={"contain"} />
						</View>
						<FormRow>
							<Label>我的照片</Label>
							<TouchableOpacity onPress={this._takePhoto.bind(this)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 40 }}>
								<Image source={asset.camera} resizeMode={"stretch"} />
							</TouchableOpacity>
						</FormRow>
						<FormRow>
							<Label>真实姓名</Label>
							<SoftInput
								scroll={this.viewScroll.bind(this)}
								value={this.state.name}
								onChangeText={(name) => this.setState({ name })}
								placeholder={"请填写你的真实姓名"} />
						</FormRow>
						<FormRow>
							<Label>昵称</Label>
							<SoftInput
								scroll={this.viewScroll.bind(this)}
								value={this.state.nickname}
								onChangeText={(nickname) => this.setState({ nickname })}
								placeholder={"请填写你的昵称"} />
						</FormRow>
						<FormRow>
							<Label>联系方式</Label>
							<SoftInput
								scroll={this.viewScroll.bind(this)}
								value={this.state.call}
								onChangeText={(call) => this.setState({ call })}
								placeholder={"如: 微信号/手机号/QQ号/邮箱"} />
						</FormRow>
						<FormRow>
							<Label>我的身份</Label>
							<Picker
								style={{ backgroundColor: '#FFFFFF', flex: 1 }}
								itemStyle={{ fontSize: 16, height: 120, justifyContent: 'flex-start' }}
							  selectedValue={this.state.role}
							  onValueChange={(role) => this.setState({ role })}>
							  <Picker.Item label="保密" value="保密" />
							  <Picker.Item label="新郎" value="新郎" />
							  <Picker.Item label="新娘" value="新娘" />
							  <Picker.Item label="未婚" value="未婚" />
							</Picker>
						</FormRow>

						<FormRow>
							<Label>个人签名</Label>
							<SoftInput
								scroll={this.viewScroll.bind(this)}
								value={this.state.signature}
								onChangeText={(signature) => this.setState({ signature })}
								placeholder={"这里是我的签名"} />
						</FormRow>
						<FormBlock />
							
						{ this.state.loaded ? <SubmitButton onPress={this.changeProfile.bind(this)}>修改</SubmitButton> : <Loading /> }

					</View>
				</ScrollView>
			</View>
		)
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
	}
})

export default connect(
	state => ({ state: state.session }),
	dispatch => ({
		save: (data) => dispatch(updateProfile(data))
	})
)(BasicProfile)