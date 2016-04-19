import React, {
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput
} from 'react-native';

class StoryContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			storyText: null,
		}
	}
	_saveContent() {
		this.props.getContent(this.state.storyText);
		this.props.navigator.pop();
	}
	render() {
		const { story } = this.props;
		return (
		<View style={styles.container}>
			<View style={styles.buttonGroup}>

				<Image source={{ uri: story.photo }} style={styles.preview} />

				<TouchableOpacity onPress={this._saveContent.bind(this)} style={styles.save}>
					<Text>保存</Text>
				</TouchableOpacity>
			</View>

			<TextInput
				placeholder={'写下你们的故事...'}
				onChangeText={storyText => this.setState({ storyText })}
				multiline={true}
				style={styles.editor} />

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
		borderRadius: 10,
		padding: 10,
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

export default StoryContent;