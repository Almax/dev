import React, {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	Image,
	Dimensions,
	PixelRatio,
	Alert,
} from 'react-native';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');
import { PureButton } from '../components/Form';
import { BackStep } from '../components/View';
import Loading from './Loading';
import StoryContent from './StoryContent';
class ImageView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			uri: null,
			story: null,
			key: null,
		};
	}
	componentWillMount() {
		this.setState({
			uri: this.props.uri,
			story: this.props.story,
			key: parseInt(this.props.orderId)
		});
	}
	_forward() {
		let nextKey = this.state.key+1;
		if(typeof this.props.allStory[nextKey] === 'undefined') {
			return Alert.alert('已经是最后一张了');
		} else {
			this.setState({
				key: nextKey,
				story: this.props.allStory[nextKey]
			});
		}
	}
	_backward() {
		let prevKey = this.state.key-1;
		if(typeof this.props.allStory[prevKey] === 'undefined') {
			return Alert.alert('已经是第一张了');
		} else {
			this.setState({
				key: prevKey,
				story: this.props.allStory[prevKey]
			});
		}
	}
	_writeStory(story) {
		this.props.navigator.push({
			title: '写婚礼故事',
			component: StoryContent,
			params: {
				story,
				getContent: (text) => {
					let story = { ...this.state.story };
					story.story = text;
					this.setState({
						story
					});
				}
			}
		})
	}
	render() {
		if(this.state.uri === null && this.state.story === null && this.state.key === null ) {
			return <Loading />;
		}
		if(this.state.uri) {
			return (
				<View style={styles.container}>
					<Image source={{ uri: this.state.uri }} style={styles.photo} />
					<View style={styles.buttonGroup}>
						<TouchableOpacity style={styles.button}>
							<Text style={styles.buttonText}>点评</Text>
						</TouchableOpacity>
						<View style={{ width: 1 / PixelRatio.get(), height: 40, backgroundColor: '#999999' }} />
						<TouchableOpacity style={styles.button}>
							<Text style={styles.buttonText}>圈人</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		} else {
			const { photo, story, location, user } = this.state.story;
			return (
				<View style={styles.container}>
					<Image source={{ uri: this.state.story.photo }} style={styles.photo} />

					<TouchableOpacity onPress={this._writeStory.bind(this, this.state.story)} style={styles.story}>
						<Image source={{ uri: user.photo }} style={styles.avatar} />
						<View style={styles.userInfo}>
							<Text style={styles.name}>{user.name}</Text>
							<Text style={styles.storyText}>{`#${this.state.key+1}`} {story ? story : '这张照片还没有故事'}</Text>
						</View>
					</TouchableOpacity>

					<View style={styles.buttonGroup}>
						<TouchableOpacity onPress={this._backward.bind(this)} style={styles.button}>
							<Text style={styles.buttonText}>上一张</Text>
						</TouchableOpacity>
						<View style={{ width: 1 / PixelRatio.get(), height: 40, backgroundColor: '#999999' }} />
						<TouchableOpacity onPress={this._forward.bind(this)} style={styles.button}>
							<Text style={styles.buttonText}>下一张</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		}
	}
}
const styles = {
	container: { 
		flex: 1, 
		backgroundColor: '#000000' 
	},
	photo: {
		flex: 1 
	},
	story: {
		flexDirection: 'row',
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0,
		padding: 10,
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	storyText: {
		marginTop: 10,
		fontSize: 14,
		color: '#FFFFFF',
	},
	avatar: {
		height: 50, 
		width: 50, 
		borderRadius: 25,
	},
	name: {
		fontSize: 16,
		color: '#FFFFFF',
		fontWeight: '500',
	},
	userInfo: {
		marginLeft: 10,
	},
	buttonGroup: { 
		position: 'absolute', 
		bottom: 0, 
		left: 0, 
		right: 0, 
		height: 40, 
		backgroundColor: 'rgba(0,0,0,0.3)',
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 16,
		color: '#FFFFFF',
	},
}

export default connect(
	state=>({
		allStory: state.story
	})
)(ImageView);