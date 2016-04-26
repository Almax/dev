import React, {
	ScrollView,
	ListView,
	Platform,
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	PixelRatio,
	DatePickerIOS,
	DatePickerAndroid,
	TimePickerAndroid,
	TextInput,
} from 'react-native';
import colors from '../utils/colors';
const { width, height } = Dimensions.get('window');
import asset from '../assets';
import moment from 'moment';
import { SubmitButton, FormRow } from '../components/Form';
import PickCityComponent from './PickCity';

class Template extends React.Component {
	render() {
		const { onPress, children, style, showModal, modal } = this.props;
		return (
			<ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#FFFFFF' }}>
				<Image source={asset.marry} style={[style, { flex: 1, width: width, paddingHorizontal: 10 }]}>
					{ children }
				</Image>
				<View style={{ padding: 10 }}>
					<SubmitButton onPress={onPress}>下一步</SubmitButton>
				</View>

				{ 
					showModal?
					<View style={styles.pickerModal}>
						{ modal }
					</View>
					: 
					null 
				}
			</ScrollView>
		);
	}
}

class MyWedding extends React.Component {
	constructor(props) {
		super(props);
	}
	_next() {
		this.props.navigator.push({
			title: '我的婚礼',
			component: PickColor
		});
	}
	render() {
		return (
			<Template onPress={this._next.bind(this)} style={{ justifyContent: 'center' }}>
				<View style={styles.row}>
					<Image source={asset.marryMaster} />

					<View style={{ flex: 1, padding: 10, }}>
						<Text style={{ color: '#FFFFFF', backgroundColor: 'transparent', fontSize: 14, fontWeight: '500' }}>
							格小格在这里给大家引导大家思考下面的问题，可以帮助大家理清结婚思路，
							确认婚礼当前的状况，避免新人进入到手忙脚乱的状态...
						</Text>
					</View>
				</View>
			</Template>
		);
	}
}

class PickColor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF']
		}
	}
	_select(color) {
		let colors = [...this.state.colors];
		let index = this.state.colors.indexOf(color);
		if(index === -1) {
			if(colors.length === 3) {
				colors.shift();
			}
			colors.push(color);
		} else {
			colors.splice(index, 1);
		}
		this.setState({
			colors: colors
		});
	}
	_next() {
		this.props.navigator.push({
			title: '结婚城市',
			component: PickCity
		})
	}
	render() {
		return (
			<View style={{ flex: 1, margin: 10, padding: 10, borderRadius: 5, backgroundColor: '#FFFFFF' }}>
				
				<View style={{ alignItems: 'center' }}>
					<Text style={styles.title}>选择喜欢的颜色</Text>
				</View>

				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image source={asset.marryMaster} />

					<View style={{ flex: 1, padding: 10, }}>
						<Text style={{ color: '#666666', backgroundColor: 'transparent', fontSize: 14, fontWeight: '500' }}>
							选三个你喜欢的颜色,不需要为什么,喜欢就好,
							这是一场婚礼调调的基础...
						</Text>
					</View>
				</View>

				<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
				{Object.keys(this.state.colors).map(key => {
					return (
						<View key={`selected_${key}`} style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: this.state.colors[key] }} />
					);
				})}
				</View>

				<ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
				{Object.keys(colors).map(key => {
					if(this.state.colors.indexOf(colors[key]) === -1) {
						return (
							<TouchableOpacity 
								key={key} 
								onPress={this._select.bind(this, colors[key])}
								style={{ height: (width-40)/4, width: (width-40)/4, borderWidth: 1, borderColor: '#FFFFFF',  backgroundColor: colors[key] }} />
						);
					} else {
						return (
							<TouchableOpacity 
								key={key} 
								onPress={this._select.bind(this, colors[key])}
								style={{ height: (width-40)/4, width: (width-40)/4, borderWidth: 1, borderColor: '#FFFFFF',  backgroundColor: colors[key] }}>

								<View style={styles.checkBox}>
									<Image source={asset.ok} />
								</View>

							</TouchableOpacity>
						);
					}
				})}
				</ScrollView>

				<View style={{ paddingVertical: 10 }}>
					<SubmitButton onPress={this._next.bind(this)}>下一步</SubmitButton>
				</View>

			</View>
		);
	}
}

