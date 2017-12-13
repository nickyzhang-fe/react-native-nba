/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    StatusBar,
    View,
    BackAndroid,
    Platform
} from 'react-native';

import {
    Navigator,
} from 'react-native-deprecated-custom-components';
import {getRouteMap, registerNavigator} from './constant/router';
import * as Orientation from "react-native-orientation";
import Toast from './components/toast';
import SplashScreen from 'react-native-splash-screen';
// import * as WeChat from 'react-native-wechat';

let lastClickTime = 0;

class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.onBackAndroid = this.onBackAndroid.bind(this);
    }

    componentWillMount() {
        Orientation.lockToPortrait();
        if (Platform.OS === 'android') {
            // Orientation.registerOnOrientationChanged();
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentDidMount() {
        // WeChat.registerApp('wxa106668d81b9dba8');
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='#283C87'
                    barStyle='default'
                    translucent={true}/>
                <Navigator
                    style={styles.navigator}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    initialRoute={{
                        name: 'MainContainer'
                    }}/>
            </View>
        )
    }

    configureScene(route) {
        let sceneAnimation = getRouteMap().get(route.name).sceneAnimation;
        if (sceneAnimation) {
            return sceneAnimation;
        }
        return Navigator.SceneConfigs.FloatFromRight;
    };

    renderScene(route, navigator) {
        this.navigator = navigator;
        registerNavigator(navigator);
        let Component = getRouteMap().get(route.name).component;
        return (
            <Component {...route}/>
        );
    };

    onBackAndroid() {
        const routers = this.navigator.getCurrentRoutes();
        if (routers.length > 1) {
            this.navigator.pop();
            return true;
        }
        let now = new Date().getTime();
        if (now - lastClickTime < 2500) {//2.5秒内点击后退键两次推出应用程序
            return false;
        }
        lastClickTime = now;
        Toast.show('再按一次退出程序');
        return true;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navigator: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default App;