import React, {
	Component,
	Navigator,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import styles from './styles';

export default class SwitchTab extends Component {

	constructor(props) {
		super(props);
		
		this.routeStack = [];
		const { pager } = props;
		Object.keys(pager).map((key) => this.routeStack.push(pager[key]))

		this.state = {
			activePager: { ...this.props.pager[0] }
		}
	}

	componentDidMount() {
	  const { willFocus, didFocus } = this.props;
	 	this._listeners = [
	 		this.navigator.navigationContext.addListener('didfocus', e => {
	 			if(typeof didFocus == 'function')
	  			didFocus(e);
	  	}),
	 		this.navigator.navigationContext.addListener('willFocus', e => {
	 			if(typeof willFocus == 'function')
	  			willFocus(e);
	  	})
	  ];
	}

	componentWillUnmount() {
		this._listeners && this._listeners.forEach(
			listener => listener.remove()
		);
	}

	_activePager(activePager) {
		let stack = this.navigator.getCurrentRoutes();
		for( key in stack) {
				if(stack[key].index == activePager.index) {
					this.navigator.jumpTo(stack[key]);
					break;
				}
		}
		this.setState({ activePager });
	}

	_configureScene() {
		return Navigator.SceneConfigs.PushFromRight
	}

	_renderScene(route, tabNavigator) {
		const { action, state, navigator } = this.props;
		let Comp = route.component;
		return (
			<Comp
				navigator={navigator} 
				state={state} 
				action={action} />
		)
	}

	render() {
		const { 
			action,
			state,
			pager, 
			backgroundColor 
		} = this.props;
		
		const currentIndex = this.state.activePager.index;
		const userStyles = { backgroundColor: (backgroundColor ? backgroundColor: '#FFFFFF') };
		
		return (
			<View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
				<View style={[styles.tabContainer, userStyles]}>
					<View style={styles.tabButtonWrapper}>
					{Object.keys(pager).map((key) => (
						<TouchableOpacity 
							activeOpacity={1}
							key={"switch.tab_"+key}
							onPress={this._activePager.bind(this, pager[key])} 
							style={ currentIndex == pager[key].index ? styles.tabButtonActived : styles.tabButton }>

							<Text style={ currentIndex == pager[key].index ? styles.tabTextActived : styles.tabText }>
								{pager[key].name}
							</Text>
						</TouchableOpacity>
					))}
					</View>
				</View>

				<Navigator
					ref={(navigator) => this.navigator = navigator}
					initialRoute={this.routeStack[0]}
					initialRouteStack={this.routeStack}
					configureScene={this._configureScene.bind(this)}
					renderScene={this._renderScene.bind(this)} />
			</View>
		);
	}
}

SwitchTab.propTypes = {
	pager: 							React.PropTypes.array.isRequired,
	backgroundColor: 		React.PropTypes.string,
}