class PickCity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city_1: '',
			city_2: '',
		}
	}
	_selectCity() {	
		this.props.navigator.push({
			title: '选择城市',
			component: PickCityComponent,
			params: {
				onSelect: (city) => {
					this.setState({
						city_1: city
					})
				}
			}
		});
	}
	_selectCity_2() {
		this.props.navigator.push({
			title: '选择城市',
			component: PickCityComponent,
			params: {
				onSelect: (city) => {
					this.setState({
						city_2: city
					})
				}
			}
		});
	}
	_next() {
		this.props.navigator.push({
			component: PickDate
		});
	}
	render() {
		return (
			<Template onPress={this._next.bind(this)}>

				<View style={{ backgroundColor: 'transparent', alignItems: 'center', marginVertical: 20 }}>
					<Text style={styles.reverseTitle}>结婚城市</Text>
				</View>

				<View style={styles.row}>
					<Image source={asset.marryMaster} />

					<View style={{ flex: 1, padding: 10, }}>
						<Text style={{ color: '#FFFFFF', backgroundColor: 'transparent', fontSize: 14, fontWeight: '500' }}>
							婚礼是在男方还是女方的城市，还是需要在两边各办一场婚礼？如果是办两场婚礼，按时间顺序选择你的婚礼地点。
						</Text>
					</View>
				</View>

				<TouchableOpacity onPress={this._selectCity.bind(this)} style={styles.selectButton}>
					<Text style={styles.selectButtonText}>{ this.state.city_1 ? this.state.city_1 : '婚礼一城市选择' }</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={this._selectCity_2.bind(this)} style={styles.selectButton}>
					<Text style={styles.selectButtonText}>{ this.state.city_2 ? this.state.city_2 : '婚礼二城市选择' }</Text>
				</TouchableOpacity>

			</Template>
		);
	}
}

class PickDate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: null,
			showModal: false,
		}
	}
	async _pickDate() {
		if(Platform.OS === 'android') {
			try {
			  const {action, year, month, day} = await DatePickerAndroid.open({
			    date: this.state.date ? new Date(this.state.date) : new Date()
			  });
			  if (action !== DatePickerAndroid.dismissedAction) {
				  const {action, hour, minute} = await TimePickerAndroid.open({
				    hour: parseInt(moment().format("hh")),
				    minute: parseInt(moment().format("mm")),
				    is24Hour: false,
				  });
			  	if (month < 10) { month = `0${month + 1}`; } else { month = `${month + 1}`; }
			  	if (day < 10) { day = `0${day}`; }

				  if (action !== DatePickerAndroid.dismissedAction) {
				  	if (hour < 10) { hour = `0${hour}`; }
				  	if (minute < 10) { hour = `0${hour}`; }
				  	const date = `${year}/${month}/${day} ${hour}:${minute}:00`;
				  	this.setState({ date: new Date(date) });
				  }else {
				  	const date = `${year}/${month}/${day}`;
				  	this.setState({ date: new Date(date) });
				  }
			  }
			} catch ({code, message}) {
			  console.warn('Cannot open date picker', message);
			}
		} else {
			this.setState({ showModal: true });
		}
	}
	_renderModal() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<View style={{ backgroundColor: '#FFFFFF' }}>
					<DatePickerIOS
						style={{ margin: 10, }}
					  date={this.state.date ? this.state.date : new Date()}
					  minuteInterval={10}
					  mode={'datetime'}
					  onDateChange={(date) => this.setState({ date })} />
				</View>
				<View style={{ flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'space-around' }}>
						<TouchableOpacity onPress={() => this.setState({ showModal: false })} style={styles.btnWrap}>
							<Text style={styles.btn}>取消</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => this.setState({ showModal: false })} style={styles.btnWrap}>
							<Text style={styles.btn}>选择</Text>
						</TouchableOpacity>
				</View>
			</View>
		);
	}
	_next() {
		this.props.navigator.push({
			component: SetGuest
		})
	}
	render() {
		return (
			<Template onPress={this._next.bind(this)} showModal={this.state.showModal} modal={this._renderModal()}>
				<View style={{ backgroundColor: 'transparent', alignItems: 'center', marginVertical: 20 }}>
					<Text style={styles.reverseTitle}>婚礼日期</Text>
				</View>

				<View style={styles.row}>
					<Image source={asset.marryMaster} />

					<View style={{ flex: 1, padding: 10, }}>
						<Text style={{ color: '#FFFFFF', backgroundColor: 'transparent', fontSize: 14, fontWeight: '500' }}>
							婚礼日期决定了，你是在哪个季节结婚，也决定了酒店的热门程度，通常5，6，10，11月份是结婚旺季
						</Text>
					</View>
				</View>

				<TouchableOpacity onPress={this._pickDate.bind(this)} style={styles.selectButton}>
					<Text style={styles.selectButtonText}>{this.state.date ? moment(this.state.date).format('YYYY年MM月DD日 h:mm a') : '选择日期'}</Text>
				</TouchableOpacity>
			</Template>
		);
	}
}

