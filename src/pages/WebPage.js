import React, {
	View,
	Text,
	WebView,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Loading from './Loading';
class WebPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			webState: { loading: false },
		}
	}
	renderLoading() {
		return <Loading />;
	}
	onNavigationStateChange(e) {
		this.setState({
			webState: e
		});
	}
	componentDidMount() {
		if(this.state.webState.canGoBack) {
			this.webview.goBack();
		}
	}
	render() {
		const url = 'http://weixin.marrynovo.com/app/index.php?i=2&c=home&a=page&id=8';
		//const url = 'http://weixin.marrynovo.com/app/./index.php?i=2&c=entry&id=1&do=dayu_form&m=dayu_form';
		return (
			<View style={styles.container}>
				<WebView
					ref={webview => this.webview = webview}
					style={{ flex: 1, backgroundColor: '#CCCCCC' }}
					startInLoadingState={false}
					decelerationRate="normal"
					javaScriptEnabled={true}
          domStorageEnabled={true}
          renderLoading={this.renderLoading.bind(this)}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
					source={{ uri: url }} />
				
				{ 
					this.state.webState.loading ? 
						<View style={styles.modal}><Text style={styles.text}>载入页面中...</Text></View> 
						: 
						null 
				}
			</View>	
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	modal: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	text: {
		color: '#FFFFFF',
	}
});
export default connect()(WebPage);