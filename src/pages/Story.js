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
	Platform,
	Dimensions,
} from 'react-native';
const ImagePickerManager = NativeModules.ImagePickerManager;
import asset from '../assets';
import styles from '../styles';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import { createStory, getStories } from '../utils/syncdata';
import ImageView from './ImageView';
import { PureButton } from '../components/Form';
import { BackStep } from '../components/View';
import {
    LazyloadScrollView,
    LazyloadImage,
} from 'react-native-lazyload';
import { load } from '../redux/modules/story';
const { width, height } = Dimensions.get('window');
import Loading from './Loading';

class Memory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isRefreshing: false,
			loaded: false,
			stories: []
		}
	}
	async componentDidMount() {
		const { marry } = this.props;
		if(this.props.story === 'initial state') {
			this.props.load(this.props.marry);
		}else {
			this.setState({ 
				stories: this.props.story,
				loaded: true,
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		if(typeof nextProps.story === 'object' ) {
			this.setState({ 
				stories: nextProps.story, 
				loaded: true, 
			});
		}
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

		   	this.props.load(this.props.marry);
		  }
		});	
	}
	_handleStory(story) {
		this.props.navigator.push({
			component: ImageView,
			params: {
				uri: story.photo
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
		if(this.state.story === 'initial state' || this.state.loaded === false) {
			return (
				<Loading />
			);
		}else {
			return (
				<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
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

						{ this.state.stories.length === 0 ?
							<TouchableOpacity  onPress={this._takePhoto.bind(this)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
								<Image source={asset.placeholder} style={{ marginTop: 10 }} />
							</TouchableOpacity>
							: 
							null
						}

						<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingTop: 2, paddingLeft: 2, }}>
							
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
										style={{ marginRight: 2, height: ((width-2)/4) - 2, width: ((width-2)/4) - 2, marginBottom: 2 }} />
								</TouchableOpacity>
								)
							})}

						</View>

						<View style={{  alignItems: 'center', justifyContent: 'center', height: 60 }}>
							
							<View style={{ backgroundColor: '#F4F4F4', padding: 10, borderRadius: 5 }}>
								<Text style={{ color: '#C0C0C0' }}>下拉加载更多照片哦~</Text>
							</View>

						</View>

					</LazyloadScrollView>

				  <ActionButton 
				  	icon={<Image source={asset.takePhoto} style={{ height: 50, width: 50 }} />}
				  	position={'center'} 
				  	buttonColor={'#F06199'} 
				  	onPress={this._takePhoto.bind(this)}>
				  </ActionButton>

				</View>
			);
		}
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