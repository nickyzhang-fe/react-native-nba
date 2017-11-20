/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';

import {
    View,
    Text,
    WebView,
    StyleSheet
} from 'react-native';

import HeaderBar from '../components/headerBar';
import {getNavigator} from '../constant/router';
import CommonUtil from '../util/commonUtil';
import Global from '../constant/global';

class PersonInfo extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <HeaderBar
                    title="项目地址"
                    showLeftState={true}
                    showRightState={false}
                    leftItemTitle={''}
                    leftImageSource={require('../image/close.png')}
                    onPress={() => this.hidePersonInfo()}/>
                <WebView
                    style={styles.webView}
                    ref={'webView'}
                    source={{uri: Global.GITHUB_URL}}
                    automaticallyAdjustContentInsets={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}/>
            </View>
        )
    }

    hidePersonInfo = () => {
        getNavigator().pop();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: CommonUtil.getScreenHeight(),
        width: CommonUtil.getScreenWidth()
    },
    webView: {
        height: CommonUtil.getScreenHeight(),
        width: CommonUtil.getScreenWidth()
    }
});

export default PersonInfo;