Navigator是RN提供的一个路由工具，不过缺陷是没有预设一个路由配置文件，所以导致整个结构类似goto语法的，你可以跳转到任意的页面。先来一个最简单的Navigator:
		
	import React,{
		View,
		Navigator
	} from 'react-native';
	import FirstPageComponent from './FirstPageComponent';
	
	class SampleComponent extends React.Component {

		render() {
			var defaultName = 'FirstPageComponent';
			var defaultComponent = FirstPageComponent;
			return (
	        <Navigator
	          initialRoute={{ name: defaultName, component: defaultComponent }}
	          configureScene={(route) => {
	            return Navigator.SceneConfigs.VerticalDownSwipeJump;
	          }}
	          renderScene={(route, navigator) => {
	            let Component = route.component;
	            return <Component {...route.params} navigator={navigator} />
	          }} />
			);

		}
	}

	export default SampleComponent

这里来逐行解释代码的功效:

第三行: 一个初始首页的component名字，比如我写了一个component叫HomeComponent，那么这个name就是这个组件的名字【HomeComponent】了。

第四行: 这个组件的Class，用来一会儿实例化成 <Component />标签
	
第七行: initialRoute={{ name: defaultName, component: defaultComponent }} 这个指定了默认的页面，也就是启动app之后会看到界面的第一屏。 需要填写两个参数: name 跟 component。

第八，九，十行:           configureScene={() => {
            return Navigator.SceneConfigs.VerticalDownSwipeJump;
          }} 这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，有源代码的: node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js
          
最后的几行: renderScene={(route, navigator) => {
            let Component = route.component;
            if(route.component) {
              return <Component {...route.params} navigator={navigator} />
            }
          }} />
        );
        
这里是每个人最疑惑的，我们先看到回调里的两个参数:route, navigator。通过打印我们发现route里其实就是我们传递的name,component这两个货，navigator是一个Navigator的对象，为什么呢，因为它有push pop jump...等方法，这是我们等下用来跳转页面用的那个navigator对象。   

	return <Component {...route.params} navigator={navigator} />

这里有一个判断，也就是如果传递进来的component存在，那我们就是返回一个这个component，结合前面 initialRoute 的参数，我们就是知道，这是一个会被render出来给用户看到的component，然后navigator作为props传递给了这个component。