class SetGuest extends React.Component {
	constructor(props) {
		super(props);
		let selection = [
			{ name: '100人以内', selected: false }, 
			{ name: '100-200人', selected: false }, 
			{ name: '200人-300人', selected: false }, 
			{ name: '300人以上', selected: false },
		];
		this.state = {
			selection: selection,
			selected: null,
		}
	}	
	_updateList(data) {
		let all = [ ...this.state.selection ];
		let index = all.indexOf(data);
		for(key in all) {
			if(key == index) {
				all[key].selected = true;
			} else {
				all[key].selected = false;
			}
		}
		this.setState({
			selection: all,
			selected: data.name,
		});
	}
	_renderRow(data, key) {
		return (
			<TouchableOpacity key={key} onPress={this._updateList.bind(this, data)}  style={styles.radio}>
				{data.selected ? <Image source={asset.ok} style={{ height: 10 }} resizeMode={'contain'} /> : null}

				<Text style={{ fontSize: 16, fontWeight: '500', color: '#FFFFFF' }}>{data.name}</Text>
			</TouchableOpacity>
		);
	}
	render() {
		return (
			<Template>
				
				<View style={{ backgroundColor: 'transparent', alignItems: 'center', marginVertical: 20 }}>
					<Text style={styles.reverseTitle}>来宾人数</Text>
				</View>

				<View style={styles.row}>
					<Image source={asset.marryMaster} />

					<View style={{ flex: 1, padding: 10, }}>
						<Text style={{ color: '#FFFFFF', backgroundColor: 'transparent', fontSize: 14, fontWeight: '500' }}>
							来宾的人数直接决定了你酒店需要的大小以及正常婚礼的预算和成本，记得和双方家人好好沟通下
						</Text>
					</View>
				</View>

				{Object.keys(this.state.selection).map(key => {
					return this._renderRow(this.state.selection[key], key);
				})}

			</Template>
		);
	}
}

