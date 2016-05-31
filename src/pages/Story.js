let options = {
  title: '选择照片', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: null,
  customButtons: {
    '从相册里选择': 'batchSelect', // [Button Text] : [String returned upon selection]
  },  
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  maxWidth: 2560, // photos only
  maxHeight: 1920, // photos only
  aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
  quality: 1, // photos only
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
	InteractionManager,
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
import CameraView from './CameraView';
import {
    LazyloadScrollView,
    LazyloadImage,
} from 'react-native-lazyload';
import { load, deleteIt } from '../redux/modules/story';
const { width, height } = Dimensions.get('window');
import Loading from './Loading';
import Zhuge from '../components/Zhuge';
class Memory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isRefreshing: false,
			loaded: false,
			stories: [],
			isDeleting: false,
			preview: null,
			options: options
		}
	}
	componentWillMount() {
		InteractionManager.runAfterInteractions(() => {
			const { marry } = this.props;
			if(this.props.story === 'initial state') {
				this.props.load(this.props.marry);
			}else {
				this.setState({ 
					stories: this.props.story,
					loaded: true,
				});
			}
		});
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
		ImagePickerManager.showImagePicker(this.state.options, async (response) => {
		  if (response.didCancel) {}
		  else if (response.error) {}
		  else if (response.customButton) {
		  	this.props.navigator.push({
		  		title: '选择照片',
		  		component: CameraView,
		  		params: {
		  			popRefresh: async () => {
		  				const stories = await getStories(this.props.marry);
		  				this.setState({ stories });
		  			}
		  		}
		  	});
		  }
		  else {
		    const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
		    const params = {
		    	photo: source.uri,
		    };
		   	var newPhoto = await createStory(marry, params);
		   	this.state.stories.unshift(newPhoto);
		   	this.setState({
		   		stories: this.state.stories
		   	});

		   	this.props.load(this.props.marry);

		   	Zhuge.getEvent('创建婚礼故事', {}, () => {});
		  }
		});	
	}
	_handleStory(story, orderId) {
		this.props.navigator.push({
			component: ImageView,
			params: {
				story, 
				orderId
			}
		});
	}
	_onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(async () => {
			this.props.load(this.props.marry);
      this.setState({ isRefreshing: false });
    }, 2000);
	}
	_executeDelete(photo) {
		this.setState({
			preview: photo,
			isDeleting: true,
		})
	}
	_deletePhoto() {
		this.props.delete(this.props.marry, this.state.preview);
		this.setState({ isDeleting: false });
	}
	_stopDeteting() {
		this.setState({ isDeleting: false });
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
							{Object.keys(this.state.stories).map((key) => (
									<TouchableOpacity 
										key={key} 
										onPress={this._handleStory.bind(this, this.state.stories[key], key)}
										delayLongPress={500}
										onLongPress={this._executeDelete.bind(this, this.state.stories[key])}>
										<LazyloadImage 
											host="lazyload-list" 
											source={{ uri: `${this.state.stories[key].photo}?imageView2/1/w/120/h/120` }} 
											style={{ marginRight: 2, height: ((width-2)/4) - 2, width: ((width-2)/4) - 2, marginBottom: 2 }} />
									</TouchableOpacity>
								)
							)}

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

        { this.state.isDeleting ? 
          <View style={innerStyles.fullscreenLayer}>
          	<Image source={{ uri: this.state.preview.photo }} style={{ height: 100, width: 100, borderRadius: 10 }} />
            <Text style={{ marginTop: 10, fontSize: 18, color: '#FFFFFF' }}>小主，这个时期的照片都是很珍贵的</Text>
            <Text style={{ marginTop: 10, fontSize: 18, color: '#FFFFFF' }}>真的要删除吗?</Text>
            <View style={{ height: 20 }}/>
            <View style={{ flexDirection: 'row' }}>

							<TouchableOpacity  onPress={this._deletePhoto.bind(this)} style={innerStyles.btnWrap}>
								<Text style={innerStyles.btn}>确定</Text>
							</TouchableOpacity>

							<View style={{ width: 20 }}/>

							<TouchableOpacity onPress={this._stopDeteting.bind(this)} style={innerStyles.btnWrap}>
								<Text style={innerStyles.btn}>取消</Text>
							</TouchableOpacity>

          	</View>

          </View> 
          : null }
				</View>
			);
		}
	}
}
const innerStyles = {
	fullscreenLayer: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
	},
	btnWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
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
};

export default connect(
	state => ({
		marry: state.marry,
		story: state.story
	}),
	dispatch => ({
		load: (marry) => dispatch(load(marry)),
		delete: (marry, story) => dispatch(deleteIt(marry, story))
	})
)(Memory)