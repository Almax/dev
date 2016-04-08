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
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import React, {
	ScrollView,
	View,
	Text,
	Image,
	TouchableOpacity,
	Dimensions,
	NativeModules,
	Alert,
	ListView,
	InteractionManager,
	StyleSheet
} from 'react-native'
const ImagePickerManager = NativeModules.ImagePickerManager;
import Lightbox from 'react-native-lightbox';
import { 
  Line, 
  Caption, 
  Subtitle, 
  Title, 
  Detail, 
  PureText, 
  MemberHeader, 
  PhotoPreview, 
  HorizontalLayout,
  ButtonGroup,
  BackStep,
} from '../components/View';
import { SubmitButton, FormBlock, FormRow, SoftInput, PureButton, HideButton } from '../components/Form'
const { height, width } = Dimensions.get('window')
import asset from '../assets'
import styles from '../styles'
import { loadRemarks, createRemark } from '../utils/syncdata'
import TodoCatalog from './TodoCatalog';
import TodoEdit from './TodoEdit';
import Loading from './Loading';
import { connect } from 'react-redux';
import { update } from '../redux/modules/task';
import Catalog from '../components/View/Catalog';
import ImageView from './ImageView';
class TodoAction extends React.Component {
	constructor(props) {
		super(props)
		var index = 0;
		Object.keys(this.props.state).map((key) => {
			if(this.props.state[key].id === this.props.todo.id) {
				index = key;
			}
		});
		const { todo } = this.props;
		var remarks = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
		this.state = {
			todo,
			index,
			text: null,
			images: [],
			isLoaded: false,
			remarks: remarks,
			addDone: true,
		}
	}
	componentDidMount() {
		const { todo } = this.state;
		InteractionManager.runAfterInteractions(async () => {
			var remarks = await loadRemarks(todo);
			this.setState({
				isLoaded: true,
				remarks: this.state.remarks.cloneWithRows(remarks)
			});
		});
	}
	componentWillReceiveProps(nextProps) {
		InteractionManager.runAfterInteractions(async () => {
			const todo = nextProps.state[this.state.index];
			this.setState({
				todo
			})
		});
	}
	_update(catalog) {
		InteractionManager.runAfterInteractions(async () => {
			await this.props.updateTask({ 
				id: this.state.todo.id, 
				catalog_id: catalog.id,
			})
		});
	}
	_editTask() {
		this.props.navigator.push({
			component: TodoEdit,
			params: {
				todo: this.state.todo
			}
		})
	}
	_sortTask() {
		const { todo } = this.state;
		this.props.navigator.push({
			component: TodoCatalog,
			params: {
				todo,
				update: this._update.bind(this)
			}
		})
	}
	_takePhoto() {
		ImagePickerManager.showImagePicker(options, (response) => {
		  if (response.didCancel) {}
		  else if (response.error) {}
		  else if (response.customButton) {}
		  else {
		    const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
		    this.state.images.push(source)
		    this.setState({
		      images: this.state.images
		    });
		  }
		});		
	}
	_onChangeText(text) {
		this.setState({
			text
		})
	}
	_removePhoto(photo) {
		var index = this.state.images.indexOf(photo)
		Alert.alert('是否删除','被选照片将从照片列表里删除掉,确认是否删除？', [
			{text: '删除', onPress: () => { 
					this.state.images.splice(index, 1); 
					this.setState({ images: this.state.images }); 
				} 
			},
			{text: '取消', onPress: () => console.log('Cancel')},
		])
	}
	_scroll(offset) {
		this.scrollView.scrollTo({ x:0 ,y: offset, animated: true })
	}
	async _submit() {
		this.setState({ addDone: false });
		const { todo } = this.state;
		var photos = [];
		var i = 0;
		
		for(; i < this.state.images.length; i++) {
			photos.push(this.state.images[i].uri)
		}
		await createRemark(todo, {
			text: this.state.text,
			photos: photos
		});

		this.setState({
			text: null,
			images: []
		})
		this._reload();
		this.setState({ addDone: true });
	}
	async _reload() {
		const { todo } = this.state;
		var remarks = await loadRemarks(todo);
		this.setState({
			isLoaded: true,
			remarks: this.state.remarks.cloneWithRows(remarks)
		})
	}
	renderRow(row, sid, rid) {
		return (
		<View style={{ backgroundColor: '#EFEFEF', marginBottom: 10, padding: 10 }}>
			<View style={{ flexDirection: 'row', alignItems: 'center'}}>
				<Image source={{ uri: row.user.photo }} style={{ marginRight: 10, height: 50, width: 50, borderRadius: 25 }} />
				<View>
					<Text style={{ fontSize: 16, color: '#666666', fontWeight: '500' }}>{row.user.name}</Text>
            
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Text style={{ fontSize: 12, color: '#999999' }}></Text> 
            <PureText color={"#769AE4"}>
            	<TimeAgo time={row.created_at} style={{ fontSize: 12, color: '#769AE4' }} />
            </PureText>
          </View>

				</View>
			</View>
				
			{ row.description ? 
	      <View style={{ paddingVertical: 10 }}>
					<Text style={{ fontSize: 16, color: '#666666' }}>{row.description}</Text>
				</View>
				: null 
			}
      
			{ 
				row.photo ?
				<TouchableOpacity style={{ marginTop: 10 }} onPress={() => this.props.navigator.push({ component: ImageView, params: { uri: row.photo } })}>
          <Image source={{ uri: row.photo }} style={{ width: width / 2, height:  width / 2, borderRadius: 5 }} resizeMode={"cover"} />
				</TouchableOpacity>
				 : null 
			}

		</View>
		)
	}

