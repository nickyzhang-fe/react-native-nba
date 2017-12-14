/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';

import {
    View,
    Text,
    WebView,
    StyleSheet,
    BackAndroid,
    BackHandler
} from 'react-native';

import HeaderBar from '../components/headerBar';
import {getNavigator} from '../constant/router';
import CommonUtil from '../util/commonUtil';
import Global from '../constant/global';

class PersonInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url.url,
            title: this.props.url.title,
            loading: true,
            isBackButtonEnable: false,
            isForwardButtonEnable: false
        };
        console.log(this.props.url);
    }

    componentDidMount() {
        BackHandler.addEventListener("webHardwareBackPress", ()=> {
            try {
                if (this.state.isBackButtonEnable) {
                    this.refs._webView.goBack();//返回上一个页面
                    return true;//true 系统不再处理 false交给系统处理
                }
            } catch (error) {
                return false;
            }
            return false;
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("webHardwareBackPress");
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar
                    title={this.state.title}
                    showLeftState={true}
                    showRightState={false}
                    leftItemTitle={''}
                    leftImageSource={require('../image/close.png')}
                    onPress={() => this.hidePersonInfo()}/>
                <WebView
                    style={styles.webView}
                    ref="_webView"
                    source={{uri: this.state.url}}
                    automaticallyAdjustContentInsets={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    mixedContentMode={'always'}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}/>
            </View>
        )
    }

    hidePersonInfo = () => {
        getNavigator().pop();
    };

    _onNavigationStateChange(navState) {
        this.setState({
            url: navState.url,
            // title: navState.title,
            loading: navState.loading,
            isBackButtonEnable: navState.canGoBack,
            isForwardButtonEnable: navState.canGoForward,
        })
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