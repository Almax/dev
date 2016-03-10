import React, {
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import asset from '../assets';
import { connect } from 'react-redux';
import { BackStep } from '../components/View';
import Loading from './Loading';
import TimeAgo from 'react-native-timeago';
import { hitMyMarry } from '../redux/modules/marry';
import { PureButton } from '../components/Form';
import FindPartner from './FindPartner';
class OurWedding extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			miss: 0,
			marry: {
				marry_name: null,
				marry_date: null,
				users: [],
			},
		};
	}
	componentDidMount() {
		if(this.props.marry !== 'initial state') {
			this.setState({ 
				marry: this.props.marry,
				isLoaded: true,
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ 
			marry: nextProps.marry,
			isLoaded: true, 
		});
	}
	addMiss() {
		this.props.hitMyMarry();
	}
	_findPartner() {
		this.props.navigator.push({
			component: FindPartner
		});
	}
	render() {
		const { marry_name, marry_date, heart_beat, users } = this.state.marry;

		if(this.state.isLoaded) {
			return (
				<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
					<BackStep navigator={this.props.navigator} title={"婚礼信息"} />

					<View style={{ flex: 1, margin: 10, padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF', alignItems: 'center' }}>

						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
							<Text style={{ color: '#999999', fontSize: 16 }}>婚礼名:</Text>
							<Text style={{ color: '#E1759C', fontSize: 32, fontWeight: '600' }}>{marry_name}</Text>
						</View>

						<View style={{ height: 20 }} />

						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
							<Text style={{ color: '#999999', fontSize: 16 }}>婚期:</Text>
							<Text style={{ color: '#E1759C', fontSize: 32, fontWeight: '600' }}>{moment(marry_date).format("YYYY年MM月DD")}</Text>
						</View>

						<View style={{ margin: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
							<View style={{ alignItems: 'center', justifyContent: 'center' }}>
								{ users[0] ? 
										<Image source={{ uri: users[0].photo }} style={{ borderWidth: 1, borderColor: '#EFEFEF', height: 66, width: 66, borderRadius: 33 }} resizeMode={"contain"} />
										:
										<View style={{ borderWidth: 1, borderColor: '#EFEFEF', height: 66, width: 66, borderRadius: 33 }} resizeMode={"contain"} /> 
								}
								<Text>{ users[0] ? users[0].name : null }</Text>
							</View>

							<View style={{ flexWrap: 'wrap', alignItems: 'center' }}>
								<TouchableOpacity activeOpacity={0} onPress={this.addMiss.bind(this)}>
									<Image source={asset.heart} style={{ width: 120 }} resizeMode={"contain"} />
								</TouchableOpacity>
								<Text style={{ fontSize: 30, color: '#E1759C' }}>心跳次数: {heart_beat}</Text>
							</View>

							<View style={{ alignItems: 'center', justifyContent: 'center' }}>
								{ users[1] ? 
										<Image source={{ uri: users[1].photo }} style={{ borderWidth: 1, borderColor: '#EFEFEF', height: 66, width: 66, borderRadius: 33 }} resizeMode={"contain"} />
										:
										<View style={{ borderWidth: 1, borderColor: '#EFEFEF', height: 66, width: 66, borderRadius: 33 }} resizeMode={"contain"} /> 
								}
								{ 
									users[1] ? 
									<Text>{ users[1].name }</Text> 
									:
									<PureButton onPress={this._findPartner.bind(this)} size={"small"}>邀请</PureButton>
								}
							</View>
						</View>

						
					</View>
				</View>
			);
		}else {
			return (
				<Loading />
			)
		}	
	}
}

export default connect(
	state=>({ marry: state.marry }),
	dispatch=>({
		hitMyMarry: () => dispatch(hitMyMarry())
	})
)(OurWedding);