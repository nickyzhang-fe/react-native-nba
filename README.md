### 基于React Native的NBA Player

### 版本
`"react": "16.0.0"`  
`"node": "6.10.2"`

### 声明
> 该APP所用到的API均由 [「腾讯NBA」](http://sports.qq.com/nba/)提供，[本人](https://github.com/5ibinbin)采取非正常手段获取。获取有侵犯权益的嫌疑。请您了解相关情况，并保证不侵犯[「腾讯NBA」](http://sports.qq.com/nba/)的相关利益，并遵守开源协议，谢谢！！！

### 项目描述
- 利用`react-native-viewpager`实现比赛日程的左右滑动
- 获取当日比赛的比分信息，支持当日赛程的文字直播(未实现)
- `NBA`社区分为热门社区和全部社区
- 针对不同的球队粉丝有不同的社区，实现加载评论详情、评论功能(不支持)
- 新闻列表，查看新闻详情
- 使用`react-native-wechat`实现新闻的分享功能(未实现)
- 实现`Android`的返回功能
- 支持`Android`沉浸式状态栏

### 项目运行

- `npm install`
- `react-native run-ios/android`

### 组件使用
- `npm install react-native-scrollable-tab-view --save`
- `npm install react-native-deprecated-custom-components --save`
- `npm install --save prop-types`
- 安装 `redux`
			
		npm install --save redux

- 安装 react-redux

		npm install --save react-redux

- 安装 redux-thunk  

		npm install --save redux-thunk
- `npm install react-native-orientation --save`
- `npm install react-native-wechat --save`
- `npm install react-native-splash-screen --save`

### 项目问题处理
- 如遇到安装`Navigator`时报错
	- 安装`react-native-deprecated-custom-components`
	- `NavigatorBreadcrumbNavigationBar.js`相关`96`行`ES6`写法
	- 请到[`github`](https://github.com/facebookarchive/react-native-custom-components/blob/master/src/Navigator.js)替换`react-native-deprecated-custom-components`中的`Navigator.js`文件
-  如遇到安装`react-native-viewpager`时报错
	
	> 由于react-native的版本更新很快，而作者还没有来的急更新库，所以需要我们手动把相关代码转变为ES6写法；
	- `DefaultViewPageIndicator.js` 文件中引入`PropTypes = require('prop-types');`(不解释)
	- `ViewPager.js` 中引入`createReactClass = require('create-react-class');` 并把 `ViewPager`组件的声明变为`var ViewPager = createReactClass({})`这种方式
	- 直接替换[`ViewPager.js`](https://github.com/5ibinbin/react-native-nba/blob/master/output/ViewPager.js)、 [`DefaultViewPageIndicator.js`](https://github.com/5ibinbin/react-native-nba/blob/master/output/DefaultViewPageIndicator.js) 文件
- 在打`Android`包时遇到`unable to load script from assets 'index.android bundle'`
	- ① `react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`
	- ② `react-native run-android`

	> 这个index.android.bundle是用来调用原生控件的js脚本，每次当你改变了 index.android.js，你都需要使用上面的代码片段，来及时的更新index.android.bundle，然后打包才可以把新的index.android.js应用上，所以当没有index.android.bundle文件时，RN是无法运行的.

### Android签名

- 签名文件为`ibinbin.jks`
- 密码：5ibinbin
- alias：china