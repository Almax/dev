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
	Alert,
	View,
	Text,
	Image,
	TouchableOpacity,
	Picker,
	DatePickerIOS,
	NativeModules,
	DatePickerAndroid,
	TimePickerAndroid,
	Platform,
} from 'react-native';
import asset from '../assets';
const ImagePickerManager = NativeModules.ImagePickerManager;
import { connect } from 'react-redux';
import { BackStep } from '../components/View';
import { FormBlock, SubmitButton, SoftInput, Label, FormRow } from '../components/Form';
import Welcome from './Welcome';
import moment from 'moment';
import { setMyMarry } from '../redux/modules/marry';
import { updateProfile } from '../redux/modules/session';
class FillMyProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPicker: false,
			name: null,
			photo: null,
			role: null,
			marry_name: null,
			marry_date: new Date(),
		};
	}
	componentDidMount() {
		const { user, marry } = this.props;
		if(typeof user === 'object') {
			this.setState({
				name: user.name,
				photo: user.photo,
				role: user.role,
			});
		}

		if(marry && marry.id) {
			this.setState({
				marry_name: marry.marry_name,
				marry_date: marry.marry_date,
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		const { user,marry } = this.props;
	}
	_onDateChange(date) {

	}
	_welcome() {
		if(this.state.name==null || this.state.name == '' || this.state.photo==null) {
			Alert.alert('请完善姓名跟头像');
			return ;
		}

		if(this.state.marry_date==null || this.state.marry_name == '' || this.state.marry_name==null) {
			Alert.alert('请先完善婚礼信息');
			return ;
		}

		this.props.updateProfile({
			name: this.state.name,
			photo: this.state.photo,
			role: this.state.role,
		});

		this.props.updateMarry({
			marry_date: this.state.marry_date,
			marry_name: this.state.marry_name,
		});

		this.props.navigator.push({
			component: Welcome
		});
	}
	_onUpload() {
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
	async _togglePicker() {
		if(Platform.OS === 'android') {
			try {
			  const {action, year, month, day} = await DatePickerAndroid.open({
			    date: this.state.marry_date ? new Date(this.state.marry_date) : new Date()
			  });
			  if (action !== DatePickerAndroid.dismissedAction) {
				  const {action, hour, minute} = await TimePickerAndroid.open({
				    hour: parseInt(moment().format("hh")),
				    minute: parseInt(moment().format("mm")),
				    is24Hour: false,
				  });
			  	if (month < 10) { month = `0${month + 1}`; } else { month = `${month + 1}`; }
			  	if (day < 10) { day = `0${day}`; }

				  if (action !== DatePickerAndroid.dismissedAction) {
				  	if (hour < 10) { hour = `0${hour}`; }
				  	if (minute < 10) { hour = `0${hour}`; }
				  	const date = `${year}/${month}/${day} ${hour}:${minute}:00`;
				  	this.setState({ marry_date: new Date(date) });
				  }else {
				  	const date = `${year}/${month}/${day}`;
				  	this.setState({ marry_date: new Date(date) });
				  }
			  }
			} catch ({code, message}) {
			  console.warn('Cannot open date picker', message);
			}
		}else if(Platform.OS === 'ios') {
			this.setState({
				showPicker: !this.state.showPicker
			});
		}
	}
	_keyboardScroll(offset) {
		this.scrollView.scrollTo({ y: offset, animated: true })
	}
	_skip() {
		this.props.navigator.push({
			title: '完成',
			component: Welcome
		});
	}
	render() {
		const { marry } = this.props;
		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<ScrollView 
					ref={scrollView => this.scrollView = scrollView}
					bounces={true}
					style={{ flex: 1, margin: 10, padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF' }}>

					<FormRow>
						<Label>我的照片</Label>
						<TouchableOpacity 
							onPress={this._onUpload.bind(this)}
							style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', paddingVertical: 10 }}>
							
							{ this.state.photo ?
								<Image source={{ uri: this.state.photo }} style={{ width: 80, height: 80, borderRadius: 5 }} /> 
								: 
								<Image source={asset.logo} style={{ width: 80, height: 80 }} /> 
							}

						</TouchableOpacity>
					</FormRow>

					<FormRow>
						<Label>真实姓名</Label>
						<SoftInput
							scroll={this._keyboardScroll.bind(this)}
							value={this.state.name}
							onChangeText={(name)=>this.setState({name})}
							placeholder={"真实姓名"} />
					</FormRow>

					<FormRow>
						<Label>我的身份</Label>
						<Picker
							style={{ backgroundColor: '#FFFFFF', flex: 1 }}
							itemStyle={{ color: '#666666', fontSize: 16, height: 120, justifyContent: 'flex-start' }}
						  selectedValue={this.state.role}
						  onValueChange={(role) => this.setState({ role })}>
						  <Picker.Item label="保密" value="保密" />
						  <Picker.Item label="新郎" value="新郎" />
						  <Picker.Item label="新娘" value="新娘" />
						  <Picker.Item label="未婚" value="未婚" />
						</Picker>
					</FormRow>

					<FormRow>
						<Label>婚礼名称</Label>
						<SoftInput
							scroll={this._keyboardScroll.bind(this)}
							value={this.state.marry_name}
							onChangeText={(marry_name)=>this.setState({marry_name})}
							placeholder={"婚礼名称"} />
					</FormRow>

					<FormRow>
						<Label>婚礼日期</Label>
						<TouchableOpacity 
							onPress={this._togglePicker.bind(this)}
							style={{ flex: 1, height: 60, alignItems: 'flex-start', justifyContent: 'center' }}>
							<Text style={{ fontSize: 18, color: '#0C84FB', fontWeight: '500' }}>{moment(this.state.marry_date).format('YYYY-MM-DD')}</Text>
						</TouchableOpacity>
					</FormRow>
					{
						this.state.showPicker ?
							<DatePickerIOS
							  date={new Date(this.state.marry_date)}
							  mode="date"
							  timeZoneOffsetInMinutes={((-1) * (new Date()).getTimezoneOffset() / 60) * 60}
							  onDateChange={(marry_date)=>this.setState({marry_date})} />
						: 
							null
					}
					<View style={{ height: 10 }}/>
					<SubmitButton onPress={this._welcome.bind(this)}>完成</SubmitButton>

				</ScrollView>	
			</View>
		);
	}
}

export default connect(
	state=>({ user: state.session, marry: state.marry }),
	dispatch=>({
		updateMarry: (marry) => dispatch(setMyMarry(marry)),
		updateProfile: (data) => dispatch(updateProfile(data))
	})
)(FillMyProfile);