class SetBudget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			male: null,
			female: null,
			mp: null,
			fp: null,
			o: null,
		};
	}
	render() {
		let total = parseInt(this.state.male) + parseInt(this.state.female) + parseInt(this.state.mp) + parseInt(this.state.fp) + parseInt(this.state.o);
		return (
			<Template>
				
				<View style={{ backgroundColor: 'transparent', alignItems: 'center', marginVertical: 20 }}>
					<Text style={styles.reverseTitle}>婚礼预算</Text>
				</View>

				<View style={styles.row}>
					<Image source={asset.marryMaster} />

					<View style={{ flex: 1, padding: 10, }}>
						<Text style={{ color: '#FFFFFF', backgroundColor: 'transparent', fontSize: 14, fontWeight: '500' }}>
							下面这个简单的计算预算的小公式，可以帮助你快速计算你的婚礼预算。如果你已经有了准确预算，可以直接填写在预算框中
						</Text>
					</View>
				</View>

				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>男方出资:</Text>
					<TextInput
						keyboardType={'numeric'}
						value={this.state.male}
						onChangexText={(male) => this.setState({ male })}
						placeholder={'男方出资'}
						placeholderTextColor={'#CCCCCC'}
						style={styles.inputBox} 
						 />
				</View>

				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>女方出资:</Text>
					<TextInput
						keyboardType={'numeric'}
						value={this.state.female}
						onChangexText={(female) => this.setState({ female })}
						placeholder={'女方出资'}
						placeholderTextColor={'#CCCCCC'}
						style={styles.inputBox} 
						 />
				</View>

				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>男方父母:</Text>
					<TextInput 
						keyboardType={'numeric'}
						value={this.state.mp}
						onChangexText={(mp) => this.setState({ mp })}
						placeholder={'男方父母'}
						placeholderTextColor={'#CCCCCC'}
						style={styles.inputBox} 
						 />
				</View>

				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>女方父母:</Text>
					<TextInput 
						keyboardType={'numeric'}
						value={this.state.fp}
						onChangexText={(fp) => this.setState({ fp })}
						placeholder={'女方父母'}
						placeholderTextColor={'#CCCCCC'}
						style={styles.inputBox} 
						 />
				</View>

				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>其他资金:</Text>
					<TextInput 
						keyboardType={'numeric'}
						value={this.state.o}
						onChangexText={(o) => this.setState({ o })}
						placeholder={'其他资金'}
						placeholderTextColor={'#CCCCCC'}
						style={styles.inputBox} 
						 />
				</View>

				<View>
					<Text>{ total }</Text>
				</View>

			</Template>
		);
	}
}

class PickStyle extends React.Component {
	render() {
		return (
			<View>
				<Text>Pick style</Text>
			</View>
		);
	}
}

class SetHotel extends React.Component {
	render() {
		return (
			<View>
				<Text>Pick style</Text>
			</View>
		);
	}
}

class FindHelper extends React.Component {
	render() {
		return (
			<View>
				<Text>Find helper</Text>
			</View>
		);
	}
}

class FinalStep extends React.Component {
	render() {
		return (
			<View>
				<Text>Find helper</Text>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	title: { 
		fontSize: 16, 
		fontWeight: '500', 
		color: '#666666' 
	},
	reverseTitle: {
		fontSize: 16, 
		fontWeight: '500', 
		color: '#FFFFFF' 
	},
	checkBox: { 
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0, 
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.3)' 
	},
	row: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center'
	},
	selectButton: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		margin: 10,
		padding: 10,
		borderWidth: 1/PixelRatio.get(),
		borderColor: '#FFFFFF',
		borderRadius: 5,
	},
	selectButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '500',
	},
	pickerModal: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	btnWrap: {
		marginTop: 10,
		padding: 10,
		borderRadius: 5,
		borderWidth: 1/PixelRatio.get(),
		borderColor: '#FFFFFF',
	},
	btn: {
		fontSize: 16,
		color: '#FFFFFF',
	},
	radio: { 
		flexDirection: 'row',
		backgroundColor: 'transparent', 
		alignItems: 'center', 
		justifyContent: 'center', 
		paddingVertical: 10,
		borderBottomColor: '#FFFFFF',
		borderBottomWidth: 1/PixelRatio.get(), 
	},
	inputLabel: { 
		backgroundColor: 'transparent', 
		color: '#FFFFFF', 
		marginRight: 5 
	},
	inputBox: { 
		fontSize: 14, 
		padding: 10, 
		height: 35, 
		width: 150, 
		backgroundColor: '#FFFFFF', 
		borderRadius: 5 
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 5,
	},
});
export default MyWedding;