所以下一步，在这个FirstPageComponent里面，我们可以直接拿到这个 props.navigator:

	import React,{
		View,
		Text,
		TouchableOpacity
	} from 'react-native';
	
	import SecondPageComponent from './SecondPageComponent';

	class FirstPageComponent extends React.Component {

		constructor(props) {
			super(props);
			this.state = {};
		}

		_pressButton() {
			const { navigator } = this.props;
			//或者写成 const navigator = this.props.navigator;
			//为什么这里可以取得 props.navigator?请看上文:
			//<Component {...route.params} navigator={navigator} />
			//这里传递了navigator作为props
			if(navigator) {
				navigator.push({
					name: 'SecondPageComponent',
					component: SecondPageComponent,
				})
			}
		}

		render() {
			return (
				<View>
					<TouchableOpacity onPress={this._pressButton.bind(this)}>
						<Text>点我跳转</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}
	export default FirstPageComponent

这个里面创建了一个可以点击的区域，让我们点击可以跳到SecondPageComponent这个页面，实现页面的跳转。
现在来创建SecondPageComponent，并且让它可以再跳回FirstPageComponent:

	import React, {
		View,
		Text,
		TouchableOpacity,
	} from 'react-native';
	
	import FirstPageComponent from './FirstPageComponent';
	
	class SecondPageComponent extends React.Component {

		constructor(props) {
			super(props);
			this.state = {};
		}

		_pressButton() {
			const { navigator } = this.props;
			if(navigator) {
				//很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
				navigator.pop();
			}
		}

		render() {
    	return (
				<View>
					<TouchableOpacity onPress={this._pressButton.bind(this)}>
						<Text>点我跳回去</Text>
					</TouchableOpacity>
				</View>
    	);
		}
	}

大功告成，能进能出了。

关于官方文档里有个东西，这里说一下:

	getCurrentRoutes() - 获取当前栈里的路由，也就是push进来，没有pop掉的那些
	jumpBack() - 跳回之前的路由，当然前提是保留现在的，还可以再跳回来，会给你保留原样。
    jumpForward() - 上一个方法不是调到之前的路由了么，用这个跳回来就好了
    jumpTo(route) - Transition to an existing scene without unmounting
    push(route) - Navigate forward to a new scene, squashing any scenes that you could jumpForward to
    pop() - Transition back and unmount the current scene
    replace(route) - Replace the current scene with a new route
    replaceAtIndex(route, index) - Replace a scene as specified by an index
    replacePrevious(route) - Replace the previous scene
    immediatelyResetRouteStack(routeStack) - Reset every scene with an array of routes
    popToRoute(route) - Pop to a particular scene, as specified by its route. All scenes after it will be unmounted
    popToTop() - Pop to the first scene in the stack, unmounting every other scene
    
这些都是navigator可以用的public method,就是跳转用的，里面有些带参数的XXX(route)，新手第一次看这个文档会疑惑，这个route参数是啥呢，这个route就是:
	
	renderScene={(route, navigator) => 
这里的route，最基本的route就是:
	
	var route = {
		component: LoginComponent
	}
这种格式。这个地方有点模糊的，在这里先说清楚了。

然后下面要讨论，怎么传递参数过去，或者从对方获取参数。
传递参数，通过push就可以了。
比如在一个 press的事件里:
	
	//FirstPageComponent.js
	import React, {
   		View,
   	 	Text,
    	TouchableOpacity
	} from 'react-native';

	import SecondPageComponent from './SecondPageComponent';

	class FirstPageComponent extends React.Component {

	    constructor(props) {
	    	super(props);
	    	this.state = {
	    		id: 2
	    	};
	    }


	    _pressButton() {
	        const { navigator } = this.props;
	        if(navigator) {
	            navigator.push({
	                name: 'SecondPageComponent',
	                component: SecondPageComponent,
	                //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
	                params: {
	                	id: this.state.id
	                }
	            });
	        }
	    }

	    render() {
	    	return (
		    	<View>
		            <TouchableOpacity onPress={this._pressButton.bind(this)}>
		                <Text>点我跳转并传递id</Text>
		            </TouchableOpacity>
		       	</View>
	    	);
	    }
	}

	export default FirstPageComponent;
	
params的来历:
	
	// index.ios.js
	<Navigator
	  initialRoute={{ name: defaultName, component: defaultComponent }}
	  configureScene={() => {
	    return Navigator.SceneConfigs.VerticalDownSwipeJump;
	  }}
	  renderScene={(route, navigator) => {
	    let Component = route.component;
	    if(route.component) {
	    	//这里有个 { ...route.params }
	    	return <Component {...route.params} navigator={navigator} />
	    }
	  }} />

这个语法是把 routes.params 里的每个key 作为props的一个属性:

	
	navigator.push({
		name: 'SecondPageComponent',
		component: SecondPageComponent,
    	params: {
    		id: this.state.id
    	}
	});
	
这里的 params.id 就变成了 <Navigator id={} 传递给了下一个页面。
所以 SecondPageComponent就应该这样取得 id：
	
	//SecondPageComponent.js
	import React,{
		View,
		Text,
		TouchableOpacity,
	} from 'react-native';
	
	import FirstPageComponent from './FirstPageComponent';
	
	class SecondPageComponent extends React.Component {

		constructor(props) {
			super(props);
			this.state = {
				id: null
			}
		}

		componentDidMount() {
			//这里获取从FirstPageComponent传递过来的参数: id
			this.setState({
				id: this.props.id
			});
		}

		_pressButton() {
			const { navigator } = this.props;
			if(navigator) {
				navigator.pop();
			}
		}

		render() {
			return (
				<View>
					<Text>获得的参数: id={ this.state.id }</Text>
					<TouchableOpacity onPress={this._pressButton.bind(this)}>
						<Text>点我跳回去</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}

	export default SecondPageComponent

这样在页面间传递的参数，就可以获取了。

---
@sunnylqm  很多人不理解这里的params，我忍不住稍微补充一下。
![0_1453170797112_QQ图片20160119102616.png](/uploads/files/1453170800064-qq图片20160119102616.png) 

---
然后就是返回的时候，也需要传递参数回上一个页面:
但是navigator.pop()并没有提供参数，因为pop()只是从 [路由1,路由2，路由3。。。]里把最后一个路由踢出去的操作，并不支持传递参数给倒数第二个路由，这里要用到一个概念，把上一个页面的实例或者回调方法，作为参数传递到当前页面来，在当前页面操作上一个页面的state:

这是一个查询用户信息的例子，FirstPageComponent传递id到SecondPageComponent，然后SecondPageComponent返回user信息给FirstPageComponent

	//FirstPageComponent.js
	import React,{
   		View,
   	 	Text,
    	TouchableOpacity
	} from 'react-native';

	import SecondPageComponent from './SecondPageComponent';

	class FirstPageComponent extends React.Component {

	    constructor(props) {
	    	super(props);

	    	this.state = {
	    		id: 2,
	        user: null,
	    	}
	    }


	    _pressButton() {
	    	var _this = this;
	        const { navigator } = this.props;
	        if(navigator) {
	            navigator.push({
	                name: 'SecondPageComponent',
	                component: SecondPageComponent,
	                params: {
	                	id: this.state.id
	                	//从SecondPageComponent获取user
	                	getUser: function(user) {
	                		_this.setState({
	                			user: user
	                		})
	                	}
	                }
	            });
	        }
	    }

	    render: function() {
	    	if( this.state.user ) {
				return(
					<View>
						<Text>用户信息: { JSON.stringify(this.state.user) }</Text>
					</View>
		    	);
	    	}else {
				return(
					<View>
						<TouchableOpacity onPress={this._pressButton.bind(this)}>
						    <Text>查询ID为{ this.state.id }的用户信息</Text>
						</TouchableOpacity>
					</View>
		    	);
	    	}

	    }
	}

	export default FirstPageComponent
	
然后再操作SecondPageComponent:

	//SecondPageComponent.js
	
	const USER_MODELS = {
		1: { name: 'mot', age: 23 },
		2: { name: '晴明大大', age: 25 }
	};

	import React,{
	    View,
	    Text,
	    TouchableOpacity,
	} from 'react-native';
	
	import FirstPageComponent from './FirstPageComponent';
	
	class SecondPageComponent extends React.Component {

	    constructor(props) {
	    	super(props);
	    	this.state = {
	    		id: null
	    	}
	    }

	    componentDidMount() {
	        //这里获取从FirstPageComponent传递过来的参数: id
	        this.setState({
	            id: this.props.id
	        });
	    }

	    _pressButton() {
				const { navigator } = this.props;
	   			
				if(this.props.getUser) {
					var user = USER_MODELS[this.props.id];
					this.props.getUser(user);
				}
				    
				if(navigator) {
				    navigator.pop();
				}
	    }

	    render() {
	    	return(
		        <View>
		            <Text>获得的参数: id={ this.state.id }</Text>
		            <TouchableOpacity onPress={this._pressButton.bind(this)}>
		                <Text>点我跳回去</Text>
		            </TouchableOpacity>
		        </View>
	      	);
	    }
	}

看下效果如何吧。