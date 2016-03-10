var options = {
  title: '选择照片', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: '从相册里选择', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  maxWidth: 600, // photos only
  maxHeight: 800, // photos only
  aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
  quality: 1, // photos only
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
	Image,
	Text,
	TouchableOpacity,
	Dimensions,
} from 'react-native'
const { width, height } = Dimensions.get('window')
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
import asset from '../assets'
import { Caption, Subtitle, HorizontalView, BackStep } from '../components/View'

class AddPhoto extends React.Component {
	
	constructor(props) {
		super(props)

		this.state = {
			avatarSource: null
		}
	}

	takePhoto() {
		UIImagePickerManager.showImagePicker(options, (response) => {
		  
		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  }
		  else if (response.error) {
		    console.log('UIImagePickerManager Error: ', response.error);
		  }
		  else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  }
		  else {
		    // You can display the image using either data:
		    //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

		    // uri (on iOS)
		    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
		    // uri (on android)
		    //const source = {uri: response.uri, isStatic: true};

		    this.setState({
		      avatarSource: source
		    });

		    console.log(source)
		  }
		});
	}

	render() {
		const { task, taskCate, date } = this.props;
		return (
			<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

				<BackStep navigator={this.props.navigator} />

				<ScrollView 
					
					bounces={false}>

					<Text>{task} {JSON.stringify(taskCate)} {JSON.stringify(date)}</Text>

					<TouchableOpacity onPress={this.takePhoto.bind(this)} style={{ borderWidth: 1, borderColor: '#999999', alignItems: 'center', justifyContent: 'center', margin: 20, padding: 20, borderRadius: 5 }}>
						<Image source={asset.uploadPhoto} style={{ height: 50 }} resizeMode={"contain"} />
						<Text>上传图片</Text>
					</TouchableOpacity>

					<Image source={this.state.avatarSource} style={{ height: 220, width }} resizeMode={"cover"} />

				</ScrollView>
			</View>
		)
	}

}

export default AddPhoto