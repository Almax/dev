var options = {
  title: '选择照片', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: '从相册里选择...', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  maxWidth: 1000, // photos only
  maxHeight: 600, // photos only
  aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.6, // photos only
  angle: 0, // photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
    skipBackup: false, // image will NOT be backed up to icloud
    path: 'images' // will save image at /Documents/images rather than the root
  }
};

import React, {
	ScrollView,
	RefreshControl,
	View,
	Text,
	Image,
	TouchableOpacity,
	NativeModules,
	Alert,
	Navigator,
	Dimensions,
} from 'react-native';
const ImagePickerManager = NativeModules.ImagePickerManager;

import styles from '../styles';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import { createStory, getStories } from '../utils/syncdata';
import StoryView from './StoryView';
import { PureButton } from '../components/Form';
import { BackStep } from '../components/View';
import {
    LazyloadScrollView,
    LazyloadImage,
} from 'react-native-lazyload';
import { load } from '../redux/modules/story';
const { width, height } = Dimensions.get('window');

class Memory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isRefreshing: false,
			stories: []
		}
	}
	async componentDidMount() {
		const { marry } = this.props;
		const stories = await getStories(marry);
		this.setState({ stories });
		this.props.load(this.props.marry);
	}
	componentWillReceiveProps(nextProps) {
	}
	_takePhoto() {
		const { marry } = this.props;
		ImagePickerManager.showImagePicker(options, async (response) => {
		  if (response.didCancel) {}
		  else if (response.error) {}
		  else if (response.customButton) {}
		  else {
		    const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
		    const params = {
		    	photo: source.uri,
		    };
		   	var newPhoto = await createStory(marry, params);
		   	this.state.stories.unshift(newPhoto);
		   	this.setState({
		   		stories: this.state.stories
		   	});
		  }
		});	
	}
	_handleStory(story) {
		this.props.navigator.push({
			component: StoryView,
			params: {
				story
			}
		})
	}
	_onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(async () => {
			const stories = await getStories(this.props.marry);
      this.setState({
      	stories,
        isRefreshing: false
      })
    }, 2000);
	}
	render() {
		return (
		<View style={{ flex: 1 }}>

			<BackStep navigator={this.props.navigator}/>
			<LazyloadScrollView 
				name="lazyload-list"
				refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#EEEEEE"
              title="加载我们的婚礼故事"
              colors={['#F06199']}
              progressBackgroundColor="#FFFFFF" />
        }
				style={styles.container}>

				<View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
					<Text style={{ fontSize: 16, color: '#666666', fontWeight: '500' }}>我们的婚礼故事</Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
					
					{Object.keys(this.state.stories).map((key) => {
						return (
						<TouchableOpacity 
							key={key} 
							onPress={this._handleStory.bind(this, this.state.stories[key])}
							delayLongPress={500}
							onLongPress={() => Alert.alert('delete it', 'are you sure?')}>
							<LazyloadImage 
								host="lazyload-list" 
								source={{ uri: this.state.stories[key].photo }} 
								style={{ height: (width/4) - 2, width: (width/4) - 2, marginBottom: 2 }} />
						</TouchableOpacity>
						)
					})}

				</View>

				<View style={{ height: 100 }}>
					<PureButton>加载更多 ...</PureButton>
				</View>

			</LazyloadScrollView>

		  <ActionButton buttonColor="rgba(231,76,60,1)" onPress={this._takePhoto.bind(this)}>
		  </ActionButton>

		</View>
		)
	}
}

export default connect(
	state => ({
		marry: state.marry,
		story: state.story
	}),
	dispatch => ({
		load: (marry) => dispatch(load(marry))
	})
)(Memory)