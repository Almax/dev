import React, {
	Alert,
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
import { connect } from 'react-redux';
import colors from '../utils/colors';
import style from '../utils/style';
import member from '../utils/member';
import { setMyMarry } from '../redux/modules/marry';
const { width, height } = Dimensions.get('window');
import asset from '../assets';
import moment from 'moment';
import { SubmitButton, FormRow } from '../components/Form';
import PickCityComponent from './PickCity';

class Template extends React.Component {
	render() {
		const { onPress, children, style, showModal, modal } = this.props;
		return (
			<ScrollView bounces={false} contentContainerStyle={{ flex: 1, backgroundColor: '#EFEFEF' }}>
				<View source={asset.marry} style={[style, { flex: 1, backgroundColor: '#36C89F', width: width-20, marginTop: 10, marginHorizontal: 10, paddingHorizontal: 10, borderRadius: 5 }]}>
					{ children }
				</View>
				<View style={{ padding: 10 }}>
					<SubmitButton onPress={onPress}>{ this.props.isEditMode ? '保存' : '下一步' }</SubmitButton>
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
	_edit(title, Component) {
		this.props.navigator.push({
			title: title,
			component: Component,
			params: {
				isEditMode: true,
				marry: this.props.marry,
				update: this._update.bind(this)
			}
		});
	}
	_next() {
		this.props.navigator.push({
			title: '婚礼色调',
			component: PickColor,
			params: {
				update: this._update.bind(this)
			}
		});
	}
	_update(params) {
		this.props.update({
			id: this.props.marry.id,
			...params,
		});
	}
	render() {
		let { marry_color, marry_city, marry_date, marry_guest, marry_budget, marry_style, marry_hotel_name, marry_hotel_address, marry_find } = this.props.marry;
		marry_color = marry_color ? JSON.parse(marry_color) : [];
		marry_city = marry_city ? JSON.parse(marry_city) : ['还没有设置'];
		marry_date = marry_date ? moment(marry_date).format('YYYY年MM月DD日 a hh:ss') : '还没有设置';
		marry_style = marry_style ? JSON.parse(marry_style) : ['还没有设置'];
		marry_find = marry_find ? JSON.parse(marry_find) : ['还没有设置'];

		return (
			<View style={{ flex: 1, backgroundColor: '#EFEFEF', flexWrap: 'wrap' }}>

				<View source={asset.marry} style={{ backgroundColor: '#36C89F', height: 150, width: width-20, paddingHorizontal: 10, margin: 10, borderRadius: 5 }} resizeMode={'cover'}>
					<View style={{ backgroundColor: 'transparent', alignItems: 'center', marginVertical: 20 }}>
						<Text style={styles.reverseTitle}>我的婚礼</Text>
					</View>

					<View style={styles.row}>
						<Image source={asset.marryMaster} />
						<View style={{ flex: 1, padding: 10, }}>
							<Text style={{ color: '#FFFFFF', backgroundColor: 'transparent', fontSize: 14, fontWeight: '500' }}>
								格小格在这里给大家引导大家思考下面的问题，可以帮助大家理清结婚思路，
								确认婚礼当前的状况，避免新人进入到手忙脚乱的状态...
							</Text>

						</View>
					</View>
				</View>

				<ScrollView contentContainerStyle={{ backgroundColor: '#EFEFEF' }}>

					<TouchableOpacity onPress={this._edit.bind(this, '婚礼颜色', PickColor)} style={styles.block}>
						<View style={styles.blockKey}>
							<Image source={asset.marryColor} style={styles.blockIcon} resizeMode={'contain'} />
							<Text style={styles.blockText}>婚礼颜色</Text>
						</View>
						<View style={styles.blockValue}>
							{Object.keys(marry_color).map( 
								key => 
								<View key={`color_${key}`} style={[styles.circle, { backgroundColor: marry_color[key]}]} /> 
							)}
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this._edit.bind(this, '结婚城市', PickCity)} style={styles.block}>
						<View style={styles.blockKey}>
							<Image source={asset.marryCity} style={styles.blockIcon} resizeMode={'contain'} />
							<Text style={styles.blockText}>结婚城市</Text>
						</View>
						<View style={[styles.blockValue, { flexDirection: 'column', alignItems: 'flex-end' }]}>
							{Object.keys(marry_city).map(key => <Text key={`city_${key}`} style={styles.city}>{marry_city[key]}</Text>)}
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this._edit.bind(this, '结婚日期', PickDate)} style={styles.block}>
						<View style={styles.blockKey}>
							<Image source={asset.marryDate} style={styles.blockIcon} resizeMode={'contain'} />
							<Text style={styles.blockText}>结婚日期</Text>
						</View>
						<View style={styles.blockValue}>
							<Text style={styles.date}>{ marry_date }</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this._edit.bind(this, '来宾人数', SetGuest)} style={styles.block}>
						<View style={styles.blockKey}>
							<Image source={asset.marryGuest} style={styles.blockIcon} resizeMode={'contain'} />
							<Text style={styles.blockText}>来宾人数</Text>
						</View>
						<View style={styles.blockValue}>
							<Text style={styles.valueText}>{ marry_guest }</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this._edit.bind(this, '婚礼预算', SetBudget)} style={styles.block}>
						<View style={styles.blockKey}>
							<Image source={asset.marryBudget} style={styles.blockIcon} resizeMode={'contain'} />
							<Text style={styles.blockText}>婚礼预算</Text>
						</View>
						<View style={styles.blockValue}>
							<Text style={styles.money}> { `￥ ${marry_budget ? marry_budget : 0}` } </Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this._edit.bind(this, '主题风格', PickStyle)} style={styles.block}>
						<View style={styles.blockKey}>
							<Image source={asset.marryStyle} style={styles.blockIcon} resizeMode={'contain'} />
							<Text style={styles.blockText}>主题风格</Text>
						</View>
						<View style={styles.blockValue}>
							{ Object.keys(marry_style).map(key => <Text key={`style_${key}`} style={styles.valueText}>{marry_style[key]}</Text>)}
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this._edit.bind(this, '酒店信息', SetHotel)} style={styles.block}>
						<View style={styles.blockKey}>
							<Image source={asset.marryHotel} style={styles.blockIcon} resizeMode={'contain'} />
							<Text style={styles.blockText}>酒店信息</Text>
						</View>
						<View style={[styles.blockValue, {flexDirection: 'column', alignItems: 'flex-end'}]}>
							<Text style={styles.valueText}>{ marry_hotel_address }</Text>
							<Text style={styles.valueText}>{ marry_hotel_name }</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this._edit.bind(this, '我正在寻找的', FindHelper)} style={styles.block}>
						<View style={styles.blockKey}>
							<Image source={asset.marryFind} style={styles.blockIcon} resizeMode={'contain'} />
							<Text style={styles.blockText}>正在寻找的</Text>
						</View>
						<View style={styles.blockValue}>
							{Object.keys(marry_find).map(key => <Text key={`find_${key}`} style={styles.valueText}>{marry_find[key]}</Text>)}
						</View>
					</TouchableOpacity>

				</ScrollView>

				<View style={{ padding: 10 }}>
					<SubmitButton onPress={this._next.bind(this)}>开始</SubmitButton>
				</View>

			</View>
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
	componentDidMount() {
		if(this.props.marry) {
			const { marry_color } = this.props.marry;
			this.setState({
				colors: JSON.parse(marry_color)
			});
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
		this.props.update({
			marry_color: JSON.stringify(this.state.colors),
		});
		if(this.props.isEditMode) {
			this.props.navigator.pop();
		} else {
			this.props.navigator.push({
				title: '结婚城市',
				component: PickCity,
				params: {
					update: this.props.update
				}
			});
		}
	}
	render() {
		return (
		<View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
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
			</View>
			<View style={{ padding: 10 }}>
				<SubmitButton onPress={this._next.bind(this)}>{ this.props.isEditMode ? '保存' : '下一步' }</SubmitButton>
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
	componentDidMount() {
		if(this.props.marry) {
			const { marry_city } = this.props.marry;
			let city = JSON.parse(marry_city);
			if(!city)
				return;

			this.setState({
				city_1: city[0],
				city_2: city[1],
			});
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
		const city = [this.state.city_1, this.state.city_2];
		this.props.update({
			marry_city: JSON.stringify(city)
		});

		if(this.props.isEditMode) {
			this.props.navigator.pop();
		} else {
			this.props.navigator.push({
				title: '婚礼日期',
				component: PickDate,
				params: {
					update: this.props.update
				}
			});
		}
	}
	render() {
		return (
			<Template onPress={this._next.bind(this)} isEditMode={this.props.isEditMode}>

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
	componentDidMount() {
		if(this.props.marry) {
			const { marry_date } = this.props.marry;
			this.setState({
				date: marry_date,
			});
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
		this.props.update({
			marry_date: this.state.date
		});

		if(this.props.isEditMode) {
			this.props.navigator.pop();
		} else {
			this.props.navigator.push({
				title: '来宾人数',
				component: SetGuest,
				params: {
					update: this.props.update
				}
			});
		}
	}
	render() {
		return (
			<Template onPress={this._next.bind(this)} showModal={this.state.showModal} modal={this._renderModal()} isEditMode={this.props.isEditMode}>
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
	componentDidMount() {
		if(this.props.marry) {
			const { marry_guest } = this.props.marry;
			for(key in this.state.selection) {
				if(this.state.selection[key].name === marry_guest) {
					this.state.selection[key].selected = true;
				}
			}
			this.setState({
				selected: marry_guest,
			});
		}
	}
	_next() {
		this.props.update({
			marry_guest: this.state.selected
		});

		if(this.props.isEditMode) {
			this.props.navigator.pop();
		} else {
			this.props.navigator.push({
				title: '婚礼预算',
				component: SetBudget,
				params: {
					update: this.props.update
				}
			});
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
			<Template onPress={this._next.bind(this)} isEditMode={this.props.isEditMode}>
				
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
			male: '0',
			female: '0',
			mp: '0',
			fp: '0',
			o: '0',
		};
	}
	componentDidMount() {
		if(this.props.marry) {
			const { marry_budget } = this.props.marry;
			this.setState({
				marry_budget: marry_budget,
			});
		}
	}
	_next() {
		let total = parseInt(this.state.male) + 
								parseInt(this.state.female) + 
								parseInt(this.state.mp) + 
								parseInt(this.state.fp) + 
								parseInt(this.state.o);
		this.props.update({
			marry_budget: total
		});

		if(this.props.isEditMode) {
			this.props.navigator.pop();
		} else {
			this.props.navigator.push({
				title: '主题风格',
				component: PickStyle,
				params: {
					update: this.props.update
				}
			});
		}
	}
	render() {
		let total = parseInt(this.state.male) + 
								parseInt(this.state.female) + 
								parseInt(this.state.mp) + 
								parseInt(this.state.fp) + 
								parseInt(this.state.o);
		return (
			<Template onPress={this._next.bind(this)} isEditMode={this.props.isEditMode}>
				
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
						value={parseInt(this.state.male)}
						onChangeText={(male) => this.setState({ male })}
						placeholder={'男方出资'}
						placeholderTextColor={'#CCCCCC'}
						style={styles.inputBox} 
						 />
				</View>

				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>女方出资:</Text>
					<TextInput
						keyboardType={'numeric'}
						value={parseInt(this.state.female)}
						onChangeText={(female) => this.setState({ female })}
						placeholder={'女方出资'}
						placeholderTextColor={'#CCCCCC'}
						style={styles.inputBox} 
						 />
				</View>

				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>男方父母:</Text>
					<TextInput 
						keyboardType={'numeric'}
						value={parseInt(this.state.mp)}
						onChangeText={(mp) => this.setState({ mp })}
						placeholder={'男方父母'}
						placeholderTextColor={'#CCCCCC'}
						style={styles.inputBox} 
						 />
				</View>

				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>女方父母:</Text>
					<TextInput 
						keyboardType={'numeric'}
						value={parseInt(this.state.fp)}
						onChangeText={(fp) => this.setState({ fp })}
						placeholder={'女方父母'}
						placeholderTextColor={'#CCCCCC'}
						style={styles.inputBox} 
						 />
				</View>

				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>其他资金:</Text>
					<TextInput 
						keyboardType={'numeric'}
						value={parseInt(this.state.o)}
						onChangeText={(o) => this.setState({ o })}
						placeholder={'其他资金'}
						placeholderTextColor={'#CCCCCC'}
						style={styles.inputBox} 
						 />
				</View>

				<View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
				<View style={{ paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FFFFFF', borderRadius: 5 }}>
					<Text style={{ backgroundColor: 'transparent', fontSize: 22, color: '#FFFFFF' }}>
						您目前有
					</Text>

					<Text style={{ backgroundColor: 'transparent', fontSize: 22, fontWeight: '600', color: '#FFFFFF' }}>
						{ `￥${this.state.marry_budget ? this.state.marry_budget : 0}` }
					</Text>
				</View>
				</View>

			</Template>
		);
	}
}

class PickStyle extends React.Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({ rowHasChanged: (r1, r2)=>r1!==r2 });
		let weddingStyle = [];
		for(key in style) {
			weddingStyle.push({
				name: style[key],
				selected: false,
			});
		}
		this.state = {
			weddingStyle: weddingStyle,
			ds: ds.cloneWithRows(weddingStyle)
		};
	}
	componentDidMount() {
	}
	_pick(rowId) {
		let style = { ...this.state.weddingStyle[rowId] };
		style.selected = !style.selected;
		let weddingStyle = [...this.state.weddingStyle];
		weddingStyle[rowId] = style;
		this.setState({
			weddingStyle: weddingStyle,
			ds: this.state.ds.cloneWithRows(weddingStyle)
		})
	}
	_renderRow(data, sectionId, rowId) {
		return (
			<TouchableOpacity onPress={this._pick.bind(this, rowId)} style={styles.box}>
				{ data.selected ? <Image source={asset.ok} style={{ height: 10 }} resizeMode={'contain'} /> : null }

				<Text style={styles.boxText}>{data.name}</Text>
			</TouchableOpacity>
		);
	}
	_next() {
		let selected = [];
		for(key in this.state.weddingStyle) {
			if(this.state.weddingStyle[key].selected === true) {
				selected.push(this.state.weddingStyle[key].name);
			}	
		}

		this.props.update({
			marry_style: JSON.stringify(selected)
		});

		if(this.props.isEditMode) {
			this.props.navigator.pop();
		} else {
			this.props.navigator.push({
				title: '酒店信息',
				component: SetHotel,
				params: {
					update: this.props.update
				}
			});
		}
	}
	render() {
		return (
			<Template onPress={this._next.bind(this)} isEditMode={this.props.isEditMode}>
				<View style={{ backgroundColor: 'transparent', alignItems: 'center', marginVertical: 20 }}>
					<Text style={styles.reverseTitle}>主题风格</Text>
				</View>

				<View style={styles.row}>
					<Image source={asset.marryMaster} />

					<View style={{ flex: 1, padding: 10, }}>
						<Text style={{ color: '#FFFFFF', backgroundColor: 'transparent', fontSize: 14, fontWeight: '500' }}>
							来宾的人数直接决定了你酒店需要的大小以及正常婚礼的预算和成本，记得和双方家人好好沟通下
						</Text>
					</View>
				</View>

				<ListView 
					contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
					dataSource={this.state.ds} renderRow={this._renderRow.bind(this)} />

			</Template>
		);
	}
}

class SetHotel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			address: '',
		}
	}
	componentDidMount() {
		if(this.props.marry) {
			const { marry_hotel_name, marry_hotel_address } = this.props.marry;
			this.setState({
				name: marry_hotel_name,
				address: marry_hotel_address,
			});
		}
	}
	_next() {
		this.props.update({
			marry_hotel_name: this.state.name,
			marry_hotel_address: this.state.address,
		});

		if(this.props.isEditMode) {
			this.props.navigator.pop();
		} else {
			this.props.navigator.push({
				title: '结婚帮手',
				component: FindHelper,
				params: {
					update: this.props.update
				}
			});
		}
	}
	render() {
		return (
			<Template onPress={this._next.bind(this)} isEditMode={this.props.isEditMode}>
				<View style={{ backgroundColor: 'transparent', alignItems: 'center', marginVertical: 20 }}>
					<Text style={styles.reverseTitle}>酒店信息</Text>
				</View>

				<View style={styles.row}>
					<Image source={asset.marryMaster} />

					<View style={{ flex: 1, padding: 10, }}>
						<Text style={{ color: '#FFFFFF', backgroundColor: 'transparent', fontSize: 14, fontWeight: '500' }}>
							把酒店信息写在下面进行备注，如果还没确定合适的酒店，可以稍后再填写，点击下一步跳过即可
						</Text>
					</View>
				</View>

				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>酒店名称:</Text>
					<TextInput
						value={this.state.name}
						onChangeText={(name) => this.setState({ name })}
						placeholder={'酒店名称'}
						placeholderTextColor={'#CCCCCC'}
						style={styles.inputBox} 
						 />
				</View>

				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>酒店地址:</Text>
					<TextInput
						value={this.state.address}
						onChangeText={(address) => this.setState({ address })}
						placeholder={'酒店地址'}
						placeholderTextColor={'#CCCCCC'}
						style={styles.inputBox} 
						 />
				</View>

			</Template>
		);
	}
}

class FindHelper extends React.Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({ rowHasChanged: (r1, r2)=>r1!==r2 });
		let weddingMember = [];
		for(key in member) {
			weddingMember.push({
				name: member[key],
				selected: false,
			});
		}
		this.state = {
			weddingMember: weddingMember,
			ds: ds.cloneWithRows(weddingMember)
		};
	}
	_pick(rowId) {
		let style = { ...this.state.weddingMember[rowId] };
		style.selected = !style.selected;
		let weddingMember = [...this.state.weddingMember];
		weddingMember[rowId] = style;
		this.setState({
			weddingMember: weddingMember,
			ds: this.state.ds.cloneWithRows(weddingMember)
		})
	}
	_renderRow(data, sectionId, rowId) {
		return (
			<TouchableOpacity onPress={this._pick.bind(this, rowId)} style={styles.box}>
				{ data.selected ? <Image source={asset.ok} style={{ height: 10 }} resizeMode={'contain'} /> : null }

				<Text style={styles.boxText}>{data.name}</Text>
			</TouchableOpacity>
		);
	}
	_next() {
		let selected = [];
		for(key in this.state.weddingMember) {
			if(this.state.weddingMember[key].selected === true) {
				selected.push(this.state.weddingMember[key].name);
			}
		}	
		this.props.update({
			marry_find: JSON.stringify(selected)
		});

		if(this.props.isEditMode) {
			this.props.navigator.pop();
		} else {
			this.props.navigator.push({
				title: '婚礼想法',
				component: FinalStep,
				params: {
					update: this.props.update
				}
			});
		}
	}
	render() {
		return (
			<Template onPress={this._next.bind(this)} isEditMode={this.props.isEditMode}>
				<View style={{ backgroundColor: 'transparent', alignItems: 'center', marginVertical: 20 }}>
					<Text style={styles.reverseTitle}>正在寻找的..</Text>
				</View>

				<View style={styles.row}>
					<Image source={asset.marryMaster} />

					<View style={{ flex: 1, padding: 10, }}>
						<Text style={{ color: '#FFFFFF', backgroundColor: 'transparent', fontSize: 14, fontWeight: '500' }}>
							点击选择你还没确定的事情，可以多选哦...						
						</Text>
					</View>
				</View>

				<ListView 
					contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
					dataSource={this.state.ds} renderRow={this._renderRow.bind(this)} />

			</Template>
		);
	}
}

class FinalStep extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: null
		}
	}
	_next() {
		this.props.update({
			marry_wish: this.state.text
		});

		let routes = this.props.navigator.getCurrentRoutes();
		for(key in routes) {
			if(routes[key].title === '婚礼') {
				this.props.navigator.popToRoute(routes[key]);
				break;
			}
		}
	}
	render() {
		return (
			<Template onPress={this._next.bind(this)} isEditMode={this.props.isEditMode}>
				<TextInput 
					style={styles.editor}
					value={this.state.text}
					onChangeText={(text) => this.setState({ text })}
					multiline={true}
					placeholder={'在这里说说你关于婚礼的其他想法...'} />
			</Template>
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
		alignItems: 'center',
		marginBottom: 10,
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
		width: 180, 
		backgroundColor: '#FFFFFF', 
		borderRadius: 5 
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 5,
	},
	box: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: ( width - 80 ) / 2, 
		backgroundColor: 'transparent', 
		borderWidth: 1, 
		borderColor: '#FFFFFF', 
		paddingVertical: 15, 
		marginHorizontal: 10,
		marginBottom: 10, 
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	boxText: { 
		color: '#FFFFFF', 
		fontSize: 16 
	},
	editor: {
		flex: 1,
		textAlignVertical: 'top',
		justifyContent: 'flex-start',
		marginVertical: 50,
		marginHorizontal: 10,
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#FFFFFF',
		fontSize: 14,
	},
	block: {
		flexDirection: 'row',
		height: 60,
		backgroundColor: '#FFFFFF',
		paddingVertical: 5,
		marginHorizontal: 5,
		borderRadius: 5,
		marginBottom: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 5,
	},
	blockIcon: {
		height: 30,
		width: 30,
		marginRight: 5,
	},
	blockText: {
		fontSize: 16,
		color: '#999999',
	},
	blockKey: {
		width: 110,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	blockValue: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-end',
		width: width - 130,
	},
	circle: {
		height: 30,
		width: 30,
		borderRadius: 15,
		marginLeft: 5,
	},
	city: {
		fontSize: 14,
		fontWeight: '500',
		color: '#666666',
	},
	date: {
		fontSize: 14,
		fontWeight: '500',
		color: '#666666',
	},
	money: {
		fontSize: 14,
		fontWeight: '500',
		color: '#F06199',
	},
	valueText: {
		marginLeft: 5,
		marginBottom: 5,
		fontSize: 14,
		fontWeight: '500',
		color: '#666666',
	},

});
export default connect(
	state=>({ marry: state.marry }),
	dispatch=>({
		update: (params) => dispatch(setMyMarry(params))
	})
)(MyWedding);