/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';
import {getRouteMap, registerNavigator} from './constant/router';
import {
    StyleSheet,
    StatusBar,
    View
} from 'react-native';

import {
    Navigator,
} from 'react-native-deprecated-custom-components';

class App extends Component<{}> {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='black'
                    barStyle='default'/>
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

    configureScene = (route) => {
        let sceneAnimation = getRouteMap().get(route.name).sceneAnimation;
        if (sceneAnimation) {
            return sceneAnimation;
        }
        return Navigator.SceneConfigs.FloatFromRight;
    };

    renderScene = (route, navigator) => {
        this.navigator = navigator;
        registerNavigator(navigator);
        let Component = getRouteMap().get(route.name).component;
        return (
            <Component {...route}/>
        );
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