	renderRemark() {
		if(this.state.isLoaded) {
			return (
			<View style={{ backgroundColor: '#FFFFFF' }}>
				<ListView
					initialListSize={1}
					pageSize={3}
					removeClippedSubviews={true}
					renderRow={this.renderRow.bind(this)}
					dataSource={this.state.remarks} />
			</View>
			)
		}else {
			return (
				<Loading />
			)
		}
	}
  
	render() {
		const { todo } = this.state;
		return (
			<View style={{flex:1, height, backgroundColor: '#EEEEEE'}}>
			<BackStep navigator={this.props.navigator} title={"任务详情"} />
			<ScrollView
				automaticallyAdjustContentInsets={false}
				bounces={true}
				ref={scrollView => this.scrollView = scrollView}>

		  		<View style={innerStyles.row}>
		  			
		  			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
			        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
			          <Image source={{ uri: todo.master.photo }} style={{ height: 50, width: 50, borderRadius: 25 }} />

			          <View style={{ marginLeft: 10, justifyContent: 'center' }}>
			            <Text style={{ fontSize: 16, fontWeight: '500', color: '#666666' }}>{todo.master.name}</Text>
			            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
			              <TimeAgo time={todo.created_at} style={{ fontSize: 12, color: '#769AE4' }} />
			            </View>
			          </View>
			        </View>

			        <Catalog id={todo.catalog_id} />
		       	</View>
		  			
		        <Title>{todo.task_name}</Title>
		        
		        { todo.task_detail ?  
		            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
		              <Image source={asset.taskDesc} />
		              <View style={{ flex: 1, marginHorizontal: 5, flexWrap: 'wrap' }}>
		                <Text style={{ fontSize: 14, color: '#666666' }}>{todo.task_detail}</Text> 
		              </View>
		            </View>
		            : 
		            null 
		        }

		        <Line color={"#EEEEEE"} />

		        { todo.users.length &&
		          (
		          <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
		            <View style={{ flexDirection: 'row' }}>
		              { Object.keys(todo.users).map((key) => <MemberHeader key={"_"+key} headimg={{ uri: todo.users[key].photo }} name={todo.users[key].name} /> ) }
		            </View>

		            <View style={{ backgroundColor: '#F4F4F4', padding: 10, borderRadius: 5, justifyContent: 'center' }}>
		              <Text style={{fontSize: 12, color: '#666666', fontWeight: '300'}}>截止 {moment(todo.end_date).format("YYYY.MM.DD")}</Text>
		            </View>
		          </View>
		          )
		        }
		        
		        <Line color={"#EEEEEE"} />

		        <ButtonGroup>

		        	<PureButton onPress={this._editTask.bind(this)}>编辑</PureButton>
		        	<PureButton onPress={this._sortTask.bind(this)}>分类</PureButton>
		          
		        </ButtonGroup>
		  		</View>


		  		<View style={innerStyles.row}>

		  			<Subtitle>备忘</Subtitle>
		  			<FormRow>
			  			<SoftInput
			  				style={{ height: 80 }}
			  				placeholder={"先把重要的事记下来"}
			  				multiline={true}
			  				value={this.state.text}
			  				onChangeText={this._onChangeText.bind(this)}
			  				scroll={this._scroll.bind(this)} />
		  			</FormRow>

		  			<TouchableOpacity onPress={this._takePhoto.bind(this)} style={{ margin: 10 }}>
		  				<Image source={asset.camera} />
		  			</TouchableOpacity>

		  			<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
		  			{ Object.keys(this.state.images)
		  							.map((key) =>
		  							<TouchableOpacity onPress={this._removePhoto.bind(this, this.state.images[key])} key={"photos_"+key} style={{ marginRight: 10 }}>
		  								<Image source={this.state.images[key]} style={{ height: 80, width: 80, borderRadius: 5 }} />
		  							</TouchableOpacity> 
		  							) 
		  			}
		  			</View>

		  			<View style={{ marginVertical: 10 }}>
	  				{ 
	  				this.state.addDone ? 
		  				<SubmitButton onPress={this._submit.bind(this)}>
		  					添加备忘
		  				</SubmitButton>
		  				 : 
		  				 <Loading /> 
	  				}
	  				</View>


		  			{this.renderRemark()}


		  		</View>

		  		<View style={{ height: 20 }} />

  		</ScrollView>

			</View>	
		)
	}
}

export default connect(
	state => ({ state: state.task }),
	dispatch => ({
		updateTask: (data) => dispatch(update(data))
	})
)(TodoAction);

const innerStyles = {
  row: { 
    width: width - 20,  
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  col: {
    flex: 1,
  },
}
