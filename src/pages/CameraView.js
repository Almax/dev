import React, {
  Component,
  Image,
  Platform,
  PropTypes,
  ListView,
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  Dimensions,
  Alert,
  InteractionManager,
} from 'react-native';
import RNFS from 'react-native-fs';
import asset from '../assets';
import { connect } from 'react-redux';
import { SubmitButton, PureButton } from '../components/Form';
import CameraRoll from 'rn-camera-roll';
const { width, height } = Dimensions.get('window');
import { createStory, getStories } from '../utils/syncdata';
const PHOTOS_COUNT_BY_FETCH = 30;
const MAX_SIZE = 20;
class CameraView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.lastPhotoFetched = undefined;
    this.images = [];
    this.selected = 0;
    this.state = this.getDataSourceState();
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      let data = await this.fetchPhotos();
      this.onPhotosFetchedSuccess(data);
    });
  }

  getDataSourceState() {
    return {
      isUploading: false,
      preview: null,
      selected: this.selected,
      dataSource: this.ds.cloneWithRows(this.images),
    };
  }

  getPhotosFromCameraRollData(data) {
    return data.edges.map((asset) => {
      return asset.node.image;
    });
  }

  onPhotosFetchedSuccess(data) {
    const newPhotos = this.getPhotosFromCameraRollData(data);
    this.images = this.images.concat(newPhotos);
    this.setState(this.getDataSourceState());
    if (newPhotos.length) this.lastPhotoFetched = newPhotos[newPhotos.length - 1].uri;
  }

  onPhotosFetchError(err) {

  }

  async fetchPhotos(count = PHOTOS_COUNT_BY_FETCH, after) {
    return await CameraRoll.getPhotos({
      first: count,
      after,
    });
  }

  async onEndReached() {
    this.onPhotosFetchedSuccess(
      await this.fetchPhotos(PHOTOS_COUNT_BY_FETCH, this.lastPhotoFetched)
    );
  }

  _beginUpload() {
    this.counter = 0;
    this.setState({
      isUploading: true
    });

    for(key in this.images) {
      if(this.images[key].selected === true) {

        if(/file/.test(this.images[key].uri)) {
          let path = this.images[key].uri.replace('file:', '');
          RNFS.readFile(path, 'base64').then( async (data) => {
            await this._upload(data);
          });

        } else {
          NativeModules.ReadImageData.readImage(this.images[key].uri, async (data) => {
            await this._upload(data);
          });
        }
      }
    }
  }

  async _upload(data) {
    const source = { uri: 'data:image/jpeg;base64,' + data, isStatic: true };
    const params = {
      photo: source.uri,
    };
    let newPhoto = await createStory(this.props.marry, params);
    this.setState({
      preview: newPhoto.photo
    });
    this.counter++;
    if(this.counter === this.selected) {
      Alert.alert('上传完成');
      this._cleanSelected();
      await this.props.popRefresh();
    }    
  }

  _cleanSelected() {
    Object.keys(this.images).map(key => {
      this.images[key].selected = false;
    });
    this.selected = 0; 
    return this.setState(this.getDataSourceState());
  }

  _stopUploading() {
    this.setState({
      isUploading: false,
    });
  }

  _pickPhoto(image) {
    Object.keys(this.images).map(key => {
      if(this.images[key].uri === image.uri) {
        if(this.images[key].selected === true) {
          this.selected = this.selected - 1;
          this.images[key].selected = false;
        } else {
          if(this.selected >= MAX_SIZE) {
            return Alert.alert(`最多只能选择${MAX_SIZE}张照片`);
          }
          this.selected = this.selected + 1;
          this.images[key].selected = true;
        }
        return this.setState(this.getDataSourceState());
      }
    });
  }

  _renderRow(image) {
    if(image.selected === true) {
      return (
        <TouchableOpacity onPress={this._pickPhoto.bind(this, image)}>
          <Image
            style={styles.image}
            source={{ uri: image.uri }}>

            <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={asset.ok} />
            </View>

          </Image>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={this._pickPhoto.bind(this, image)}>
          <Image
            style={styles.image}
            source={{ uri: image.uri }}
          />
        </TouchableOpacity>
      );
    }
  }

  _renderHeader() {
    return (
      <View style={styles.header}>
        <Text>已经选择了{this.state.selected}张照片</Text>
        <SubmitButton onPress={this._beginUpload.bind(this)} size={'small'}>上传</SubmitButton>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>

        {this._renderHeader()}
        <ListView
          initialListSize={1}
          pageSize={PHOTOS_COUNT_BY_FETCH}
          contentContainerStyle={styles.imageGrid}
          dataSource={this.state.dataSource}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={100}
          showsVerticalScrollIndicator={false}
          renderRow={this._renderRow.bind(this)}
        />

        { this.state.isUploading ? 
          <View style={styles.fullscreenLayer}>
            <Text style={{ fontSize: 18, color: '#FFFFFF' }}>正在同步到婚礼故事...请等待</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
              <Text style={{ fontSize: 18, color: '#FFFFFF' }}>正在上传</Text>
              <View style={{ width: 10 }} />
              <Image source={{ uri: this.state.preview }} style={{ height: 100, width: 100, borderRadius: 10 }} />
            </View>

            <View style={{ height: 20 }}/>
            <PureButton onPress={this._stopUploading.bind(this)}>取消</PureButton>
          </View> 
          : null 
        }


      </View>
    );
  }
}

const styles = {
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
  container: {
    flex: 1,
    paddingLeft: 2,
    backgroundColor: '#F5FCFF',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    marginTop: 2,
    width: (width-10) / 4,
    height: (width-10) / 4,
    marginRight: 2,
  },
};

export default connect(
  state => ({
    marry: state.marry,
    story: state.story
  }),
  dispatch => ({

  })
)(CameraView)