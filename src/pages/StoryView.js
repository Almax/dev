import React, {
	ScrollView,
	View,
	Text,
	Image,
} from 'react-native';
import { PureButton } from '../components/Form';
import { BackStep } from '../components/View';
class StoryView extends React.Component {
	render() {
		const { story } = this.props;
		return (
		<View style={{ flex: 1, backgroundColor: '#000000' }}>
			<BackStep navigator={this.props.navigator}/>
			<ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: '#000000' }}>

				<Image source={{ uri: story.photo }} resizeMode={"contain"} style={{ height: 500 }} />

			</ScrollView>
		</View>
		);
	}
}

export default StoryView;