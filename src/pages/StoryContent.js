import React, {
	ScrollView,
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { update } from '../redux/modules/story';

class StoryContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			storyText: null,
		}
	}
	componentDidMount() {
		this.setState({
			storyText: this.props.story.story
		})
	}
	_saveContent() {
		this.props.getContent(this.state.storyText);
		newStory = {
			id: this.props.story.id,
			story: this.state.storyText
		}
		this.props.update( this.props.marry, newStory );
		this.props.navigator.pop();
	}
	render() {
		const { story } = this.props;
		return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<View style={styles.buttonGroup}>
					<Image source={{ uri: story.photo }} style={styles.preview} />
					<TouchableOpacity onPress={this._saveContent.bind(this)} style={styles.save}>
						<Text>保存</Text>
					</TouchableOpacity>
				</View>

				<TextInput
					placeholder={'写下你们的故事...'}
					numberOfLines={20}
					value={this.state.storyText}
					onChangeText={storyText => this.setState({ storyText })}
					multiline={true}
					style={styles.editor} />

			</ScrollView>
		</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: '#EFEFEF',
		padding: 10,
	},
	editor: {
		flex: 1,
		textAlignVertical: 'top',
		textAlign: 'left',
		borderRadius: 10,
		padding: 10,
		color: '#666666',
		fontSize: 16,
		fontWeight: '300',
		backgroundColor: '#FFFFFF'
	},
	preview: {
		height: 60,
		width: 60,
		borderRadius: 10,
	},
	buttonGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	save: {
		backgroundColor: '#FFFFFF', 
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
	}
};

export default connect(
	state=>({
		marry: state.marry
	}),
	dispatch=>({
		update: (marry, story) => dispatch(update(marry, story))
	})
)(StoryContent);